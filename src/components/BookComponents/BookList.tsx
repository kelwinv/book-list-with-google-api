"use client";

import { Button, Container } from "@chakra-ui/react";
import { BookCard } from "./BookCard";
import { useEffect, useRef } from "react";
import { useBookContext } from "@/context/BookListContext";

const BookList: React.FC = () => {
  const { bookList, selectedBookId, setSelectedBookId, getNextPage } =
    useBookContext();
  const selectedBookRef = useRef<HTMLDivElement>(null);

  const handleBookClick = (bookId: string) => {
    setSelectedBookId(bookId);
  };

  useEffect(() => {
    if (selectedBookRef.current) {
      selectedBookRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedBookId]);

  if (bookList.length <= 0) return <></>;

  return (
    <Container className="flex h-full max-w-[min(75rem,90vw)] flex-col gap-6 overflow-y-scroll py-8">
      <main className="flex w-full flex-wrap justify-between gap-8 max-2xl:justify-center">
        {bookList.map(({ id, saleInfo, volumeInfo }) => (
          <BookCard
            key={id}
            id={id}
            price={saleInfo.listPrice}
            isSelected={selectedBookId === id}
            volumeInfo={{
              authors: volumeInfo.authors,
              categories: volumeInfo.categories || [],
              imageLinks: Object.values(volumeInfo.imageLinks || []),
              subtitle: volumeInfo.subtitle,
              title: volumeInfo.title,
            }}
            onBookClick={() => handleBookClick(id)}
            innerRef={selectedBookId === id ? selectedBookRef : null}
          />
        ))}
      </main>
      <Button
        className="m-auto flex w-full max-w-md"
        variant="outline"
        color="blueviolet"
        onClick={getNextPage}
      >
        Ver mais
      </Button>
    </Container>
  );
};

export { BookList };
