import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type searchInitialStateType = {
	searchMake: string;
	searchModel: string;
};

const initialState: searchInitialStateType = {
	searchMake: '',
	searchModel: '',
};

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchMake: (state, action: PayloadAction<string>) => {
			state.searchMake = action.payload;
		},
		setSearchModel: (state, action: PayloadAction<string>) => {
			state.searchModel = action.payload;
		},
	},
});

export const { setSearchMake, setSearchModel } = searchSlice.actions;
export default searchSlice.reducer;
