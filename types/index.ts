export type CarType = {
	city_mpg: number;
	class: string;
	combination_mpg: number;
	cylinders: number;
	displacement: number;
	drive: string;
	fuel_type: string;
	highway_mpg: number;
	make: string;
	model: string;
	transmission: string;
	year: number;
};

export type SelectorType = {
	title: string;
	value: string;
};

export type SearchDataType = {
	make: string;
	model: string;
	fuel: string;
	year: number;
	limit: number;
};
