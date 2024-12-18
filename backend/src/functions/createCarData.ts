
import { CarInfo, getData } from "../datastore";

function createNewCar(carData: CarInfo): string {
    const data = getData();

    if (!carData) {
        throw new Error('Error: car data is empty');
    }

    if (!carData.name) {
        throw new Error('Error: car name cannot be empty');
    } else if (!carData.make)  {
        throw new Error('Error: car make cannot be empty');
    } else if (!carData.modelYear) {
        throw new Error('Error: car model year cannot be empty');
    }


    const carExists = data.carInfo.find((u) => u.name === carData.name);

    if (carExists) {
        throw new Error('Error: car already exist add to exisiting data or view');
    }

    data.carInfo.push(carData);

    return carData.name;
}

export default createNewCar;