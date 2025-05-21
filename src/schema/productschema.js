const { text } = require('express');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
 name: {
    type: String, 
  },
 
  minOrderQty: {
    type: Number,
    default: 2
  },
 brand: {
    type: String,
    default: "ate (ANN Techno Engineer)"
  },



  images: {
    type: [String],
    
  },

  airflow: {
    type: String,
    default: ''
  },

  color: {
    type: String,
    default: ''
  },

  category: {
    type: String,
    enum: ['Dehumidifires',"Industrial Dehumidifier", 'Desiccant Dehumidifier', 'Ultrasonic Humidifier','Ceiling Mounted Dehumidifier','other'],
    required: true
  },

  features: {
    type: [String],
    default: []
  },

  specialFeatures: {
    type: [String],
    default: []
  },

  technicalSpecs: {
    type: Map,
    of: String,
    default: {}
  },

 
  externalLinks: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
