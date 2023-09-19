import { Flex, Text } from "@chakra-ui/react";
import Game from "../entities/Game";
import PlatformIconList from "./PlatformIconList";

interface Props {
  game: Game;
}

const GameDetailMeta = ({ game }: Props) => {
  return (
    <Flex color="Highlight" direction={{ base: "column", md: "row" }}>
      <PlatformIconList
        platforms={game.parent_platforms.map((p) => p.platform)}
      />
      <Text color={"GrayText"}>AVERAGE PLAYTIME: {game.playtime} HOURS</Text>
    </Flex>
  );
};

export default GameDetailMeta;
