"use client";
import { responseBookListType } from "@/utils/googleBooksAPI";
import { createContext, useContext, useState, ReactNode } from "react";

interface BookContextData {
  selectedBookId: string | null;
  setSelectedBookId: React.Dispatch<React.SetStateAction<string | null>>;
  bookList: responseBookListType[];
  setBookList: React.Dispatch<React.SetStateAction<responseBookListType[]>>;
}

const BookContext = createContext<BookContextData>({} as BookContextData);

export function BookProvider({ children }: { children: ReactNode }) {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [bookList, setBookList] = useState<responseBookListType[]>([]);

  return (
    <BookContext.Provider
      value={{
        selectedBookId,
        setSelectedBookId,
        bookList,
        setBookList,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  return useContext(BookContext);
}
