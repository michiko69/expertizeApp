const express = require('express');
const Data = require('../models/data');

const router = express.Router();

require('dotenv').config();

const clientId = process.env.FOURSQUARE_API_KEY;
const clientSecret = process.env.FOURSQUARE_CLIENT_SECRET;


router.get('/', async (req, res) => {
  res.render('index');
});

router.post('/', async (req, res) => {
  const subCat = await Data.findOne({ 'categories.name': req.body.category });
  const filtered = subCat ? subCat.categories.filter((c) => c.name === req.body.category)[0] : { id: '' };
  const foundId = filtered.id;
  res.json({ id: foundId, clientId, clientSecret });
});

router.get('/venue', async (req, res) => {
  res.render('venue');
});


module.exports = router;
