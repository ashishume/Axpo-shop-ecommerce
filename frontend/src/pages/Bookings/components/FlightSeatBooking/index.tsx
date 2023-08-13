import './index.scss';
import { IColumn, ISeats } from '../../models/flights';
const FlightSeatBooking = ({
  seats,
  handleBooking,
}: {
  seats: ISeats | null;
  handleBooking: (column:IColumn) => void;
}) => {
  return (
    <div className="flight-seat-container">
      {seats &&
        seats.seatStructure.map((row) => {
          return (
            <div className="m-10" key={row._id}>
              {row.columns.map((column) => {
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
