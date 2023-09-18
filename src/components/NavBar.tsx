import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/pacman-25805.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import useGameQueryStore from "../store";

function NavBar() {
  return (
    <HStack padding={"10px"}>
      <Link to="/" onClick={() => useGameQueryStore()}>
        <Image src={logo} boxSize="60px" objectFit="cover" />
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
}

export default NavBar;
