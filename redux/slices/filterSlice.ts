import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type filterInitialStateType = {
	filterFuel: string;
	filterYear: number;
};

const initialState: filterInitialStateType = {
	filterFuel: '',
	filterYear: new Date().getFullYear() - 1, // -1 of curent year because DB doesnt contain newest vehicles
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilterFuel: (state, action: PayloadAction<string>) => {
			state.filterFuel = action.payload;
		},
		setFilterYear: (state, action: PayloadAction<string | number>) => {
			const updatedYear =
				typeof action.payload === 'string' ? Number(action.payload) : action.payload;
			state.filterYear = updatedYear;
		},
	},
});

export const { setFilterFuel, setFilterYear } = filterSlice.actions;
export default filterSlice.reducer;
