// import { useEffect, useState } from "react";

// interface Visitor {
//   id: number;
//   fullName: string;
//   email: string;
//   phone: string;
//   company?: string;
//   photoUrl?: string;
// }

// interface Visit {
//   id: number;
//   visitorId: number;
//   employeeId: number;
//   purpose: string;
//   checkIn: string;
//   status: "PENDING" | "APPROVED" | "DENIED";
//   visitor: Visitor;
// }

// const EmployeeDashboard: React.FC<{ employeeId: number }> = ({ employeeId }) => {
//   const [visits, setVisits] = useState<Visit[]>([]);

//   useEffect(() => {
//     const ws = new WebSocket(`ws://localhost:4000?employeeId=${employeeId}`);

//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       if (message.event === "NEW_VISITOR") {
//         setVisits(message.data);
//       }
//     };

//     return () => ws.close();
//   }, [employeeId]);

//   const updateVisitStatus = async (visitId: number, status: "APPROVED" | "DENIED") => {
//     try {
//       const response = await fetch("http://localhost:4000/update-visit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ visitId, status }),
//       });

//       if (response.ok) {
//         setVisits((prev) => prev.filter((visit) => visit.id !== visitId));
//       }
//     } catch (error) {
//       console.error("Error updating visit:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Employee Dashboard</h2>
//       {visits.length === 0 ? <p>No pending visitors</p> : (
//         <ul>
//           {visits.map((visit) => (
//             <li key={visit.id}>
//               <p>{visit.visitor.fullName} - {visit.purpose}</p>
//               <button onClick={() => updateVisitStatus(visit.id, "APPROVED")}>Approve</button>
//               <button onClick={() => updateVisitStatus(visit.id, "DENIED")}>Deny</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default EmployeeDashboard;

import { useEffect, useState } from "react";

const EmployeeDashboard = ({ employeeId }: { employeeId: number }) => {
  const [notifications, setNotifications] = useState<{ visitorName: string; status: string }[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:4000?employeeId=${employeeId}`);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      console.log("Received WebSocket message:", event.data);

      const message = JSON.parse(event.data);
      if (message.event === "NEW_VISITOR") {
        setVisitors(message.data); // Update visitor list
        setNotifications((prev) => [
          ...prev,
          { visitorName: message.data[message.data.length - 1].visitor.fullName, status: "Pending" },
        ]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, [employeeId]);

  return (
    <div>
      <h2>Employee Dashboard</h2>

      {/* Notification Section */}
      <div>
        <h3>Notifications</h3>
        {notifications.length === 0 ? <p>No new notifications</p> : 
          notifications.map((notif, index) => (
            <div key={index} className="notification">
              <strong>{notif.visitorName}</strong> has requested a visit. Status: {notif.status}
            </div>
          ))
        }
      </div>

      {/* Visitor Requests Table */}
      <h3>Visitor Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Visitor Name</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visit) => (
            <tr key={visit.id}>
              <td>{visit.visitor.fullName}</td>
              <td>{visit.purpose}</td>
              <td>{visit.status}</td>
              <td>
                <button onClick={() => handleUpdateVisit(visit.id, "APPROVED")}>Approve</button>
                <button onClick={() => handleUpdateVisit(visit.id, "DENIED")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  async function handleUpdateVisit(visitId: number, status: string) {
    await fetch("http://localhost:4000/update-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitId, status }),
    });

    setNotifications((prev) =>
      prev.map((notif) =>
        notif.visitorName === visitors.find((v) => v.id === visitId)?.visitor.fullName
          ? { ...notif, status }
          : notif
      )
    );
  }
};

export default EmployeeDashboard;