import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Input } from 'reactstrap';
const api = 'http://localhost:8000/api/bears/'
const App = () => {
  const [bears, setBears] = useState({})
  const [bear, setBear] = useState('')
  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0)

  const getBears = async () => {
    const result = await axios.get(`${api}`)
    setBears(result.data)
  }

  const getBear = async (id) => {
    const result = await axios.get(`${api}${id}`)
    setBear(result.data)
  }

  const addBear = async (name, weight) => {
    const result = await axios.post(`${api}`, {
      name,
      weight
    })
    console.log(result.data)
    getBears()
  }

  const deleteBear = async (id) => {
    const result = await axios.delete(`${api}${id}`)
    console.log(result.data)
    getBears()
  }

  const updateBear = async (id) => {
    const result = await axios.put(`${api}${id}`, {
      name,
      weight
    })
    console.log('bear id update: ', result.data)
    getBears()
  }


  const printBears = () => {
    console.log('Bears:', bears)
    if (bears && bears.length)
      return (bears.map((bear, index) =>
        (<li key={index}>
          {bear.name} - {bear.weight} 
          <Button style={{ marginLeft: 10 }} onClick = {() => deleteBear(bear.id)}> Delete </Button>
          <Button style={{ marginLeft: 10 }} onClick = {() => getBear(bear.id)}>Get</Button>
          <Button style={{ marginLeft: 10 }} onClick = {() => updateBear(bear.id)}>Update</Button>
        </li>)
      ))
    else {
      return (<h2>No bears</h2>)
    }
  }


  useEffect(() => {
    getBears()
  }, [])


  return (
    <div >
      <h2>Bears</h2>
      <ul>{printBears()}</ul>

      selected bear: {bear.name} {bear.weight}
      <h2>Add bear</h2>
      Name:<Input type="text" style={{ width: '20%' }} onChange={(e) => setName(e.target.value)} /> <br />
      Weight:<Input type="number" style={{ width: '20%' }} onChange={(e) => setWeight(e.target.value)} /> <br />
      <Button onClick={() => addBear(name, weight)}>Add new bear</Button>
    </div>
  )
}

export default App