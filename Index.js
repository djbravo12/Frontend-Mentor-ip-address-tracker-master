"use strict";

const updateMap = (latitude, langitude) => {
  let map = L.map("map").setView([latitude, langitude], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var popup = L.popup()
    .setLatLng([latitude, langitude])
    .setContent("My current server location")
    .openOn(map);
};

const url =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_WS1PdV1HnhpFwctmhVBbSGLIYdNdi&ipAddress";

const ipAddress = { ipAddress: "8.8.8.8" };

const options = {
  method: "POST",
  mode: "no-cors",
  Headers: { "Content-Type": "application/json" },
  body: JSON.stringify(ipAddress),
};

const FetchApi = () => {
  fetch(url, { options })
    .then((res) => res.json())
    .then((data) => {
      let {
        ip: apiIPaddress,
        location: {
          country: apiCountry,
          city: apiCity,
          lat: latitude,
          lng: langitude,
          postalCode: apiPostalCode,
          timezone: apiTimeZone,
        },
        isp: apiIsp,
      } = data;

      updateMap(latitude, langitude);

      console.log(
        apiIPaddress,
        apiCountry,
        apiCity,
        apiPostalCode,
        apiTimeZone,
        apiIsp
      );

      const ipAddress = document.querySelector("#ipAddress");
      const ipLocation = document.querySelector("#ipLocation");
      const ipTimeZone = document.querySelector("#ipTimeZone");
      const ipISP = document.querySelector("#ipISP");

      ipAddress.innerText = apiIPaddress;
      ipTimeZone.innerText = `UTC ${apiTimeZone}`;
      ipLocation.innerText = `${apiCity},${apiCountry} ${apiPostalCode}`;
      ipISP.innerText = apiIsp;
    });
};

FetchApi();

const ipInputform = document.querySelector("#ipInputform");
const formInputData = document.querySelector("#formInputData");

ipInputform.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = formInputData.value;
  console.log(formInputData.value);

  FetchApi(inputValue);
});
