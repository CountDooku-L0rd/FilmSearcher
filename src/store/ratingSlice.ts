import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface RatingState {
    ratingValue: { value: string; label: string };
}

const initialState: RatingState = {
    ratingValue: { value: 'allRatings', label: 'Любой рейтинг'}
};

const ratingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {
        setRatingValue: (state, action: PayloadAction<{value:string, label:string}>) => {
            state.ratingValue.value = action.payload.value;
            state.ratingValue.label = action.payload.label;
        }
    },
});

export const { setRatingValue } = ratingSlice.actions;

export default ratingSlice.reducer;
