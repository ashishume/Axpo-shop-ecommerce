import './index.scss';
import { IColumn, ISeats } from '../../models/flights';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import SpinningLoader from '../../../../components/SpinningLoader';
import CustomSnackbar from '../../../../components/Snackbar';
import { SNACKBAR_TIMEOUT } from '../../../../constants/snackbar';
const FlightSeatBooking = ({
  seats,
  addSeatsForBooking,
  seatIds,
  passengersCount,
  counter,
}: {
  seats: ISeats | null;
  addSeatsForBooking: (column: IColumn) => void;
  seatIds: string[];
  passengersCount: number;
  counter: number;
}) => {
  const [errorMessage, setErrorMessage] = useState('');

  function showErrorMessage(
    isBooked: boolean,
    counter: number,
    passengersCount: number
  ) {
    if (isBooked) setErrorMessage('This seat is already booked');
    else if (counter >= passengersCount)
      setErrorMessage('Max seat booking limit reached');

    setTimeout(() => {
      setErrorMessage('');
    }, SNACKBAR_TIMEOUT);
  }

  return (
    <div className="flight-seat-container">
      {seats?.seatStructure?.length ? (
        <div className="building">
          <div className="half-circle">Cockpit</div>
          <div className="rectangle"></div>
          <div className="right-wing"></div>
          <div className="left-wing"></div>
        </div>
      ) : null}
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
                        !column.isBooked && counter < passengersCount
                          ? addSeatsForBooking(column)
                          : showErrorMessage(
                              column.isBooked,
                              counter,
                              passengersCount
                            )
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
      <CustomSnackbar message={errorMessage} isError={true} />
      {!seats?.seatStructure?.length ? <SpinningLoader /> : null}
    </div>
  );
};

export default FlightSeatBooking;
