import {createSelector} from 'reselect';

const positionCalculator = (lat, lon,  bearing, speed, interval) => {
  const distance = speed*0.0000514444*interval; // Calculate distance-km travelled at speed-knots
  const R = 6371; // Earth Radius in Km
  let latDist = Math.asin(Math.sin(Math.PI / 180 * lat) * Math.cos(distance / R) + Math.cos(Math.PI / 180 * lat) * Math.sin(distance / R) * Math.cos(Math.PI / 180 * bearing));
  let lonDist = Math.PI / 180 * lon + Math.atan2(Math.sin( Math.PI / 180 * bearing) * Math.sin(distance / R) * Math.cos( Math.PI / 180 * lat ), Math.cos(distance / R) - Math.sin( Math.PI / 180 * lat) * Math.sin(latDist));

  return {
    lat: 180 / Math.PI * latDist,
    lon: 180 / Math.PI * lonDist
  };
};

const dateTimeToTimestamp = (dateTime) => {
  dateTime = dateTime.replace('T', ' ');
  return new Date(dateTime).getTime()/1000;
};

// FUNCTION TO CALCULATE REAL HEADING BASED ON COORDINATES
// const getHeading = (f1, l1, f2, l2) => {
//   let y = Math.sin(l2-l1) * Math.cos(f2);
//   let x = Math.cos(f1)*Math.sin(f2) - Math.sin(f1)*Math.cos(f2)*Math.cos(l2-l1);
//
//   return Math.atan2(y, x)*180/Math.PI;
// };

const getWaypoints = state => state.waypoints;

export const calculatePosition = createSelector(
  [getWaypoints],
  (waypoints) => {

    let animationCoords = [];

    if (waypoints.length > 0) {
      let currentTimestamp = dateTimeToTimestamp(waypoints[0].TIMESTAMP);
      let i;
      for (i = 0; i < waypoints.length - 1; i++) {
        let waypointCoords = {lat: waypoints[i].LAT, lon: waypoints[i].LON, timePoint: waypoints[i].TIMESTAMP};
        animationCoords.push(waypointCoords);
        let newCoords,
          date,
          timePoint,
          newCoordsObj;
        while (currentTimestamp < dateTimeToTimestamp(waypoints[i+1].TIMESTAMP)) {
          // console.log('currentTimestamp');
          // console.log(currentTimestamp);
          newCoords = positionCalculator(waypointCoords.lat, waypointCoords.lon,  waypoints[i].HEADING, waypoints[i].SPEED, 60);
          date = new Date(currentTimestamp*1000);
          timePoint = date.toDateString() + date.getHours() + date.getMinutes();
          newCoordsObj =  {
            lat: newCoords.lat,
            lon: newCoords.lon,
            timePoint: timePoint,
          };
          animationCoords.push(newCoordsObj);
          waypointCoords = {lat: newCoords.lat, lon: newCoords.lon};
          currentTimestamp+=60;
        }
      }
    }
    return  animationCoords;
  }
);
