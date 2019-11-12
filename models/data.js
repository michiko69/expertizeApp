const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: String,
  name: String,
  pluralName: String,
  shortName: String,
  icon: Object,
  categories: Array,
});

module.exports = mongoose.model('Data', dataSchema);
