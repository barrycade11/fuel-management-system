
const Joi = require('joi');

const StationSchema = Joi.object({
  stationCode: Joi.string().required(),
  stationName: Joi.string().required(),
  details: Joi.string().required(),
  address: Joi.string().required(),
  province: Joi.string().required(),
  city: Joi.string().required(),
  barangay: Joi.string().required(),
  openingTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required(),
  closingTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required(),
  pumps: Joi.number().integer().min(1).required(),
  nozzles: Joi.number().integer().min(1).required(),
  fillingPosition: Joi.number().integer().min(1).required(),
  posStations: Joi.string().required(),
  shipToNumber: Joi.number().integer().required() // 
});

module.exports = StationSchema;
