import React from 'react';
import './style.scss';
import { IFlight } from '../../constants/flights';
import { formatIndianRupees } from '../../../../Utils/convertTextToLink';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
const FlightCardView = ({
  flightData,
  handleFlightBooking,
}: {
  flightData: IFlight;
  handleFlightBooking: () => void;
}) => {
  const {
    _id,
    flightNo,
    brand,
    brandLogo,
    sourceAirport,
    destinationAirport,
    sourceLocation,
    destinationLocation,
    fromTime,
    toTime,
    price,
    timeDiff,
  } = flightData;

  return (
    <div className="flight-card-container" onClick={handleFlightBooking}>
      <div className="flight-card-content">
        <div className="branding">
          <div className="logo">
            <img src={brandLogo} className="brand-image" />
          </div>
          <div className="brand-content">
            <div className="brand">{brand}</div>
            <div className="flightNo">{flightNo}</div>
          </div>
        </div>

        <div className="time-source-location">
          <div className="from-time">{fromTime}</div>
          <div className="from-location">{sourceLocation}</div>
        </div>
        <div className="middle-duration">
          <div className="flight-icon">
            <LocalAirportIcon />
          </div>
          <div className="middle-bar"></div>
          <div className="time-diff">{timeDiff}</div>
        </div>
        <div className="time-destination-location">
          <div className="to-time">{toTime}</div>
          <div className="to-location">{destinationLocation}</div>
        </div>

        <div className="price">₹ {formatIndianRupees(parseInt(price))}</div>
      </div>
    </div>
  );
};

export default FlightCardView;
