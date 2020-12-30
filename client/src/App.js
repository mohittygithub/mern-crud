import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [foodList, setFoodList] = useState([])
  const [editFood, setEditFood] = useState(false)
  const [editDays, setEditDays] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/read')
      .then((res) => {
        setFoodList(res.data)
      })
      .catch((err) => console.log('err=>', err))
  }, [])

  const saveFood = () => {
    axios.post('http://localhost:3001/insert', {
      foodName: foodName,
      days: days,
    })
  }

  const updateFood = (id) => {
    console.log(id)
  }
  const deleteFood = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((res) => console.log(res.data))
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
            {!editFood ? (
              <h4
                onClick={() => {
                  updateFood(food._id)
                  setEditFood(true)
                }}
              >
                {food.foodName}
              </h4>
            ) : (
              <div>
                <input type='text' placeholder={food.foodName} />
              </div>
            )}
            {!editDays ? (
              <h5>Did'nt ate since {food.lastAte} days</h5>
            ) : (
              <div>
                <input type='number' placeholder={food.lastAte} />
              </div>
            )}
            <button
              disabled={editFood ? false : true}
              // onClick={() => setEditFood(false)}
            >
              Update
            </button>
            <button onClick={() => deleteFood(food._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
