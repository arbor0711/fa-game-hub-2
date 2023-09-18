import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Show,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { BiGift } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import { Game } from "../entities/Game";
import PlatformIconList from "./PlatformIconList";

interface Visibility {
  height: string;
  opacity: string;
  zIndex: string;
}

interface Props {
  game: Game;
}

const GameDetailPageHeader = ({ game }: Props) => {
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
          alignContent={"space-between"}
          justifyContent={"space-between"}
        >
          <HStack className="game-card-compact">
            <Box
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              cursor="pointer"
            >
              <ArrowUpIcon
                _hover={{
                  transform: "translatey(-5px)",
                  transition: "transform .2s",
                }}
              />
            </Box>

            <Image
              src={game.background_image_additional}
              alt="Dan Abramov"
              boxSize="60px"
              borderRadius={"md"}
              objectFit={"cover"}
            />
            <VStack justifyContent={"start"} alignItems={"flex-start"} ml={3}>
              <PlatformIconList
                platforms={game.parent_platforms.map((p) => p.platform)}
              />

              <Heading fontSize={"sm"}>{game.name}</Heading>
              <HStack justifyContent={"center"}>
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

          <Show breakpoint="(min-width: 726px)">
            <HStack fontSize={"xs"}>
              <Link mr={6} href="#about">
                About
              </Link>
              <Link mr={6} href="#screenshots">
                Screenshots
              </Link>
              <Link mr={6} href="#metadata">
                MetaData
              </Link>
              <Link mr={6} href="#gameplay">
                Gameplay
              </Link>
            </HStack>
          </Show>
        </HStack>
      </Box>
    )
  );
};

export default GameDetailPageHeader;
