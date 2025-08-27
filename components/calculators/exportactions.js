import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

export default function ExportActions({ csvData, fileName, title }) {
  const handlePrint = () => {
    // Set a title for the print page
    const originalTitle = document.title;
    document.title = title || 'Calculation Results';
    window.print();
    document.title = originalTitle;
  };

  const handleCSVExport = () => {
    if (!csvData) return;

    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Assuming csvData is an array of arrays
    csvData.forEach(rowArray => {
      let row = rowArray.map(item => `"${String(item).replace(/"/g, '""')}"`).join(",");
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        onClick={handlePrint}
        className="flex-1 md:flex-none"
      >
        <Printer className="w-4 h-4 mr-2" />
        Print / Save PDF
      </Button>
      <Button
        variant="outline"
        onClick={handleCSVExport}
        className="flex-1 md:flex-none"
        disabled={!csvData}
      >
        <Download className="w-4 h-4 mr-2" />
        Export to CSV
      </Button>
    </div>
  );
}