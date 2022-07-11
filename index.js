'use strict';

const express = require('express');
const got = require('got');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


const app = express();

async function fetch_data() {
  return (await got('https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0Aarea%283600079510%29-%3E.searchArea%3B%0A%28%0Anode%5B%21shop%5D%20%5Bamenity~%22%5E%28bar%7Cbiergarten%7Ccafe%7Cfast_food%7Cfood_court%7Cice_cream%7Cpub%7Crestaurant%7Ccollege%7Cdriving_school%7Ckindergarten%7Clanguage_school%7Cschol%7Cuniversity%7Ccharging_terminal%7Cfuel%7Cmotorcycle_parking%7Cparking%7Cparking_entrance%7Cparking_space%7Ctaxi%7Cbank%7Cclinic%7Cdentist%7Cdoctors%7Chospital%7Cnursing_home%7Cpharmacy%7Cveterinary%7Carts_centre%7Ccinema%7Ccommunity_centre%7Cconference_centre%7Cevents_venue%7Cnightclub%7Cplanetarium%7Csocial_centre%7Ctheatre%7Ccourthouse%7Cembassy%7Cfire_station%7Cpolice%7Cpost_depot%7Cpost_office%7Cprison%7Ctownhall%29%22%5D%0A%28area.searchArea%29%3B%0Anode%5Btourism%5D%28area.searchArea%29%3B%0Anode%5Bhistoric%5D%28area.searchArea%29%3B%0A%29%3B%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B', {responseType: 'json', resolveBodyOnly: true}));
}

function getNow() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

let data;

app.get('/', async (req, res) => {
  console.log(getNow() + ' - Client connected');
  res.send(data);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  while (!data || !data.elements || !data.elements.length) {
    try {
      console.log("Overpass API status:");
      console.log((await got('https://overpass-api.de/api/status', {resolveBodyOnly: true})));
      console.log("Trying to fetch data...");
      data = await fetch_data();
      if (!data.elements.length) console.log(data.remark);
    } catch(error) {
      console.error(error.response.body);
    }
    await sleep(10000);
  }

  app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${PORT}`));
}

main();

