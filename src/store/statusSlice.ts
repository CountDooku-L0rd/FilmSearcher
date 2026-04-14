import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface StatusState {
    statusValue: { value: string; label: string };
}

const initialState: StatusState = {
    statusValue: { value: 'allStatuses', label: 'Все статусы'}
};

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        setStatusValue: (state, action: PayloadAction<{value:string, label:string}>) => {
            state.statusValue.value = action.payload.value;
            state.statusValue.label = action.payload.label;
        }
    },
});

export const { setStatusValue } = statusSlice.actions;

export default statusSlice.reducer;
