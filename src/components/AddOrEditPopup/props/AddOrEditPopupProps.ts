import type { EGenre, EStatus } from "@yp-mentor/films-server-types";

export interface AddOrEditPopupProps {
  data?: {
    id: number;
    title: string;
    director: string;
    year: number;
    createdAt: string;
    genres: EGenre[];
    description?: string;
    image?: string;
    rating: number;
    status: EStatus;
  };
  onClose: () => void;
  onSubmit: (
    body: {
      title: string;
      director: string;
      year: number;
      genres: EGenre[];
      description?: string;
      image?: string;
      rating: number;
      status: EStatus;
    },
    id?: string,
  ) => void;
  isModalOpen: boolean;
}
