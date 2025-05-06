import React from 'react';
import './styles.css';
import { IoAirplaneSharp, IoCloudyOutline } from 'react-icons/io5';

export default function CustomLoader() {
  return (
    <div className="loaderContainer">
      {/* Flickering Clouds - scattered */}
      {[...Array(40)].map((_, i) => (
        <IoCloudyOutline key={i} className={`cloud flicker cloud${i + 1}`} />
      ))}

      {/* Airplane */}
      <div className="airplaneTrack">
        <IoAirplaneSharp className="airplaneIcon" />
      </div>
    </div>
  );
}
