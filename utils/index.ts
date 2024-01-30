import axios from 'axios';

const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars';
const key = '7c9f770815msh49ad6e51ed9a9d4p1be69djsn11f5aac32c95';
const host = 'cars-by-api-ninjas.p.rapidapi.com';

export const getCars = async () => {
	const options = {
		method: 'GET',
		url: url,
		params: { model: 'corolla' },
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

export const generateCarImageUrl = () => {};
