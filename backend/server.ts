/**
 * # `server.ts`
 *
 * The entrypoint to the express app.
 *
 * This file is responsible for defining the endpoints of your server.
 */
import express, { json, Response } from 'express';
import morgan from 'morgan';
import config from './src/config.json';
import cors from 'cors';
import process from 'process';
import { echo, clear, error } from './src/debug';
import { handleError } from './src/errors';
import fs from 'fs';
import { getData } from './src/datastore';
import {
  findCar,
  createNewCar,
  updateCarData,
  deleteCarData,
  filteredResult,
  showAll,
} from './src/functions/index'

const app = express();
app.use(json());
app.use(cors());
app.use(morgan('dev'));

const PORT: number = parseInt(process.env.PORT || config.port);
const IP: string = process.env.IP || config.ip;

/**
 * Adds the error handler to the given route.
 *
 * This attempts to call `callback`. If any error is thrown, it is passed to `handleError` to send
 * the correct response code.
 */
function withErrorHandler<T>(res: Response, callback: () => T): T | undefined {
  try {
    return callback();
  } catch (err) {
    handleError(res, err);
  }
}

// Debug routes
// ==================================================
// Note that in the real world, you should disable these when your app is running in production.

/** GET /debug/echo?value=ping */
app.get('/debug/echo', (req, res) => {
  withErrorHandler(res, () => {
    res.json(echo(req.query.value as string));
  });
});

/** GET /debug/error?code=401 */
app.get('/debug/error', (req, res) => {
  withErrorHandler(res, () => {
    res.json(error(parseInt(req.query.code as string)));
  });
});

/** DELETE /debug/clear */
app.delete('/debug/clear', (req, res) => {
  withErrorHandler(res, () => {
    clear();
    res.json({});
  });
});

// TODO: Add your routes here
// ==================================================

// Gets the dataStore from getData()
const dataStore = getData();

if (fs.existsSync('database.json')) {
  // Reads the data and returns a parsed data
  const data = String(fs.readFileSync('database.json'));
  const parsedData = JSON.parse(data);

  // Replaces each of the dataStore data with the parsed data
  dataStore.carInfo = parsedData.carInfo;
}

// When saving, write the new state of the dataStore
const save = () => {
  fs.writeFileSync('database.json', JSON.stringify(dataStore));
};


app.post('/create/car/data', (req, res) => {
  const { carData } = req.body;

  try {
    res.json(createNewCar(carData));
  } catch (err) {
    console.log({error: err.message})
    return res.status(400).json({error: err.message})
  }

  save();
});

app.put('/update/car/data', (req, res) => {
  const { carData, carName } = req.body;

  try {
    res.json(updateCarData(carData, carName));
  } catch (err) {
    return res.status(400).json({error: err.message})
  }

  save();
})

app.get('/find/searched/car', (req, res) => {
  const carName = req.query.carName as string;

  try {
    res.json(findCar(carName))
  } catch(err) {
    return res.status(400).json({ error: err.message });
  }
  
  save();
});

app.delete('/delete/car/data', (req, res) => {
  const carName = req.query.carName as string;

  try {
    res.json(deleteCarData(carName))
  } catch (err) {
    return res.status(400).json({error: err.message});
  }

  save();
})

app.get('/get/car/data/filtered', (req, res) => {
  const filter = req.query.filter as string;
  const filterName = req.query.filterName as string;

  try {
    res.json(filteredResult(filter, filterName));
  } catch (err) {
    return res.status(400).json({error: err.message});
  }

});

app.get('/get/all/cars', (req, res) => {

  try {
    res.json(showAll())
  } catch (err) {
    return res.status(400).json({error: err.message});
  }

  save();
})



// ==================================================

// Start server
const server = app.listen(PORT, IP, () => {
  console.log(`🐝 Your server is up and running! http://${IP}:${PORT}/`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n🌱 Shutting down server gracefully...');
  server.close(() => {
    console.log('🍂 Goodbye!');
    process.exit();
  });
});
