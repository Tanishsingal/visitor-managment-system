// // src/utils/exportUtils.ts
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import { Visit } from '../types';

// export const exportToCsv = (data: any[], filename: string) => {
//   const headers = Object.keys(data[0]);
//   const csvContent = [
//     headers.join(','),
//     ...data.map(row => 
//       headers.map(header => 
//         JSON.stringify(row[header] || '')
//       ).join(',')
//     )
//   ].join('\n');

//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);
//   link.setAttribute('href', url);
//   link.setAttribute('download', `${filename}.csv`);
//   link.style.visibility = 'hidden';
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// export const exportToPdf = (data: any[], filename: string, title: string) => {
//   const doc = new jsPDF();
//   const headers = Object.keys(data[0]);
//   const rows = data.map(row => headers.map(header => row[header]));

//   doc.text(title, 14, 15);
//   doc.autoTable({
//     head: [headers],
//     body: rows,
//     startY: 25,
//   });

//   doc.save(`${filename}.pdf`);
// };

// src/utils/exportUtils.ts
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const exportToCsv = (data: any[], filename: string) => {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => 
        JSON.stringify(row[header] || '')
      ).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPdf = (data: any[], filename: string, title: string) => {
  const doc = new jsPDF();
  const headers = Object.keys(data[0]);
  const rows = data.map(row => headers.map(header => row[header]));

  doc.text(title, 14, 15);
  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 25,
  });

  doc.save(`${filename}.pdf`);
};