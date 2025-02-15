import { useEffect, useState } from "react";
import axios from "axios";
import QRCodeGenerator from "../components/QRCodeGenerator";

const VisitorDashboard = ({ visitorId }: { visitorId: number }) => {
  const [visitor, setVisitor] = useState<{ id: number; fullName: string; email: string } | null>(null);

  useEffect(() => {
    fetchVisitor();
  }, []);

  const fetchVisitor = async () => {
    try {
      const response = await axios.get(`https://your-api.com/api/visitors/${visitorId}`);
      setVisitor(response.data);
    } catch (error) {
      console.error("Failed to fetch visitor details", error);
    }
  };

  return (
    <div>
      {visitor ? (
        <>
          <h2>Welcome, {visitor.fullName}!</h2>
          <p>Your QR Code for check-in:</p>
          <QRCodeGenerator data={`https://your-api.com/visitor/${visitor.id}`} />
        </>
      ) : (
        <p>Loading visitor details...</p>
      )}
    </div>
  );
};

export default VisitorDashboard;
