import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/carDetails.css'
import { updateData } from '../services/api';

const CarDetails = () => {
    const location = useLocation(); 
    const navigate = useNavigate();

    const [engine, setEngine] = useState("");
    const [hp, setHp] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [wheelBase, setWheelBase] = useState("");
    const [fuelConsumption, setFuelConsumption] = useState("");
    const [curbWeight, setCurbWeight] = useState("");

    const [edit, setEdit] = useState(false);

    const { car } = location.state || {};

    if (!car) {
        navigate('/carPage');
        return null;
    }

    function handleClick(e) {
        e.preventDefault();
    
        const updatedSpecs = {
            engine: engine.trim() || car.specs?.engine || "",
            horesepower: hp.trim() || car.specs?.horesepower || "",
            length: length.trim() || car.specs?.length || "",
            width: width.trim() || car.specs?.width || "",
            height: height.trim() || car.specs?.height || "",
            wheelBase: wheelBase.trim() || car.specs?.wheelBase || "",
            fuelConsumption: fuelConsumption.trim() || car.specs?.fuelConsumption || "",
            curbWeight: curbWeight.trim() || car.specs?.curbWeight || "",
        };

    
        car.specs = {
            ...car.specs,
            ...updatedSpecs,
        };

        if (edit) {
            updateData(car, car.name);
            setEdit(false);
        } else {
            setEdit(true);
        }
    }

    return (
        <div className='carDetails-main'>
            <h1 className='carDetails-title'>{car.make} {car.name}</h1>
            <img 
                src={car.img} 
                alt={car.name} 
                className='carDetails-img'
            />
            <p className='carDetails-my'>Model Year: {car.modelYear}</p>
            {car.type && <p className='carDetails-type'>Type: {car.type}</p>}
            <button className='edit-btn' onClick={handleClick}>
                {edit ? ("Finish") : ("Edit")}
            </button>
            <p className='carDetails-specs'>Additional specs: {
            car.specs ? (
                <table className='car-specs'>
                    <tr>
                        Engine
                        {edit ? (
                            <th>
                                <input
                                    type='input' 
                                    placeholder='edit engine'
                                    className='edit-box'
                                    value={engine}
                                    onChange={(e) => setEngine(e.target.value)}
                                />
                            </th>
                        ) : (
                            <th>{car.specs.engine ? (`${car.specs.engine}`) : ("not available")}</th>
                        )}
                    </tr>
                    <tr>
                        Hp
                        {edit ? (
                            <th>
                                <input
                                    type='input' 
                                    placeholder='edit horesepower'
                                    className='edit-box'
                                    value={hp}
                                    onChange={(e) => setHp(e.target.value)}
                                />
                            </th>
                        ) : (
                            <th>{car.specs.horesepower ? (`${car.specs.horesepower}`) : ("not available")}</th>
                        )}
                    </tr>
                    <tr>
                        Length
                        {edit ? (
                            <th>
                                <input
                                    type='input' 
                                    placeholder='edit lenght'
                                    className='edit-box'
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                />
                            </th>
                        ) : (
                            <th>{car.specs.length ? (`${car.specs.length}`) : ("not available")}</th>
                        )}
                    </tr>
                    <tr>
                        Width
                        {edit ? (
                            <th>
                                <input
                                    type='input' 
                                    placeholder='edit width'
                                    className='edit-box'
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                />
                            </th>
                        ) : (
                            <th>{car.specs.width ? (`${car.specs.width}`) : ("not available")}</th>
                        )}
                    </tr>
                    <tr>
                        Height
                        {edit ? (
                            <th>
                                <input
                                    type='input' 
                                    placeholder='edit height'
                                    className='edit-box'
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </th>
                        ) : (
                            <th>{car.specs.height ? (`${car.specs.height}`) : ("not available")}</th>
                        )}
                    </tr>
                    <tr>
                        Wheel Base
                        {edit ? (
                            <th>
                                <input
                                    type='input' 
                                    placeholder='edit wheel base'
                                    className='edit-box'
                                    value={wheelBase}
                                    onChange={(e) => setWheelBase(e.target.value)}
                                />
                            </th>
                        ) : (
                            <th>{car.specs.wheelBase ? (`${car.specs.wheelBase}`) : ("not available")}</th>
                        )}
                    </tr>
                    <tr>
                        Fuel Consumption
                        {edit ? (
                            <th>
                                <input
                                    type='input' 
                                    placeholder='edit fuel consumption'
                                    className='edit-box'
                                    value={fuelConsumption}
                                    onChange={(e) => setFuelConsumption(e.target.value)}
                                />
                            </th>
                        ) : (
                            <th>{car.specs.fuelConsumption ? (`${car.specs.fuelConsumption}`) : ("not available")}</th>
                        )}
                    </tr>
                    <tr>
                        Curb Weight
                        {edit ? (
                            <th>
                                <input
                                    type='input' 
                                    placeholder='edit curb weight'
                                    className='edit-box'
                                    value={curbWeight}
                                    onChange={(e) => setCurbWeight(e.target.value)}
                                />
                            </th>
                        ) : (
                            <th>{car.specs.curbWeight ? (`${car.specs.curbWeight}`) : ("not available")}</th>
                        )}
                    </tr>

                </table>
            ) : edit === false && !car.specs ? ("Not available") : (
                <table className='car-specs'>
                    <tr>
                        Engine
                        <th>
                            <input
                                type='input' 
                                placeholder='edit engine'
                                className='edit-box'
                                value={engine}
                                onChange={(e) => setEngine(e.target.value)}

                            />
                        </th>
                    </tr>
                    <tr>
                        Hp
                        <th>
                            <input
                                type='input' 
                                placeholder='edit horesepower'
                                className='edit-box'
                                value={hp}
                                onChange={(e) => setHp(e.target.value)}
                            />
                        </th>
                    </tr>
                    <tr>
                        Length
                        <th>
                            <input
                                type='input' 
                                placeholder='edit lenght'
                                className='edit-box'
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                            />
                        </th>
                    </tr>
                    <tr>
                        Width
                        <th>
                            <input
                                type='input' 
                                placeholder='edit width'
                                className='edit-box'
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                            />
                        </th>
                    </tr>
                    <tr>
                        Height
                        <th>
                            <input
                                type='input' 
                                placeholder='edit height'
                                className='edit-box'
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                        </th>
                    </tr>
                    <tr>
                        Wheel Base
                        <th>
                            <input
                                type='input' 
                                placeholder='edit wheel base'
                                className='edit-box'
                                value={wheelBase}
                                onChange={(e) => setWheelBase(e.target.value)}
                            />
                        </th>
                    </tr>
                    <tr>
                        Fuel Consumption
                        <th>
                            <input
                                type='input' 
                                placeholder='edit fuel consumption'
                                className='edit-box'
                                value={fuelConsumption}
                                onChange={(e) => setFuelConsumption(e.target.value)}
                            />
                        </th>
                    </tr>
                    <tr>
                        Curb Weight
                        <th>
                            <input
                                type='input' 
                                placeholder='edit curb weight'
                                className='edit-box'
                                value={curbWeight}
                                onChange={(e) => setCurbWeight(e.target.value)}
                            />
                        </th>
                    </tr>

                </table>
            )}</p>
        </div>
    );
};

export default CarDetails;