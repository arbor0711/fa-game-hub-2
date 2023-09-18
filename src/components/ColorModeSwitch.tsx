import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function ColorModeSwitch() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack onClick={toggleColorMode} cursor="pointer" mx={4}>
      {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
    </HStack>
  );
}

export default ColorModeSwitch;
