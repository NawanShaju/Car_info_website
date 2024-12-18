import { CarInfo, getData } from "../datastore";

function findCars(carNames: string | string[]): CarInfo[] {
    const data = getData();
    const cars = data.carInfo;

    const namesArray = Array.isArray(carNames) ? carNames : [carNames];
    const searchQuery = namesArray.map((name) => name.toLowerCase());


    const matchedCars = cars.filter((car) =>
        searchQuery.some((name) => car.name.toLowerCase().includes(name))
    );

    if (matchedCars.length === 0) {
        throw new Error('Error: no cars found matching the search criteria');
    }

    return matchedCars;
}

export default findCars;