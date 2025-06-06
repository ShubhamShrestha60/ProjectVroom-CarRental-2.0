
// const Car = mongoose.model('Car', carSchema);
// module.exports = Car;


/*global require, module*/
const mongoose = require ('mongoose')

const carSchema = new mongoose.Schema({
      carID: Number,
      brand: String,
      fuelType: String,
      transitionType: String,
      segment: String,
      price: Number,
      location: String,
      availability: Boolean,
      condition: String,
      imageUrl: String
})

const carModel = mongoose.model('Car', carSchema);

module.exports = carModel;
