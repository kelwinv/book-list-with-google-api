"use client";

import { BookList } from "@/components/BookComponents/BookList";
import { FooterBar } from "@/components/FooterBar";
import { Header } from "@/components/Header";
import { SearchInput } from "@/components/searchInput";
import { useBookContext } from "@/context/BookListContext";
import { searchBooks } from "@/utils/googleBooksAPI";
import { useState } from "react";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setBookList, bookList } = useBookContext();

  const handleSearch = async (bookName: string) => {
    setIsLoading(true);
    setBookList([]);
    const books = await searchBooks(bookName);

    setBookList(books);

    setIsLoading(false);
  };

  return (
    <div className="flex h-full max-h-screen w-full flex-col justify-between bg-indigo-50">
      <Header />
      <main className="flex max-h-[calc(100vh-5rem-6rem)] flex-1 flex-col justify-center gap-8 delay-300 ease-linear">
        <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        {bookList.length > 0 && <BookList />}
      </main>
      <FooterBar />
    </div>
  );
};

export default HomePage;
