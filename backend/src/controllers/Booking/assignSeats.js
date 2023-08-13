const rowsCount = 30;
const columnCount = 6;

const generateSeatsData = () => {
  let rowData = [];
  for (let rowIndex = 1; rowIndex <= rowsCount; rowIndex++) {
    let columnData = [];
    for (let columnIndex = 1; columnIndex <= columnCount; columnIndex++) {
      columnData.push({
        seatId: `${rowIndex}-${columnIndex}`,
        isBooked: false,
      });
    }
    rowData.push({ columns: columnData, id: rowIndex });
  }
  return rowData;
};

module.exports = { generateSeatsData };
