// // src/components/visitor/QRCodeGenerator.tsx
// import QRCode from 'react-qr-code';

// interface QRCodeGeneratorProps {
//   value: string;
//   size?: number;
// }

// export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
//   value, 
//   size = 256 
// }) => {
//   return (
//     <div className="flex justify-center p-4 bg-white rounded-lg shadow">
//       <QRCode
//         value={value}
//         size={size}
//         level="H"
//         className="max-w-full"
//       />
//     </div>
//   );
// };

// src/components/visitor/QRCodeGenerator.tsx
import QRCode from 'react-qr-code';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
}

export const QRCodeGenerator = ({ value, size = 128 }: QRCodeGeneratorProps) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
      <QRCode value={value} size={size} />
      <p className="mt-2 text-sm text-gray-600">Scan this code at reception</p>
    </div>
  );
};