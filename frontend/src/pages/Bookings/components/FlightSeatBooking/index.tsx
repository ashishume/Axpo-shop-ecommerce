import './index.scss';
import { IColumn, ISeats } from '../../models/flights';
import { Fragment } from 'react';
const FlightSeatBooking = ({
  seats,
  addSeatsForBooking,
  seatIds,
}: {
  seats: ISeats | null;
  addSeatsForBooking: (column: IColumn) => void;
  seatIds: string[];
}) => {
  return (
    <div className="flight-seat-container">
      <div className="building">
        <div className="half-circle">Cockpit</div>
        <div className="rectangle"></div>
        <div className="right-wing"></div>
        <div className="left-wing"></div>
      </div>
      {seats &&
        seats.seatStructure.map((row, rowIndex: number) => {
          return (
            <div className="row-seats" key={row._id}>
              {row.columns.map((column, columnIndex: number) => {
                return (
                  <Fragment key={column._id}>
                    {columnIndex % 3 === 0 && columnIndex !== 0 ? (
                      <div className="row-index-content">{rowIndex + 1}</div>
                    ) : null}
                    <div className="alphabets">
                      {rowIndex === 0
                        ? String.fromCharCode(65 + columnIndex)
                        : ''}
                    </div>
                    <div
                      className={`seat-block ${
                        column.isBooked ? 'booked-seats' : ''
                      }${
                        seatIds.includes(column.seatId) ? ' selected-seats' : ''
                      }`}
                      onClick={() =>
                        !column.isBooked ? addSeatsForBooking(column) : () => {}
                      }
                    >
                      <div className="divider"></div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default FlightSeatBooking;
