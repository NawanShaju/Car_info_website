import React, { useState } from 'react'
import '../css/carCard.css'
import { useNavigate } from 'react-router-dom';
import { deleteData, updateData } from '../services/api';

const CarCard = ({carData}) => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [img, setImg] = useState(carData.img);
    const [name, setName] = useState(carData.name);
    const [make, setMake] = useState(carData.make);
    const [modelYear, setModelYear] = useState(carData.modelYear);

    function handleClick (e) {
        e.preventDefault()
        
        navigate('/carDetails', { state: { car: carData } });
    }

    function handleDelete () {
        try {
            deleteData(carData.name);
            window.location.href = '/carPage';
        } catch (err) {
            console.log(err)
        }

    }

    function editValues () {    
        if (edit) {
            const updatedSpecs = {
                name: name.trim() || carData.name,
                make: make.trim() || carData.make,
                modelYear: String(modelYear).trim() || carData.modelYear,
                img: img.trim() || carData.img,
                type: carData.type,
                specs: carData.specs,
            };


            updateData(updatedSpecs, carData.name);
            setEdit(false);
            window.location.href = '/carPage';
        } else {
            setEdit(true);
        }
    }

    return (
        <div className="car-card">
            {!edit ? (
                <div className="car-poster" onClick={handleClick}>
                    <img src={carData.img} alt={carData.name} />
                </div>
            ): (
                <div className="car-poster">
                    <textarea 
                        type='text' 
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </div>
            )}
            <button className='delete-btn' onClick={handleDelete}></button>
            {!edit ? (
                <div className="car-info">
                    <h3>{carData.make}</h3>
                    <h3>{carData.name}</h3>
                    <p>{carData.modelYear}</p>
                </div>
            ) : (
                <div className="car-info">
                   <input 
                        type='text' 
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                    />
                   <input 
                        type='text' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                   <input 
                        type='text' 
                        value={modelYear}
                        onChange={(e) => setModelYear(e.target.value)}
                    />
                </div>
            )}
            <button className='edit' onClick={editValues}>
                <img src={!edit ? ('edit.png') : ("finish.png")} />
            </button>
            <button className='more-info' onClick={handleClick}>Click for more info</button>
        </div>
    );
}

export default CarCard