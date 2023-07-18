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

let map, mapEvent;

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
      map = L.map('map').setView(coords, 15);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // click anywhere in the map to show the form
      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );

// pressing enter/submitting the form
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // clear input fields
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      '';

  // display the marker
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

// toggle the input type dropdown
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
