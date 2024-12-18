import { getData } from "../datastore"

function showAll() {
    const data = getData();
    return data.carInfo;
}

export default showAll;