import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

const QRCodeGenerator = ({ data }: { data: string }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      data,
      dotsOptions: { color: "#000", type: "square" },
      backgroundOptions: { color: "#fff" },
    });

    if (qrRef.current) {
      qrCode.append(qrRef.current);
    }
  }, [data]);

  return <div ref={qrRef}></div>;
};

export default QRCodeGenerator;
