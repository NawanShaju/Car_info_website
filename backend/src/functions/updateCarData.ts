import { CarInfo, getData } from "../datastore";

function updateCarData(carData: CarInfo, carName: string) {
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

    const existingCarData = data.carInfo.find((u) => u.name === carName);

    if (!existingCarData) {
        throw new Error('Error: the car does not exists, try create a new car');
    }

    existingCarData.name = carData.name;
    existingCarData.make = carData.make;
    existingCarData.img = carData.img;
    existingCarData.modelYear = carData.modelYear;
    existingCarData.type = carData.type;
    existingCarData.specs = carData.specs;

    return existingCarData.name;
}

export default updateCarData;