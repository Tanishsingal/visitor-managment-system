import { useState } from "react";
import QrScanner from "qr-scanner";

const QRCodeScanner = ({ onScan }: { onScan: (result: string) => void }) => {
  const [error, setError] = useState("");

  const handleScan = (file: File) => {
    QrScanner.scanImage(file)
      .then((result) => onScan(result))
      .catch(() => setError("Invalid QR Code"));
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={(e) => e.target.files && handleScan(e.target.files[0])} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default QRCodeScanner;
