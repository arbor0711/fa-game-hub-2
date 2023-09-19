import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, useColorMode } from "@chakra-ui/react";

function ColorModeSwitch() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack onClick={toggleColorMode} cursor="pointer">
      {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
    </HStack>
  );
}

export default ColorModeSwitch;
