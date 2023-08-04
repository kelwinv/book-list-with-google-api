"use client";

import { responseBookListType } from "@/utils/googleBooksAPI";
import { Container } from "@chakra-ui/react";
import { BookCard } from "./BookCard";
import { useEffect, useRef } from "react";
import { useBookContext } from "@/context/BookListContext";

const BookList: React.FC = () => {
  const { bookList, selectedBookId, setSelectedBookId } = useBookContext();
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

  return (
    <Container className="flex w-full max-w-[min(75rem,90vw)] flex-wrap justify-between gap-8 overflow-y-scroll py-8 max-2xl:justify-center">
      {bookList.map(({ id, saleInfo, volumeInfo }) => (
        <BookCard
          key={id}
          id={id}
          price={saleInfo.listPrice}
          isSelected={selectedBookId === id}
          volumeInfo={{
            authors: volumeInfo.authors,
            categories: volumeInfo.categories || [],
            imageUrl:
              volumeInfo.imageLinks["smallThumbnail"] ||
              volumeInfo.imageLinks["thumbnail"],
            subtitle: volumeInfo.subtitle,
            title: volumeInfo.title,
          }}
          onBookClick={() => handleBookClick(id)}
          innerRef={selectedBookId === id ? selectedBookRef : null}
        />
      ))}
    </Container>
  );
};

export { BookList };
