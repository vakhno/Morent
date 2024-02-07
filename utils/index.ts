import axios from 'axios';

const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars';
const key = '7c9f770815msh49ad6e51ed9a9d4p1be69djsn11f5aac32c95';
const host = 'cars-by-api-ninjas.p.rapidapi.com';

export const getCars = async (
	make: string,
	model: string,
	fuel: string,
	year: number,
	limit: number,
) => {
	const options = {
		method: 'GET',
		url: url,
		params: { make: make, model: model, limit: limit, year: year, fuel_type: '' },
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

export const updateSearchParams = (type: string, value: string | number) => {
	const searchParams = new URLSearchParams(window.location.search);
	searchParams.set(type, value.toString());
	const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
	return newPathName;
};

// const MERCEDES_ID = '943e1c5a-fe71-4c80-b389-73634848d378';
// const MERCEDEC_KEY = 'b5d61b95-a1dc-45be-9c28-9e93f0c713e6';
// // const MERCEDES_URL = 'https://api.mercedes-benz.com/configurator/v2/markets?language=de';
// const MERCEDES_URL =
// 	'https://api.mercedes-benz.com/configurator/v2/markets/de_DE/models/2324501/configurations/AU-801_GC-421_LE-L_LU-197_MJ-804_PC-P44-P49-P64-PBG-PSA_PS-160%2523-292%2523-573%2523-U26%2523_SA-01U-02B-14U-16U-17U-20U-218-234-235-243-249-258-262-272-275-295-299-309-30U-318-321-34U-351-355-365-367-383-3U0-403-42U-43U-440-464-475-486-500-513-51U-534-537-543-551-581-628-670-6U3-70B-72B-740-79B-868-871-873-881-889-893-897-927-942-969-986-B01-B06-B51-H80-L6J-R01-RVA-U01-U10-U22-U35-U45-U60-U88_SC-0S3-0U1-1B3-2U1-2U8-3S6-4S6-502-50V-51B-6P5-7B4-8P3-8U7-8U8-998-B10-K14-K31-K37-PVJ-R6E/images/vehicle?perspectives=EXT020%2CINT1&background=false&night=false&roofOpen=false&fileFormat=PNG';

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
