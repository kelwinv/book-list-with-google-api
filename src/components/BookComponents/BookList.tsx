import { responseBookListType } from "@/utils/googleBooksAPI";
import { Container } from "@chakra-ui/react";
import { BookCard } from "./BookCard";

type BookListType = {
  bookList: responseBookListType[];
};

const BookList: React.FC<BookListType> = ({ bookList }) => {
  return (
    <Container className="flex w-full max-w-[min(75rem,90vw)] flex-wrap justify-between gap-8 overflow-y-scroll py-8 max-2xl:justify-center">
      {bookList.map(({ id, saleInfo, volumeInfo }) => (
        <BookCard
          key={id}
          id={id}
          price={saleInfo.listPrice}
          volumeInfo={{
            authors: volumeInfo.authors,
            categories: volumeInfo.categories || [],
            imageUrl:
              volumeInfo.imageLinks["smallThumbnail"] ||
              volumeInfo.imageLinks["thumbnail"],
            subtitle: volumeInfo.subtitle,
            title: volumeInfo.title,
          }}
        />
      ))}
    </Container>
  );
};

export { BookList };
