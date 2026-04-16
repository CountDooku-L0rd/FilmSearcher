import { BASE_URL } from "../constants/constants.ts";
import type {FilmsAPI, IErrorResponse} from "@yp-mentor/films-server-types";

type GetFilmsRequestType = Parameters<FilmsAPI['getFilms']>[0];
type GetFilmsSuccessResponseType = ReturnType<FilmsAPI['getFilms']>;
type CreateFilmRequestType = Parameters<FilmsAPI['createFilm']>[0];
type CreateFilmResponseType = ReturnType<FilmsAPI['createFilm']>;
type DeleteFilmRequestType = Parameters<FilmsAPI['deleteFilm']>[0];
type DeleteFilmResponseType = ReturnType<FilmsAPI['deleteFilm']>;
type UpdateFilmRequestType = Parameters<FilmsAPI['updateFilm']>[0];
type UpdateFilmResponseType = ReturnType<FilmsAPI['updateFilm']>;
class FilmsService implements FilmsAPI {
 async getFilms(body: GetFilmsRequestType): GetFilmsSuccessResponseType {
    try {
      const response = await fetch(`${BASE_URL}/getFilms`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });
      return this.checkResponseStatus(response);
    } catch (err: unknown){
      if (err instanceof Error){
        throw new Error(err.message);
      } else{
        throw err;
      }
    }
  }

  async createFilm(body: CreateFilmRequestType):  CreateFilmResponseType{
    try{
      const response = await fetch(`${BASE_URL}/createFilm`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });
      return this.checkResponseStatus(response);
    } catch (err: unknown){
      if (err instanceof Error){
        throw new Error(err.message);
      } else{
        throw err;
      }
    }
  }

  async deleteFilm (id: DeleteFilmRequestType): DeleteFilmResponseType {
    try {
      const response = await fetch(`${BASE_URL}/deleteFilm/:${id.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      return this.checkResponseStatus(response)
    } catch (err: unknown){
      if (err instanceof Error){
        throw new Error(err.message);
      } else{
        throw err;
      }
    }
  }

  async updateFilm(request: UpdateFilmRequestType  ): UpdateFilmResponseType {
   try {
     const response = await fetch(`${BASE_URL}/updateFilm/:${request.id}`, {
       method: "PUT",
       body: JSON.stringify(request.body),
       headers: {
         "Content-type": "application/json",
       }
     })
     return this.checkResponseStatus(response)
   } catch (err: unknown){
     if (err instanceof Error){
       throw new Error(err.message);
     } else{
       throw err;
     }
   }
  }
  private async checkResponseStatus <T extends {success: true}>(response: Response) {
    const responseJSON = await response.json() as T | IErrorResponse;
    if (responseJSON.success) {
      return responseJSON;
    } else {
      throw new Error(responseJSON.errorMessage);
    }
  }
}

export default FilmsService;
