// components/SheetView.js
import { useState, useEffect } from 'react';

const SheetView = ({ sheetData, onHeadersChange }) => {
  const [headers, setHeaders] = useState(
    sheetData[0].map(() => '')
  );

  useEffect(() => {
    onHeadersChange(headers);
  }, [headers]);

  const handleHeaderChange = (index, value) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  return (
    <table className="table-auto w-full my-4">
      <thead>
        <tr>
          <th className="px-4 py-2">Column Names</th>
          <th className="px-4 py-2">CSV Header</th>
        </tr>
      </thead>
      <tbody>
        {sheetData[0].map((colName, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">{colName}</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                value={headers[index]}
                onChange={(e) => handleHeaderChange(index, e.target.value)}
                className="p-2 border rounded w-full"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SheetView;