import { useState, useEffect } from "react";
import axios from "axios";

const VisitorManagement = () => {
  const [visitorData, setVisitorData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    purpose: "",
    hostEmployee: "",
  });

  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    try {
      const response = await axios.get("https://your-api.com/api/visitors");
      setVisitors(response.data);
    } catch (error) {
      console.error("Failed to fetch visitors", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisitorData({ ...visitorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://your-api.com/api/visitors", visitorData);
      fetchVisitors();
    } catch (error) {
      console.error("Registration Failed", error);
    }
  };

  return (
    <div>
      <h2>Register Visitor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
        <input type="text" name="company" placeholder="Company (Optional)" onChange={handleChange} />
        <input type="text" name="purpose" placeholder="Purpose of Visit" onChange={handleChange} />
        <input type="text" name="hostEmployee" placeholder="Host Employee" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>

      <h3>Visitor List</h3>
      <ul>
        {visitors.map((visitor:any) => (
          <li key={visitor.id}>{visitor.fullName} - {visitor.purpose}</li>
        ))}
      </ul>
    </div>
  );
};

export default VisitorManagement;
