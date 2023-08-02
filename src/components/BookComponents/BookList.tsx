import { responseBookListType } from "@/utils/googleBooksAPI";
import { Container } from "@chakra-ui/react";
import { BookCard } from "./BookCard";

type BookListType = {
  bookList: responseBookListType[];
};

const BookList: React.FC<BookListType> = ({ bookList }) => {
  return (
    <Container>
      {bookList.map(({ id, saleInfo, volumeInfo }) => (
        <BookCard
          key={id}
          id={id}
          listPrice={saleInfo.listPrice}
          volumeInfo={{
            authors: volumeInfo.authors,
            categories: volumeInfo.categories || [],
            imageUrl:
              volumeInfo.imageLinks["thumbnail"] ||
              volumeInfo.imageLinks["smallThumbnail"],
            subtitle: volumeInfo.subtitle,
            title: volumeInfo.title,
          }}
        />
      ))}
    </Container>
  );
};

export { BookList };
