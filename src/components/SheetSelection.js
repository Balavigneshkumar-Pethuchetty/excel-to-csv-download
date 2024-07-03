// components/SheetSelection.js
import { useState } from 'react';
import { utils } from 'xlsx';
import SheetView from './SheetView';
import ConvertButton from './ConvertButton';

const SheetSelection = ({ workbook, onHeadersChange }) => {
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [sheetData, setSheetData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [firstColumnName, setFirstColumnName] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSelectSheet = (sheetName) => {
    setSelectedSheet(sheetName);
    setShowDetails(false);
    setSheetData(null);
    setHeaders([]);
  };

  const handleViewDetails = () => {
    const ws = selectedSheet ? workbook.Sheets[selectedSheet] : null;
    if (ws) {
      const data = utils.sheet_to_json(ws, { header: 1 });

      // Find the row where the first column matches the user input
      const headerRowIndex = data.findIndex(row => row[0] === firstColumnName);
      const headersRow = data[headerRowIndex];
      const initialHeaders = headersRow.map(() => '');

      setSheetData(data.slice(headerRowIndex));
      setHeaders(initialHeaders);
      onHeadersChange(initialHeaders);
      setShowDetails(true);
    }
  };

  const handleHeadersChange = (newHeaders) => {
    setHeaders(newHeaders);
    onHeadersChange(newHeaders);
  };

  return (
    <div className="my-4">
      {workbook.SheetNames.map((sheetName, index) => (
        <div key={index} className="border p-2 my-2 rounded">
          <div className="cursor-pointer" onClick={() => handleSelectSheet(sheetName)}>
            {sheetName}
          </div>
          {selectedSheet === sheetName && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Enter first column name"
                value={firstColumnName}
                onChange={(e) => setFirstColumnName(e.target.value)}
                className="p-2 border rounded w-full mb-2"
              />
              <button
                onClick={handleViewDetails}
                className="p-2 bg-blue-500 text-white rounded"
              >
                View Details
              </button>
              {showDetails && sheetData && (
                <div>
                  <SheetView sheetData={sheetData} onHeadersChange={handleHeadersChange} />
                  <ConvertButton sheetData={sheetData} headers={headers} />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SheetSelection;