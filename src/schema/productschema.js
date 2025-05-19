const { text } = require('express');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
 name: {
    type: String,
    
    
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

  image: {
    type: String,
    default: ''
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
    enum: ['Portable Dehumidifier',"Industrial Dehumidifier", 'Desiccant Dehumidifier', 'Ultrasonic Humidifier'],
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
