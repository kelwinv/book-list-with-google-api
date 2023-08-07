"use client";

import { Container, Skeleton } from "@chakra-ui/react";
import { BookCard } from "./BookCard";
import { UIEvent, useCallback, useEffect, useRef } from "react";
import { useBookContext } from "@/context/BookListContext";

const BookList: React.FC = () => {
  const {
    bookList,
    selectedBookId,
    setSelectedBookId,
    getNextPage,
    hasNextPage,
    isLoadingNextPage,
  } = useBookContext();
  const selectedBookRef = useRef<HTMLDivElement>(null);

  const handleBookClick = (bookId: string) => {
    setSelectedBookId(bookId);
  };

  const handleScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (!event.target || isLoadingNextPage) return;
      const target = event.target as unknown as {
        scrollHeight: number;
        scrollTop: number;
        clientHeight: number;
      };

      const bottom =
        target.scrollHeight - target.scrollTop <=
        target.clientHeight + target.clientHeight / 2;

      if (bottom && hasNextPage) {
        getNextPage();
      }
    },
    [getNextPage, hasNextPage, isLoadingNextPage],
  );

  useEffect(() => {
    if (selectedBookRef.current) {
      selectedBookRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedBookId]);

  if (bookList.length <= 0) return <></>;

  return (
    <Container
      className="flex h-full max-w-[min(75rem,90vw)] flex-col gap-6 overflow-y-scroll py-8"
      onScroll={handleScroll}
    >
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
        {isLoadingNextPage && (
          <>
            <Skeleton
              fadeDuration={10}
              color="whiteAlpha.100"
              className={`flex h-32 w-full max-w-lg gap-2 rounded-md shadow-md`}
            ></Skeleton>
            <Skeleton
              fadeDuration={10}
              color="whiteAlpha.100"
              className={`flex h-32 w-full max-w-lg gap-2 rounded-md shadow-md`}
            ></Skeleton>
          </>
        )}
      </main>
    </Container>
  );
};

export { BookList };
