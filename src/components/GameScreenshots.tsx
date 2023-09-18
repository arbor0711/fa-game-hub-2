import { Box, Heading, Image, SimpleGrid, Spinner } from "@chakra-ui/react";
import useScreenshots from "../hooks/useScreenshots";
import { Screenshot } from "../entities/Screenshot";

interface Props {
  gameId: number;
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, error, isLoading } = useScreenshots(gameId);
  if (isLoading) return <Spinner />;
  if (error) throw error;

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, xl: 3 }}
      spacing={4}
      id="screenshots"
      justifyContent="center"
      alignItems="center"
    >
      {data?.results.map((item) => (
        <Image
          borderRadius="md"
          src={item.image}
          objectFit="cover"
          key={item.id}
          h="auto"
        />
      ))}
    </SimpleGrid>
  );
};

export default GameScreenshots;
