const express = require('express');
const router = express.Router();
const axios = require('axios');

const key = process.env.REALTIME_KEY;

router.get('/:siteId', async function(req, res, next) {
  const siteId = req.params.siteId;
  const timewindow = req.query.timewindow;
  const apiUrl = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${key}&timewindow=${timewindow}&siteid=${siteId}`;
  try {
    const response = await axios.get(apiUrl);
    if (response.data.StatusCode !== 0) {
      throw new Error(response.data.Message);
    }
    res.json(response.data.ResponseData);
  } catch (error) {
    console.error('Failed fetching real time departures: ', error.message);
    next(error);
  }
});

module.exports = router;
