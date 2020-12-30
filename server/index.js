const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const FoodModel = require('./models/Food')
const app = express()

// middleware to accept json as a response from client
app.use(express.json())
app.use(cors())

// setting up mongoose orm to connect with mongo db
mongoose.connect(
  'mongodb+srv://root:root@cluster0.0ngen.mongodb.net/mern-crud-food?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

// post route
app.post('/insert', async (req, res) => {
  const foodName = req.body.foodName
  const days = req.body.days
  const food = new FoodModel({ foodName: foodName, lastAte: days })

  try {
    await food.save()
    res.send('food inserted to db')
  } catch (err) {
    console.log(err)
  }
})

// get route
app.get('/read', async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      console.log('error while reading => ', err)
    }
    res.send(result)
  })
})

// delete route
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  await FoodModel.findByIdAndRemove(id).exec()
})

app.listen(3001, () => {
  console.log('server is listening on port 3001')
})