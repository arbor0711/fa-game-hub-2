import React from "react";
import useGame from "../hooks/useGame";
import { useNavigate, useParams } from "react-router-dom";
import useGames from "../hooks/useGames";
import { Heading, Spinner, Text } from "@chakra-ui/react";

const GameDetailPage = () => {
  const { slug } = useParams();
  // Error: Argument of type 'string | undefined' is not assignable to parameter of type 'string'. ==> Typescript think that maybe slug is undefined. But I know that this page will be called only if I have slug on url. So I have two approach to solve this. #1 useGame(slug || '') #2 better approach useGame(slug!)===> It is a type script trick. by appending an exclamation mark to this const you telling the typescript compiler that this const never be null
  const { data: game, isLoading, error } = useGame(slug!);
  if (isLoading) return <Spinner />;
  if (error || !game) throw error;

  return (
    <>
      <Heading>{game.name}</Heading>
      <Text>{game.description_raw}</Text>
    </>
  );
};

export default GameDetailPage;
