const mongoose = require('mongoose')

// creating a new schema for food
const FoodSchema = {
  foodName: {
    type: String,
    required: true,
  },
  lastAte: {
    type: Number,
    required: true,
  },
}

const Food = mongoose.model('FoodDatas', FoodSchema)

module.exports = Food
