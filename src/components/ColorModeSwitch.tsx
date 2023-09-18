<<<<<<< HEAD
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HStack, useColorMode } from "@chakra-ui/react";
=======
import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
>>>>>>> e427576c068583edc1d9c615b3098b874642ceed

function ColorModeSwitch() {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <HStack onClick={toggleColorMode} cursor="pointer" mx={4}>
      {colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
    </HStack>
  );
}

export default ColorModeSwitch;
