import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/game-center.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import useGameQueryStore from "../store";

function NavBar() {
  return (
    <HStack m="10px" alignItems={"center"} justifyContent={"space-between"}>
      <Link to="/" onClick={() => useGameQueryStore()}>
        <Image src={logo} boxSize="80px" />
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
}

export default NavBar;
