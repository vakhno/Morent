export const calculateCarRent = (city_mpg: number, year: number) => {
	const basePricePerDay = 50;
	const mileageFactor = 0.1;
	const ageFactor = 0.05;
	const milageRate = city_mpg * mileageFactor;
	const ageRate = (new Date().getFullYear() - year) * ageFactor;
	const rentalRatePerDay = basePricePerDay + milageRate + ageRate;
	return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
	const searchParams = new URLSearchParams(window.location.search);
	searchParams.set(type, value.toString());
	const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
	return newPathName;
};
