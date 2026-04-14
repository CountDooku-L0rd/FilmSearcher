import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface GenreState {
    genreValue: { value: string; label: string };
}

const initialState: GenreState = {
    genreValue: { value: 'allGenres', label: 'Все жанры'}
};

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {
        setGenreValue: (state, action: PayloadAction<{value:string, label:string}>) => {
            state.genreValue.value = action.payload.value;
            state.genreValue.label = action.payload.label;
        }
    },
});

export const { setGenreValue } = genreSlice.actions;

export default genreSlice.reducer;
