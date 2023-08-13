import React from 'react';
import { ILocation } from '../../models/flights';

const Autocomplete = ({
  searchedLocationResults,
  handleLocationSelection,
}: {
  searchedLocationResults: ILocation[];
  handleLocationSelection: (location: ILocation) => void;
}) => {
  return (
    searchedLocationResults && (
      <div
        className={`auto-complete-location-container ${
          searchedLocationResults?.length ? 'visible' : ''
        }`}
      >
        {searchedLocationResults.map((location: ILocation) => {
          return (
            <div
              onClick={() => handleLocationSelection(location)}
              key={location.id}
              className="auto-complete-location-container-content"
            >
              <div className="inner-content">
                <div className="location">{location.location}</div>
                <div className="airport">{location.airport}</div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Autocomplete;
