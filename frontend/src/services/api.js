const BASE_URL = "http://127.0.0.1:3200/";

export async function searchCars(query) {
    const res = await fetch(`${BASE_URL}find/searched/car?carName=${query}`, {
        method: 'GET'
    })

    const data = await res.json()
    return data
}

export async function getAllCars() {
    const res = await fetch(`${BASE_URL}get/all/cars`, {
        method: 'GET'
    })

    const data = await res.json()
    return data
}

export async function addData(carData) {
    const res = await fetch(`${BASE_URL}create/car/data`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            carData: carData
        })
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to send car data');
    }

    return await res.json();
}

export async function deleteData(carName) {
    const res = await fetch(`${BASE_URL}delete/car/data?carName=${carName}`, {
        method: 'DELETE',
    });

    const data = await res.json()
    return data
}

export async function filterFind(filter, filterName) {
    const res = await fetch(`${BASE_URL}get/car/data/filtered?filter=${filter}&filterName=${filterName}`, {
        method: 'GET',
    });

    const data = await res.json()
    return data
}

export async function updateData(carData, carName) {
    const res = await fetch(`${BASE_URL}update/car/data`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            carData: carData,
            carName: carName
        })
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to send car data');
    }

    return await res.json();
}