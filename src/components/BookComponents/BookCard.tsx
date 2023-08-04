import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { Ref } from "react";

type BookCardType = {
  id: string;
  price?: { amount: number; currencyCode: string };
  volumeInfo: {
    authors?: string[];
    categories: string[];
    imageUrl: string;
    title: string;
    subtitle?: string;
  };
  isSelected: boolean;
  onBookClick: () => void;
  innerRef?: Ref<HTMLDivElement>;
};

const BookCard: React.FC<BookCardType> = ({
  id,
  price,
  volumeInfo,
  isSelected,
  onBookClick,
  innerRef,
}) => {
  const imageLoader = () => {
    return volumeInfo.imageUrl;
  };

  return (
    <Card
      ref={innerRef}
      overflow="hidden"
      direction={{ base: "column", sm: "row" }}
      className={`flex w-full max-w-lg gap-2 rounded-md shadow-md ${
        isSelected ? "border-4 border-blue-500" : ""
      }`}
      onClick={onBookClick}
    >
      <div className="flex h-full w-full max-w-[12rem] overflow-hidden rounded-md">
        <Image
          loader={imageLoader}
          src={"book-loading.jpg"}
          alt={volumeInfo.title}
          height={128}
          width={100}
          objectPosition="start"
          className="w-full object-cover"
        />
      </div>
      <Stack className="flex flex-1 flex-col justify-between gap-4 ">
        <CardBody>
          <Heading as="h3" fontSize="lg">
            {volumeInfo.title}
          </Heading>
          {volumeInfo.subtitle && (
            <Text
              fontSize="md"
              color="gray.600"
              fontStyle="italic"
              className="max-w-[18rem] flex-wrap truncate"
            >
              {volumeInfo.subtitle}
            </Text>
          )}
          {volumeInfo?.authors && (
            <Text
              fontSize="md"
              color="gray.600"
              fontStyle="italic"
              className="max-w-[18rem] flex-nowrap truncate"
            >
              <strong>Autores:</strong> {" " + volumeInfo.authors.join(" | ")}
            </Text>
          )}
        </CardBody>

        <CardFooter className="flex flex-col gap-2 pb-1">
          <Box className="flex items-end justify-between">
            {price && (
              <Text color="teal">
                <strong className="text-black">Price: </strong>
                {price.amount} {price.currencyCode}
              </Text>
            )}
            <NextLink href={`/book-details/${id}`} className="underline">
              Ver detalhes
            </NextLink>
          </Box>
          <Box className="flex  gap-2">
            {volumeInfo.categories?.map((category) => (
              <Badge
                key={category}
                colorScheme="teal"
                className="rounded-full p-1"
              >
                {category}
              </Badge>
            ))}
          </Box>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export { BookCard };
