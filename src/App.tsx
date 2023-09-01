import { useState } from "react";
import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { Genre } from "./hooks/useGenres";
import PlatformSelector from "./components/PlatformSelector";
import { Platform } from "./hooks/usePlatforms";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

// NOTE: Whenever you want to refactor sth, first you should evaluate the impacts of this change. So, right click on the property and go to references. For example, here before I do refactoring, the genre has 3 references which indicates that this is fairly easy refactoring.

// undefined: the absence of a value
// null: the intentional absence of a value
// Regarding the above definition, It's better to change the first line of interface to "genre: Genre | undefined;". I wanna get only genre id instead a complex object. So, I'll change it to number from Genre ===> and then I can change " genre: number | undefined;" to "genre?: number;"
// The last thing is that for clarity I would prefer to rename property from genre to genreId. So, we(me and all other developer that review my code) know that it is a number.
export interface GameQuery {
  genreId?: number;
  platformId?: number;
  sortOrder: string;
  searchText: string;
}
function App() {
  //  TS does not alow me to assign to an empty object with GameQuery object. So I add 'as GameQuery'
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX="5">
          <GenreList
            selectedGenreId={gameQuery.genreId}
            onSelectGenre={(genre) => {
              setGameQuery({ ...gameQuery, genreId: genre.id });
            }}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box pl="15px">
          <GameHeading gameQuery={gameQuery} />
          <HStack mb={5} spacing={5}>
            <PlatformSelector
              selectedPlatformId={gameQuery.platformId}
              onSelectPlatform={(platform) => {
                // here if I forget to wrap all elements inside the parentheses in {}, it cause an error that says: "A spread argument must either have a tuple type or be passed to a rest parameter."
                setGameQuery({ ...gameQuery, platformId: platform.id });
              }}
            />
            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setGameQuery({ ...gameQuery, sortOrder })
              }
            />
          </HStack>
        </Box>

        <GameGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
}

export default App;
