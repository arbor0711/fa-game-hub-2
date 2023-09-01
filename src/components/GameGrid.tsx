import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

interface Props {
  gameQuery: GameQuery;
}

function GameGrid({ gameQuery }: Props) {
  // I pass the selectedGenre to my hook. Now go to useGames hook
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  //the error "Type '{}' is not assignable to type 'ReactNode'." means that react does not know how to render this error message. So to fix this I have to go back to my hook and provide generic type argument
  if (error) return <Text>{error.message}</Text>;
  return (
    <InfiniteScroll
      // For dataLength Mosh used another method. He, firstly, set a const named "fetchedGamesCount" and define it outside return, after error handling.
      // const fetchedGamesCount= data?.pages.reduce((total, page) => total + page.results.length, 0) || 0
      // But I think that I could count the pages inside dataLength, like below ===>
      dataLength={data?.pages.length || 0}
      hasMore={!!hasNextPage}
      next={fetchNextPage}
      // Very nice to know
      // If you have undefined value and you put !! in front of that you will got false. So when you have a value that is undefined or true, and you only want boolean, then you could use !! to transform it to boolean value.
      loader={<Spinner color="blue" my={7} />}
      endMessage={<Text>No more data to load.</Text>}
    >
      <SimpleGrid
        padding={"15px"}
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}

        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
}

export default GameGrid;
