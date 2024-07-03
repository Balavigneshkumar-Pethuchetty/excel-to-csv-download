// pages/index.js
import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import SheetSelection from '../components/SheetSelection';

const Home = () => {
  const [workbook, setWorkbook] = useState(null);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (wb) => {
    setWorkbook(wb);
    setHeaders([]);
  };

  const handleHeadersChange = (newHeaders) => {
    setHeaders(newHeaders);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Excel to CSV Converter</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {workbook && (
        <SheetSelection workbook={workbook} onHeadersChange={handleHeadersChange} />
      )}
    </div>
  );
};

export default Home;