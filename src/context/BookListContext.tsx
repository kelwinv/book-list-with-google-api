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
  hasNextPage: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSearch: (
    bookName: string,
    callBackNotFound?: () => void,
  ) => Promise<void>;
  getNextPage: () => Promise<void>;
  accSearchText: string;
  isLoadingNextPage: boolean;
}

const BookContext = createContext<BookContextData>({} as BookContextData);

export function BookProvider({ children }: { children: ReactNode }) {
  const pageLimit = 10;

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [bookList, setBookList] = useState<responseBookListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accSearchText, setAccSearchText] = useState("");
  const [accPageIdx, setAccPageIdx] = useState(pageLimit);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);

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
      setAccSearchText(bookName);
      setAccPageIdx(pageLimit);

      setIsLoading(false);
      setHasNextPage(true);
    },
    [setIsLoading, setBookList, setAccSearchText],
  );

  const removeDuplicates = (accArray: responseBookListType[]) => {
    // ainda não foi identificado o motivo, mas as vezes o google retorna duplicatas
    const uniqueIds: string[] = [];

    return accArray.filter(({ id }) => {
      const isDuplicate = uniqueIds.includes(id);

      if (!isDuplicate) {
        uniqueIds.push(id);

        return true;
      }

      return false;
    });
  };

  const getNextPage = useCallback(async () => {
    if (!hasNextPage) return;
    setIsLoadingNextPage(true);

    const newBooks = await searchBooks(accSearchText, accPageIdx);
    if (newBooks.length < pageLimit) setHasNextPage(false);

    setAccPageIdx((old) => old + pageLimit);
    setBookList((oldList) => removeDuplicates([...oldList, ...newBooks]));
    setIsLoadingNextPage(false);
  }, [hasNextPage, accSearchText, accPageIdx]);

  return (
    <BookContext.Provider
      value={{
        selectedBookId,
        setSelectedBookId,
        bookList,
        setBookList,
        isLoading,
        hasNextPage,
        setIsLoading,
        handleSearch,
        getNextPage,
        accSearchText,
        isLoadingNextPage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBookContext() {
  return useContext(BookContext);
}
