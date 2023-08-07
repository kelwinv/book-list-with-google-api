"use client";
import { responseBookListType, searchBooks } from "@/utils/googleBooksAPI";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

interface BookContextData {
  selectedBookId: string | null;
  setSelectedBookId: React.Dispatch<React.SetStateAction<string | null>>;
  bookList: responseBookListType[];
  setBookList: React.Dispatch<React.SetStateAction<responseBookListType[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSearch: (
    bookName: string,
    callBackNotFound?: () => void,
  ) => Promise<void>;
  getNextPage: () => Promise<void>;
}

const BookContext = createContext<BookContextData>({} as BookContextData);

export function BookProvider({ children }: { children: ReactNode }) {
  const pageLimit = 10;

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [bookList, setBookList] = useState<responseBookListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accPageName, setAccPageName] = useState("");
  const [accPageIdx, setAccPageIdx] = useState(pageLimit);
  const [hasNextPage, setHasNextPage] = useState(true);

  const handleSearch = useCallback(
    async (bookName: string, callBackNotFound?: () => void) => {
      setIsLoading(true);
      setBookList([]);
      const books = await searchBooks(bookName);

      if (!books || books.length <= 0) {
        if (callBackNotFound) callBackNotFound();

        setIsLoading(false);
      }

      setBookList(books);
      setAccPageName(bookName);

      setIsLoading(false);
      setHasNextPage(true);
    },
    [setIsLoading, setBookList, setAccPageName],
  );

  const getNextPage = useCallback(async () => {
    if (!hasNextPage) return;

    const newBooks = await searchBooks(accPageName, accPageIdx);
    if (newBooks.length < pageLimit) setHasNextPage(false);

    setAccPageIdx((old) => old + pageLimit);
    setBookList((oldList) => [...oldList, ...newBooks]);
  }, [hasNextPage, accPageName, accPageIdx]);

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
        getNextPage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  return useContext(BookContext);
}
