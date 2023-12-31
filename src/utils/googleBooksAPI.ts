import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1";

const googleBooksApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-goog-api-key": process.env.GOOGLE_API_KEY,
  },
});

export type responseBookListType = {
  id: string;
  saleInfo: {
    listPrice?: { amount: number; currencyCode: string };
  };
  volumeInfo: {
    authors?: string[];
    categories?: string[];
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
    language: string;
    title: string;
    subtitle?: string;
  };
};

export const searchBooks = async (
  query: string,
  startIndex: number = 0,
): Promise<responseBookListType[]> => {
  try {
    const response = await googleBooksApi.get("/volumes", {
      params: {
        q: query,
        startIndex,
        orderBy: "relevance",
      },
    });
    if (response.data.items) {
      return response.data.items;
    }

    return [];
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};

export const getBookDetails = async <T>(id: string): Promise<T | undefined> => {
  try {
    const response = await googleBooksApi.get<T>(`/volumes/${id}`, {});

    if (response.data) {
      return response.data;
    }

    return undefined;
  } catch (error) {
    console.error("Error get book details:", error);
    return undefined;
  }
};
