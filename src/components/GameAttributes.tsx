import { Grid, GridItem, Heading, List, ListItem } from "@chakra-ui/react";
import { Game } from "../entities/Game";
import CriticScore from "./CriticScore";
import DefinitionItem from "./DefinitionItem";

interface Props {
  game: Game;
}
const GameAttributes = ({ game }: Props) => {
  return (
    <>
      <Heading as="h3" size="md" id="metadata" mt={3} mb={1}>
        Meta data
      </Heading>
      <Grid
        as={"dl"}
        h="auto"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <GridItem colSpan={1}>
          <DefinitionItem term="Platforms">
            <List>
              {game.parent_platforms.map(({ platform }) => {
                return <ListItem key={platform.id}>{platform.name}</ListItem>;
              })}
            </List>
          </DefinitionItem>
        </GridItem>

        <GridItem colSpan={1}>
          <DefinitionItem term="Metascore">
            <CriticScore score={game.metacritic} />
          </DefinitionItem>
        </GridItem>
        <GridItem colSpan={1}>
          <DefinitionItem term="Genres">
            <List>
              {game.genres.map((genre) => {
                return <ListItem key={genre.id}>{genre.name}</ListItem>;
              })}
            </List>
          </DefinitionItem>
        </GridItem>
        <GridItem colSpan={1}>
          <DefinitionItem term="Publishers">
            <List>
              {game.publishers?.map((publisher) => {
                return <ListItem key={publisher.id}>{publisher.name}</ListItem>;
              })}
            </List>
          </DefinitionItem>
        </GridItem>
      </Grid>
    </>
  );
};

export default GameAttributes;
