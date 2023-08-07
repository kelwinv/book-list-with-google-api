"use client";

import { useBookContext } from "@/context/BookListContext";
import {
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchInput: React.FC = () => {
  const { isLoading, handleSearch } = useBookContext();

  const [openButtonText, setOpenButtonText] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isValueEmpty, setIsValueEmpty] = useState(false);

  const onSearch = () => {
    if (!searchText) {
      setIsValueEmpty(true);
      return;
    }
    handleSearch(searchText);
  };

  return (
    <div className="mx-auto w-full max-w-[min(40rem,90vw)]">
      <InputGroup
        onFocus={() => setOpenButtonText(true)}
        onMouseLeave={() => setOpenButtonText(false)}
      >
        <Input
          isInvalid={isValueEmpty}
          placeholder="Pesquise seu livro"
          variant="flushed"
          size="lg"
          value={searchText}
          _placeholder={{
            opacity: 0.4,
            color: isValueEmpty ? "tomato" : "inherit",
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
            setIsValueEmpty(false);
          }}
          onKeyDown={({ key }) => {
            if (key === "Enter" && !isLoading) onSearch();
          }}
          className={openButtonText ? "pr-32" : "pr-10"}
        />
        <InputRightElement
          className={`${
            openButtonText ? "w-32" : "w-8"
          } h-3/4 duration-500 ease-linear`}
          onMouseEnter={() => setOpenButtonText(true)}
        >
          <Button
            isLoading={isLoading}
            variant="outline"
            leftIcon={<AiOutlineSearch className="translate-x-1" />}
            colorScheme="blue"
            className="h-full"
            onClick={onSearch}
          >
            <p
              className={`${
                openButtonText ? "w-[100%]" : "w-[0%]"
              } overflow-hidden duration-500  ease-linear`}
            >
              Buscar
            </p>
          </Button>
        </InputRightElement>
      </InputGroup>
      {isValueEmpty && (
        <Text fontSize="sm" color="tomato" className="mt-2">
          O valor não pode ser vazio
        </Text>
      )}
    </div>
  );
};

export { SearchInput };
