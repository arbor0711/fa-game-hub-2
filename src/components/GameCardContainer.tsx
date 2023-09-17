import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const GameCardContainer = ({ children }: Props) => {
  return (
    <Box
      borderRadius={"lg"}
      overflow={"hidden"}
      _hover={{ base: "", md: { transform: "scale(1.03) " } }}
      transition={"transform 0.15s ease-in-out"}
    >
      {children}
    </Box>
  );
};

export default GameCardContainer;
