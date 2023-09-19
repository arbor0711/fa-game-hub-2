import {
  Box,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ExpandableText from "../components/ExpandableText";
import GameAttributes from "../components/GameAttributes";
import GameDetailMeta from "../components/GameDetailMeta";
import GameDetailPageHeader from "../components/GameDetailPageHeader";
import GameScreenshots from "../components/GameScreenshots";
import GameTrailer from "../components/GameTrailer";
import useGame from "../hooks/useGame";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const GameDetailPage = () => {
  // Measuring the height of the BOx element
  const ref = useRef<HTMLDivElement>(null);
  const [shiftUp, setShiftUp] = useState(0);
  const [show, setShow] = useState(true);
  useLayoutEffect(() => {
    const height = ref.current?.offsetHeight;
    if (height) setShiftUp(height);
    console.log(height);
    console.log(show);
  }, [show]);
  setInterval(() => setShow(false), 300);
  // ***

  const { slug } = useParams();
  // Error: Argument of type 'string | undefined' is not assignable to parameter of type 'string'. ==> Typescript think that maybe slug is undefined. But I know that this page will be called only if I have slug on url. So I have two approach to solve this. #1 useGame(slug || '') #2 better approach useGame(slug!)===> It is a type script trick. by appending an exclamation mark to this const you telling the typescript compiler that this const never be null
  const { data: game, isLoading, error } = useGame(slug!);
  if (isLoading) return <Spinner />;
  if (error || !game) throw error;

  return (
    <>
      <Image
        src={game.background_image}
        zIndex={-1}
        w="100%"
        h="500px"
        objectFit="cover"
      />
      <SimpleGrid
        column={{ base: 1, md: 2 }}
        position={"relative"}
        top={`-${shiftUp * 1.3}px`}
        transition="all .2s"
      >
        <GameDetailPageHeader game={game} />
        <GridItem p={3}>
          <Box
            ref={ref}
            bgColor="blackAlpha.900"
            p={6}
            borderRadius="lg"
            display="inline-block"
            mb={`${shiftUp * 0.5}px`}
            hidden={show}
            transition="all .2s"
          >
            <GameDetailMeta game={game} />
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              mt="20px"
              color="HighlightText"
            >
              {game.name}
            </Heading>
          </Box>
          <ExpandableText>{game.description_raw}</ExpandableText>
          <GameAttributes game={game} />
        </GridItem>
        <GridItem>
          <GameScreenshots gameId={game.id} />
          <GameTrailer gameId={game.id} />
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default GameDetailPage;
