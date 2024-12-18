import React, { useState } from 'react'
import '../css/addCar.css'
import { addData } from '../services/api';

const AddCar = () => {
    const [name, setName] = useState("");
    const [make, setMake] = useState("");
    const [img, setImg] = useState("");
    const [modelYear, setModelYear] = useState("");
    const [type, setType] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) return
        if (!make.trim()) return
        if (!modelYear.trim()) return

        const carData = {
            name: name,
            make: make,
            img: img,
            modelYear: modelYear,
            type: type,
            specs: null
        }

        try {
            addData(carData)
        } catch (err) {
            console.log(err)

        }

        setName("");
        setMake("");
        setImg("");
        setModelYear("");
        setType("");
    }


  return (
    <div className='addCar-container'>
        <form onSubmit={handleSubmit} className='addCar-page'>
            <input 
                type='text' 
                placeholder='Enter name of the car...' 
                className='box'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            <h2>Name:</h2>
            <input 
                type='text' 
                placeholder='Enter make of the car...' 
                className='box'
                value={make}
                onChange={(e) => setMake(e.target.value)} 
                />
            <h2>Make:</h2>
            <input 
                type='text' 
                placeholder='Enter img url of the car...' 
                className='box' 
                value={img}
                onChange={(e) => setImg(e.target.value)}
                />
            <h2>Img url:</h2>
            <input 
                type='text' 
                placeholder='Enter model year of the car...' 
                className='box' 
                value={modelYear}
                onChange={(e) => setModelYear(e.target.value)}
                />
            <h2>Model Year:</h2>
            <input 
                type='text' 
                placeholder='Enter type of the car...' 
                className='box' 
                value={type}
                onChange={(e) => setType(e.target.value)}
                />
            <h2>Type:</h2>
            
            <button type='submit' className='submit-btn'>
                submit
            </button>
        </form>
    </div>
  )
}

export default AddCar