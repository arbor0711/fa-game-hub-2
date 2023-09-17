import {
  Box,
  Flex,
  HStack,
  StackProps,
  VStack,
  Image,
  Link,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { BiGift } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import React, { useEffect, useRef, useState, ReactNode } from "react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Game } from "../entities/Game";
import { platform } from "os";
import PlatformIconList from "./PlatformIconList";

interface Visibility {
  height: string;
  opacity: string;
  zIndex: string;
}

interface Props {
  game: Game;
}

const GameHeader = ({ game }: Props) => {
  const [isVisible, setIsVisible] = useState<Visibility>({
    height: "0",
    opacity: "0",
    zIndex: "-1",
  });

  const ref = useRef<HTMLDivElement>(null);
  const boxHeight = ref.current?.clientHeight;

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let hightToShowBox = 100;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    winScroll > hightToShowBox
      ? setIsVisible({
          height: `${boxHeight} + 20 + px`, //10px padding
          opacity: "100",
          zIndex: "1",
        })
      : setIsVisible({
          height: "0",
          opacity: "0",
          zIndex: "-1",
        });
  };

  return (
    isVisible && (
      <Box
        className="game-header"
        p="10px"
        position={"fixed"}
        top={0}
        left={0}
        bgColor={"blackAlpha.900"}
        w="100%"
        h={isVisible.height}
        opacity={isVisible.opacity}
        transition={"all .3s"}
        zIndex={isVisible.zIndex}
      >
        <HStack
          ref={ref}
          className="game-header-wrapper"
          alignContent={"space-between"}
          justifyContent={"space-between"}
        >
          <HStack className="game-card-compact">
            <ArrowUpIcon
              _hover={{
                transform: "translatey(-5px)",
                transition: "transform .2s",
              }}
            />

            <Image
              src={game.background_image_additional}
              alt="Dan Abramov"
              boxSize="100px"
              borderRadius={"md"}
              objectFit={"cover"}
            />
            <VStack
              className="game-card-compact=info"
              justifyContent={"start"}
              alignItems={"flex-start"}
              ml={3}
            >
              <PlatformIconList
                platforms={game.parent_platforms.map((p) => p.platform)}
              />

              <Heading fontSize={"md"}>{game.name}</Heading>
              <HStack mt={2} justifyContent={"center"}>
                <Link>
                  <Icon
                    p="1px"
                    borderRadius={"sm"}
                    as={BiGift}
                    _hover={{ bgColor: "#EDF2F7", color: "#000" }}
                  />
                </Link>
                <Link>
                  <Icon
                    p="1px"
                    borderRadius={"sm"}
                    as={MdOutlineRateReview}
                    _hover={{ bgColor: "#EDF2F7", color: "#000" }}
                  />
                </Link>
              </HStack>
            </VStack>
          </HStack>
          <div className="game-header-menu">game-header-menu</div>
        </HStack>
      </Box>
    )
  );
};

export default GameHeader;
