// components/ConvertButton.js
import { utils } from 'xlsx';

const ConvertButton = ({ sheetData, headers }) => {
  const handleConvert = () => {
    // Filter columns based on user-entered headers
    const columnsToInclude = headers
      .map((header, index) => (header !== '' ? index : null))
      .filter(index => index !== null);

    // Create a new data array with only the included columns
    const filteredData = sheetData.map(row => columnsToInclude.map(index => row[index]));

    // Add the user-entered headers to the filtered data
    const data = [columnsToInclude.map(index => headers[index]), ...filteredData.slice(1)];
    const ws = utils.aoa_to_sheet(data);
    const csv = utils.sheet_to_csv(ws);

    const now = new Date();
    const dateStr = now.toISOString().replace(/T/, '-').replace(/:/g, '').replace(/\..+/, '');
    const filename = `${sheetData[0][0]}-${dateStr}.csv`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      onClick={handleConvert}
      className={`p-2 mt-4 border rounded bg-blue-500 text-white`}
    >
      Convert To CSV
    </button>
  );
};

export default ConvertButton;