import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface YearState {
    startYear: number | null;
    endYear: number | null;
}

const initialState: YearState = {
    startYear: null,
    endYear: null,
};

const yearSlice = createSlice({
    name: "year",
    initialState,
    reducers: {
        setStartYear: (state, action: PayloadAction<number|null>) => {
            state.startYear = action.payload;
        },
        setEndYear: (state, action: PayloadAction<number|null>) => {
            state.endYear = action.payload;
        }
    },
});

export const { setStartYear, setEndYear } = yearSlice.actions;

export default yearSlice.reducer;
