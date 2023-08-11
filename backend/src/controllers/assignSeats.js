const rowsCount = 10;
const columnCount = 10;

const generateSeatsData = () => {
  let rowData = [];
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    let columnData = [];
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
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
