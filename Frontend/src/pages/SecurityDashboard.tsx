import QRCodeScanner from "../components/QRCodeScanner";
import axios from "axios";

const SecurityDashboard = () => {
  const handleScan = async (visitorId: string) => {
    try {
      await axios.post(`https://your-api.com/api/visitors/${visitorId}/check-in`);
      alert("Visitor Checked In");
    } catch (error) {
      console.error("Check-in failed", error);
    }
  };

  return (
    <div>
      <h2>Security Dashboard</h2>
      <QRCodeScanner onScan={handleScan} />
    </div>
  );
};

export default SecurityDashboard;
