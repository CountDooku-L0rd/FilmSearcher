import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { EStatus, type FilmsAPI } from "@yp-mentor/films-server-types";

type IFilm = Awaited<ReturnType<FilmsAPI["getFilms"]>>["data"][number];

interface IErrors {
  title: string;
  year: string;
  director: string;
  genres: string;
  rating: string;
}

interface ModalState {
  data: IFilm;
  isEditModalOpen: boolean;
  isAddModalOpen: boolean;
  errors: IErrors;
  isRequesting: boolean;
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
  errors: {
    title: "",
    year: "",
    director: "",
    genres: "",
    rating: "",
  },
  isRequesting: false,
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
    setErrors: (state, action: PayloadAction<IErrors>) => {
      state.errors = action.payload;
    },
    setIsRequesting: (state, action: PayloadAction<boolean>) => {
      state.isRequesting = action.payload;
    },
    resetModal: () => initialState,
  },
});

export const {
  setData,
  setIsEditModalOpen,
  setIsAddModalOpen,
  setErrors,
  setIsRequesting,
  resetModal,
} = modalSlice.actions;

export default modalSlice.reducer;
