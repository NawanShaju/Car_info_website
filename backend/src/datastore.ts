interface dataStore {
    carInfo: CarInfo[];
}

export interface CarInfo {
    name: string,
    make: string,
    img: string | null,
    modelYear: string,
    type: string | null,
    specs: Specs | null;
}

interface Specs {
    engine: string | null,
    horsepower: string | null,
    length: string | null,
    width: string | null,
    height: string | null,
    wheelBase: string | null,
    fuelConsumption: string | null,
    curbWeight: string | null,
}

export enum Filter {
    MAKE = "make",
    MODELYEAR = "modelYear",
    TYPE = "type",
}


const data: dataStore = {
    carInfo: []
};


export const getData = (): dataStore => data;