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

    await FoodModel.find({}, (err, result) => {
      if (err) {
        console.log('error while inserting data to db')
      }
      res.send(result)
    })
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

// put route
app.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const foodName = req.body.foodName
    const lastAte = req.body.lastAte
    console.log(id, foodName, lastAte)
    await FoodModel.findById(id, (err, updatedFood) => {
      if (err) {
        console.log(err)
      }
      updatedFood.foodName = foodName
      updatedFood.lastAte = lastAte
      updatedFood.save((err, result) => {
        if (err) {
          console.log(err)
        }
        res.send(result)
      })
    })
  } catch (err) {
    console.log(err)
  }
})

// delete route
app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  await FoodModel.findByIdAndRemove(id).exec()
  await FoodModel.find({}, (err, result) => {
    if (err) {
      console.log('error while deleting record')
    }
    res.send(result)
  })
})

app.listen(3001, () => {
  console.log('server is listening on port 3001')
})
