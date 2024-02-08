import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CarType, SearchDataType } from '@/types';
import { dataLoadingStatus } from '@/enums';
import axios from 'axios';

type dataInitialStateType = {
	data: CarType[] | [];
	vehiclePerPage: string;
	dataLoading: dataLoadingStatus.LOADING | dataLoadingStatus.SUCCESS | dataLoadingStatus.ERROR;
};

const initialState: dataInitialStateType = {
	data: [],
	vehiclePerPage: '10',
	dataLoading: dataLoadingStatus.LOADING,
};

export const fetchData = createAsyncThunk<CarType[], SearchDataType>(
	'data/fetchData',
	async ({ make, model, fuel, year, limit }) => {
		console.log('make, model, fuel, year, limit', make, model, fuel, year, limit);
		const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars';
		const key = '7c9f770815msh49ad6e51ed9a9d4p1be69djsn11f5aac32c95';
		const host = 'cars-by-api-ninjas.p.rapidapi.com';
		const options = {
			method: 'GET',
			url: url,
			params: { make: make, model: model, limit: limit, year: year, fuel_type: fuel },
			headers: {
				'X-RapidAPI-Key': key,
				'X-RapidAPI-Host': host,
			},
		};
		const { data } = await axios.request(options);
		const result = data || [];
		return result;
	},
);

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setVehiclePerPage: (state, action: PayloadAction<string>) => {
			state.vehiclePerPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.dataLoading = dataLoadingStatus.LOADING;
			})
			.addCase(fetchData.fulfilled, (state, action: PayloadAction<CarType[]>) => {
				state.data = action.payload;
				state.dataLoading = dataLoadingStatus.SUCCESS;
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.dataLoading = dataLoadingStatus.ERROR;
				console.log('ERROR: ', action);
			});
	},
});

export const { setVehiclePerPage } = dataSlice.actions;
export default dataSlice.reducer;
