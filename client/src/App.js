import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [updateButton, setUpdateButton] = useState('Edit')
  const [isTrue, setIsTrue] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/read')
      .then((res) => {
        setFoodList(res.data)
      })
      .catch((err) => console.log('err=>', err))
  }, [])

  const saveFood = () => {
    axios
      .post('http://localhost:3001/insert', {
        foodName: foodName,
        days: days,
      })
      .then((res) => setFoodList(res.data))
      .then(() => {
        setFoodName('')
        setDays(0)
      })
      .catch((err) => {
        console.log('error => ', err)
      })
  }

  const updateFood = (updateButton, id) => {
    if (updateButton === 'Update') {
      //console.log(id, '-', foodName, '-', days)
      axios
        .put(`http://localhost:3001/update/${id}`, {
          foodName: foodName,
          lastAte: days,
        })
        .then((res) => setFoodList(res.data))
        .catch((err) => console.log(err))
    }
  }
  const deleteFood = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((res) => setFoodList(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <div className='App'>
      <h1>MERN CRUD App</h1>
      <label>Food Name</label>
      <input type='text' onChange={(e) => setFoodName(e.target.value)} />
      <label>Did not ate since days</label>
      <input type='number' onChange={(e) => setDays(e.target.value)} />
      <button onClick={saveFood}>Submit</button>
      <h1>Data from server</h1>
      <ul>
        {foodList.map((food, index) => (
          <li key={food._id} className='lis'>
            <h4 className={isTrue ? 'hide' : 'show'}>{food.foodName}</h4>

            <input
              className={`${isTrue ? 'show' : 'hide'}`}
              type='text'
              placeholder={food.foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />

            <h5 className={isTrue ? 'hide' : 'show'}>
              Did'nt ate since {food.lastAte} days
            </h5>

            <input
              className={`${isTrue ? 'show' : 'hide'}`}
              type='number'
              placeholder={food.lastAte}
              onChange={(e) => {
                setDays(e.target.value)
              }}
            />

            <button
              onClick={(e) => {
                setIsTrue(true)
                setUpdateButton('Update')
                updateFood(updateButton, food._id)
              }}
            >
              {updateButton}
            </button>
            <button onClick={() => deleteFood(food._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
