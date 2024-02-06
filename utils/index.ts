import axios from 'axios';

const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars';
const key = '7c9f770815msh49ad6e51ed9a9d4p1be69djsn11f5aac32c95';
const host = 'cars-by-api-ninjas.p.rapidapi.com';

export const getCars = async (
	manufacturer: string,
	model: string,
	fuel: string,
	year: number,
	limit: number,
) => {
	const options = {
		method: 'GET',
		url: url,
		params: { make: manufacturer, model: model, limit: limit, year: year, fuel_type: fuel },
		headers: {
			'X-RapidAPI-Key': key,
			'X-RapidAPI-Host': host,
		},
	};
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const calculateCarRent = (city_mpg: number, year: number) => {
	const basePricePerDay = 50;
	const mileageFactor = 0.1;
	const ageFactor = 0.05;
	const milageRate = city_mpg * mileageFactor;
	const ageRate = (new Date().getFullYear() - year) * ageFactor;
	const rentalRatePerDay = basePricePerDay + milageRate + ageRate;
	return rentalRatePerDay.toFixed(0);
};

const MERCEDES_ID = '943e1c5a-fe71-4c80-b389-73634848d378';
const MERCEDEC_KEY = '038dbc28-de90-4f35-a375-06025256a724';
// const MERCEDES_URL = 'https://api.mercedes-benz.com/configurator/v2/markets?language=de';
const MERCEDES_URL = 'https://api.mercedes-benz.com/vehicle_images/v2/equipments/WDD2221321A316870';

// export const generateCarImageUrl = async () => {
// 	const options = {
// 		method: 'GET',
// 		url: MERCEDES_URL,
// 		headers: {
// 			'x-api-key': MERCEDEC_KEY,
// 			accept: 'application/json',
// 		},
// 	};

// 	try {
// 		const response = await axios.request(options);
// 		return response.data;
// 	} catch (error) {
// 		console.error(error);
// 		throw error;
// 	}
// };
