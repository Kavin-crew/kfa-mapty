'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if (navigator.geolocation)
  // browser geolocation API
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

      //   coordinates of current user
      const coords = [latitude, longitude];

      // leaflet
      const map = L.map('map').setView(coords, 15);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // click anywhere in the map
      map.on('click', function (mapEvent) {
        // getting the coordinates upon click
        const { lat, lng } = mapEvent.latlng;
        // passing the value of the coordinates
        L.marker([lat, lng])
          .addTo(map)
          //   add options to the popup
          .bindPopup(
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              riseOnHover: true,
              className: 'running-popup',
            })
          )
          .setPopupContent(`Workout`)
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
