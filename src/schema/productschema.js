const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Ultrasonic Mist Maker Fogger Humidifier"
  },
  price: {
    type: Number,
    required: true,
    default: 55500
  },
  minOrderQty: {
    type: Number,
    default: 2
  },
  capacity: {
    type: String,
    default: "10L"
  },
  usage: {
    type: String,
    default: "For Industrial"
  },
  material: {
    type: String,
    default: "Stainless Steel"
  },
  brand: {
    type: String,
    default: "ate (ANN Techno Engineer)"
  },
  voltage: {
    type: String,
    default: "220 V 50Hz"
  },
  modelType: {
    type: String,
    default: "ate10UHSS"
  },
  application: {
    type: String,
    default: "Industrial Use"
  },
  features: {
    type: [String],
    default: [
      "Remove water 60 liters per 24 hours period",
      "Automatic humidity control, Adjustable RH10-95%",
      "Display humidity trouble",
      "Auto shut off when tank is full",
      "Continuous Drain Option",
      "Washable, pre filter",
      "Humidity Set at will, humidity control",
      "Set off from 1 hour to 24 hours",
      "3 minutes delay for protecting the compressor",
      "The transducer can examine itself",
      "Automatic defrost system, suitable for low & high temperature",
      "The unit is more reliable"
    ]
  },
  image: {
    type: String, // URL list or file paths
    default: ''
  },
  brochureUrl: {
    type: String,
    default: ""
  },
  category:{
    type:String,
     
  }
},{
    timestamps:true
});


 const productModel= mongoose.model('products',productschema);
module.exports =productModel;