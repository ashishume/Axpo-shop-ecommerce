import { useEffect, useState } from 'react';
import './index.scss';
import { Axios } from '../../../../services/http-service';
const FlightSeatBooking = () => {
  const [rowData, setRowData] = useState<null | any>(null);
  const [flight, setFlight] = useState<null | any>(null);

  useEffect(() => {
    const payload = {
      flight: '64d68f48906abb5ed44ec8e7',
      fromDate: '12-08-2023',
    };
    //fetch seats for that specific date
    Axios.post('/flights/seats', payload).then((res) => {
      console.log(res.data);
      setRowData(res.data.seatStructure);
      setFlight(res.data);
    });

    // const res = createGridData();
    // console.log(res);
  }, []);

  function handleBooking(column: any) {
    const payload = {
      flight: flight.flight,
      ...column,
      fromDate: '12-08-2023',
      toDate: '12-08-2023',
      bookingClass: 'Economy',
      user: '64d1fc9744e96509bcbd41a2',
      price: 5000,
      passengerDetails: null,
    };
    console.log(payload);

    Axios.post('/flight/book', payload).then((response) => {
      console.log(response);
    });
  }
  return (
    <div className="flight-seat-container">
      {rowData &&
        rowData.map((row: any, rowIndex: number) => {
          return (
            <div className="m-10" key={row._id}>
              {row.columns.map((column: any, columnIndex: number) => {
                return (
                  <span
                    key={column._id}
                    className="m-5"
                    onClick={() => handleBooking(column)}
                  >
                    <span
                      style={{
                        border: 'solid 1px black',
                        padding: '10px',
                        background: column.isBooked ? '#18aa5e5c' : '#ff00005c',
                      }}
                    >
                      {column.seatId}
                    </span>
                  </span>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default FlightSeatBooking;
