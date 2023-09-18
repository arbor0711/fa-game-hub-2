import { Heading, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameDetailMeta from "../components/GameDetailMeta";
import GameDetailPageHeader from "../components/GameDetailPageHeader";
import useGame from "../hooks/useGame";

const GameDetailPage = () => {
  const { slug } = useParams();
  // Error: Argument of type 'string | undefined' is not assignable to parameter of type 'string'. ==> Typescript think that maybe slug is undefined. But I know that this page will be called only if I have slug on url. So I have two approach to solve this. #1 useGame(slug || '') #2 better approach useGame(slug!)===> It is a type script trick. by appending an exclamation mark to this const you telling the typescript compiler that this const never be null
  const { data: game, isLoading, error } = useGame(slug!);
  if (isLoading) return <Spinner />;
  if (error || !game) throw error;

  return (
    <>
      <GameDetailPageHeader game={game} />
      <GameDetailMeta game={game} />
      <Heading>{game.name}</Heading>
      <ExpandableText>{game.description_raw}</ExpandableText>
      <GameAttributes game={game} />
    </>
  );
};

export default GameDetailPage;
