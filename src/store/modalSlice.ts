import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { EStatus, type FilmsAPI } from "@yp-mentor/films-server-types";

type IFilm = Awaited<ReturnType<FilmsAPI["getFilms"]>>["data"][number];

interface ModalState {
  data: IFilm;
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
}

const initialState: ModalState = {
  data: {
    id: -1,
    createdAt: "",
    director: "",
    genres: [],
    rating: 0,
    status: EStatus.in_plans,
    title: "",
    year: 0,
  },
  isEditModalOpen: false,
  isAddModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IFilm>) => {
      state.data = action.payload;
    },
    setIsEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditModalOpen = action.payload;
    },
    setIsAddModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddModalOpen = action.payload;
    },
  },
});

export const { setData, setIsEditModalOpen, setIsAddModalOpen } =
  modalSlice.actions;

export default modalSlice.reducer;
