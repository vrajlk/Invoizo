
const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  shopname:{
    type: String,
    required: true
  },
  adminId:{
    type: Number,
    required: true
  }

})

const Shop = mongoose.model('Shops', shopSchema);

module.exports = Shop;
 