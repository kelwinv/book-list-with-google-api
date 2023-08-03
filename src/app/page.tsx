"use client";

import { BookList } from "@/components/BookComponents/BookList";
import { FooterBar } from "@/components/FooterBar";
import { Header } from "@/components/Header";
import { SearchInput } from "@/components/searchInput";
import { responseBookListType, searchBooks } from "@/utils/googleBooksAPI";
import { useState } from "react";

const HomePage: React.FC = () => {
  const [openList, setOpenList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookList, setBookList] = useState<responseBookListType[]>([]);

  const handleSearch = async (bookName: string) => {
    setIsLoading(true);
    setBookList([]);
    const books = await searchBooks(bookName);

    setBookList(books);

    setOpenList(true);
    setIsLoading(false);
  };

  return (
    <div className="flex h-full max-h-screen w-full flex-col justify-between bg-indigo-50">
      <Header />
      <main className="flex max-h-[calc(100vh-5rem-6rem)] flex-1 flex-col justify-center gap-8 delay-300 ease-linear">
        <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        {openList && <BookList bookList={bookList} />}
      </main>
      <FooterBar />
    </div>
  );
};

export default HomePage;
