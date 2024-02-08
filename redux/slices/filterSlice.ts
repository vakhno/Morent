import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type filterInitialStateType = {
	filterFuel: string;
	filterYear: string;
};

const initialState: filterInitialStateType = {
	filterFuel: '',
	filterYear: (new Date().getFullYear() - 1).toString(), // -1 of current year (2024), because DB contain too old data
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilterFuel: (state, action: PayloadAction<string>) => {
			state.filterFuel = action.payload;
		},
		setFilterYear: (state, action: PayloadAction<string>) => {
			state.filterYear = action.payload;
		},
	},
});

export const { setFilterFuel, setFilterYear } = filterSlice.actions;
export default filterSlice.reducer;
