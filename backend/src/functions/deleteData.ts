import { getData } from "../datastore";

function deleteCarData(carName: string): {} {
    const data = getData();
    
    if (carName === '') {
        throw new Error('Error: car name is empty');
    }

    const carDataIndex = data.carInfo.findIndex((u) => u.name === carName)

    if (!carDataIndex) {
        throw new Error('Error: the car data does not exists');
    }

    data.carInfo.splice(carDataIndex, 1);
    
    return {};
}

export default deleteCarData;