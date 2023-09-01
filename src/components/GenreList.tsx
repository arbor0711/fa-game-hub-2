import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "./../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  // I will change the name for consistency
  selectedGenreId?: number;
}

const GenreList = ({ onSelectGenre, selectedGenreId }: Props) => {
  // When I hover on data I saw const data: any ===> So I should go to useGenres and provide a generic type argument
  const { data, isLoading, error } = useGenres();
  return (
    <>
      <Heading fontSize="2xl" mb={3}>
        Genres
      </Heading>
      <List>
        {/* I've got an error here that said Parameter 'genre' implicitly has an 'any' type. */}
        {/* After solving previous error, I got another one said 'data' is possibly 'undefined'. Which make sense because my call to the server might fail. So I should use OPTIONAL CHAINING ?  */}
        {data?.results.map((genre) => (
          <ListItem key={genre.id} paddingY="5px">
            <HStack
              bgColor={selectedGenreId === genre.id ? "ButtonFace" : ""}
              rounded={"base"}
              p={1}
            >
              <Image
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
                boxSize="32px"
                borderRadius={8}
              />
              <Button
                onClick={() => onSelectGenre(genre)}
                fontWeight={selectedGenreId === genre.id ? "bold" : ""}
                fontSize="lg"
                variant="link"
                whiteSpace="normal"
                textAlign="left"
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GenreList;
