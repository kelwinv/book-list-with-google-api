"use client";
import { responseBookListType, searchBooks } from "@/utils/googleBooksAPI";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface BookContextData {
  selectedBookId: string | null;
  setSelectedBookId: React.Dispatch<React.SetStateAction<string | null>>;
  bookList: responseBookListType[];
  setBookList: React.Dispatch<React.SetStateAction<responseBookListType[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSearch: (bookName: string) => Promise<void>;
}

const BookContext = createContext<BookContextData>({} as BookContextData);

export function BookProvider({ children }: { children: ReactNode }) {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [bookList, setBookList] = useState<responseBookListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (bookName: string) => {
    setIsLoading(true);
    setBookList([]);
    const books = await searchBooks(bookName);

    setBookList(books);

    setIsLoading(false);
  };

  return (
    <BookContext.Provider
      value={{
        selectedBookId,
        setSelectedBookId,
        bookList,
        setBookList,
        isLoading,
        setIsLoading,
        handleSearch,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  return useContext(BookContext);
}
