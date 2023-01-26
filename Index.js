"use strict";

const ipInputform = document.querySelector("#ipInputform");
const formInputData = document.querySelector("#formInputData");

//leaflet map js

const updateMap = (latitude, langitude) => {
  let map = L.map("map").setView([latitude, langitude], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var popup = L.popup()
    .setLatLng([latitude, langitude])
    .setContent("SERVER LOCATION")
    .openOn(map);

  // map.invalidateSize()

  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }
};

// ipify js

let api =
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_WS1PdV1HnhpFwctmhVBbSGLIYdNdi&ipAddress";

const FetchApi = () => {
  fetch(api)
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

      // updating the leaflet map with cordinates
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
    })
    .catch((e) => {
      console.log(e);
      formInputData.value = "";
    });
};

//calling the fetch API function
FetchApi();

ipInputform.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = formInputData.value;
  console.log(formInputData.value);

  const reg = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
  const websiteReg = /^[\w\d\W+]+.+[a-z]{2,3}/;

  if (reg.test(inputValue)) {
    api = `https://geo.ipify.org/api/v2/country,city?apiKey=at_WS1PdV1HnhpFwctmhVBbSGLIYdNdi&ipAddress=${inputValue}`;
    console.log(inputValue);
  } else if (websiteReg.test(inputValue)) {
    api = `https://geo.ipify.org/api/v2/country,city?apiKey=at_WS1PdV1HnhpFwctmhVBbSGLIYdNdi&domain=${inputValue}`;
    console.log(inputValue);
  } else {
    console.log("error");
    formInputData.value = "";
  }

  FetchApi();
});
