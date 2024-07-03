// components/FileUpload.js
import { useState } from 'react';
import { read } from 'xlsx';

const FileUpload = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: 'array' });
        onFileUpload(workbook);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Please upload a valid Excel file (.xlsx).');
    }
  };

  return (
    <div className="my-4">
      <input type="file" accept=".xlsx" onChange={handleFileChange} className="p-2 border rounded" />
      {fileName && <p className="mt-2">Uploaded: {fileName}</p>}
    </div>
  );
};

export default FileUpload;