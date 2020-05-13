const mongoose = require('mongoose');

const placeSchema = new mongoose.model({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['coffee_shop', 'bookstore']
  }
}, { timestamps: true});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;