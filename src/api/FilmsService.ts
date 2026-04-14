import { BASE_URL } from "../constants/constants.ts";
import type {
  GetFilmsResponseType,
  IGetFilmsErrorResponse, IGetFilmsRequest,
} from "./apiTypes.ts";

class FilmsService {
  static async getFilms(body: IGetFilmsRequest) {
    try {
      const response = await fetch(`${BASE_URL}/getFilms`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json",
        },
      });
      return this.checkResponseStatus(response);
    } catch (err) {
      throw new Error(err);
    }
  }

  private static async checkResponseStatus(response: Response) {
    const responseJSON: GetFilmsResponseType = await response.json();
    if (responseJSON.success) {
      return responseJSON;
    } else {
      const errorResponse = responseJSON as IGetFilmsErrorResponse;
      throw new Error(errorResponse.errorMessage);
    }
  }
}

export default FilmsService;
