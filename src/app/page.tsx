"use client";

import { BookList } from "@/components/BookList";
import { SearchInput } from "@/components/searchInput";
import { useState } from "react";

const HomePage: React.FC = () => {
  const [openList, setOpenList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookList, setBookList] = useState<[]>([]);

  const handleSearch = async (bookName: string) => {
    setOpenList(true);
    setIsLoading(true);
    // const res = await searchBooks("react");
    setBookList([]);

    alert(bookName);
    setIsLoading(false);
  };

  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-4 bg-indigo-50">
      <SearchInput onSearch={handleSearch} isLoading={isLoading} />
      {openList && <BookList bookList={bookList} />}
    </main>
  );
};

export default HomePage;
