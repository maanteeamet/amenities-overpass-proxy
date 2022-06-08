'use strict';

import got from "got";
import express from "express";

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';


const app = express();

async function fetch_data() {
  return (await got('https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A(%0A%20%20node%5B!shop%5D%5Bamenity!%3Dpharmacy%5D%5Bamenity%5D(%7B%7Bbbox%7D%7D)%3B%0A%20%20node%5Btourism%5D(%7B%7Bbbox%7D%7D)%3B%0A%20%20node%5Bhistoric%5D(%7B%7Bbbox%7D%7D)%3B%0A)%3B%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B', {responseType: 'json', resolveBodyOnly: true}));
}

function getNow() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

app.get('/check', async (req, res) => {
  console.log(getNow() + ' - Client connected');
  res.send(data);
});

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

