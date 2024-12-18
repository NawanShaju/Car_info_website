import { Filter, getData, CarInfo } from "../datastore";


function filteredResult(filter: string, filterName: string | number): CarInfo[] {
    const data = getData();
    const filteredCars: CarInfo[] = [];
    
    
    if (filter === Filter.MAKE) {
        
        for (let car of data.carInfo) {
            if (car.make.toLowerCase() === filterName) {
                filteredCars.push(car);
            }
        }

    } else if (filter === Filter.TYPE) {
        for (let car of data.carInfo) {
            if (car.type.toLowerCase() === filterName) {
                filteredCars.push(car);
            }
        }
    } else if (filter === Filter.MODELYEAR) {
        for (let car of data.carInfo) {
            if (car.modelYear === filterName) {
                filteredCars.push(car);
            }
        }
    } else {
        throw new Error('Error: filter does not exists');
    }

    return filteredCars;
}

export default filteredResult;