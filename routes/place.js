const express = require('express');
const placeRouter = new express.Router();

const Place = require('./../models/place');

placeRouter.get('/', (req, res) => {
  res.render('place/list');
});

placeRouter.get('/list', (req, res, next) => {
  Place.find()
    .then((places) => res.render('place/list', { places }))
    .catch((error) => next(error));
});

placeRouter.get('/create', (req, res) => {
  res.render('place/create');
});

placeRouter.get('/:id', (req, res, next) => {
  const placeId = req.params.id;
  Place.findById(placeId)
    .then((place) => res.render('place/single', { place }))
    .catch((error) => next(error));
});

placeRouter.get('/:id/edit', (req, res, next) => {
  const placeId = req.params.id;
  Place.findById(placeId)
    .then((place) => res.render('place/edit', { place }))
    .catch((error) => next(error));
});

placeRouter.post('/:id/edit', (req, res, next) => {
  const placeId = req.params.id;
  const { name, type } = req.body;
  Place.updateOne({name, type})
    .then((place) => {
      console.log(place)
      res.redirect(`/place/${placeId}`)
    })  
    .catch((error) => next(error));
});

placeRouter.post('/:id/delete', (req, res, next) => {
  const placeId = req.params.id;
  Place.deleteOne({ _id: placeId })
    .then((place) => res.redirect('/place/list'))
    .catch((error) => next(error));
});


placeRouter.post('/create', (req, res, next) => {
  const { name, type } = req.body;
  Place.create({
    name,
    type
  })
    .then((document) => res.redirect('list'))
    .catch((error) => next(error));
});

module.exports = placeRouter;
