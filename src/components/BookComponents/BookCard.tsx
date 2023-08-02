import { Badge, Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

type BookCardType = {
  id: string;
  listPrice?: { amount: number; currencyCode: string };
  volumeInfo: {
    authors: string[];
    categories: string[];
    imageUrl: string;
    title: string;
    subtitle: string;
  };
};

const BookCard: React.FC<BookCardType> = ({ id, listPrice, volumeInfo }) => {
  const imageLoader = () => {
    return volumeInfo.imageUrl;
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Image
        loader={imageLoader}
        src={"book-loading.jpg"}
        alt={volumeInfo.title}
        height={200}
        width={200}
        objectFit="cover"
      />
      <Heading as="h3" fontSize="lg" mt={2}>
        {volumeInfo.title}
      </Heading>
      {volumeInfo.subtitle && (
        <Text fontSize="md" color="gray.600" fontStyle="italic">
          {volumeInfo.subtitle}
        </Text>
      )}
      <Text fontSize="md" mt={2}>
        {volumeInfo.authors.join(", ")}
      </Text>
      <Box mt={2}>
        {volumeInfo.categories?.map((category) => (
          <Badge key={category} colorScheme="teal" mr={2}>
            {category}
          </Badge>
        ))}
      </Box>
      {listPrice && (
        <Text mt={2}>
          Price: {listPrice.amount} {listPrice.currencyCode}
        </Text>
      )}
    </Box>
  );
};

export { BookCard };
