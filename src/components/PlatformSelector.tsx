import { useState } from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import usePlatforms, { Platform } from "../hooks/usePlatforms";
import { BsChevronDown } from "react-icons/bs";
import useGames from "../hooks/useGames";

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatformId?: number;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatformId }: Props) => {
  const { data, error } = usePlatforms();
  const selectedPlatform = data?.results.find(
    (p) => p.id === selectedPlatformId
  );

  if (error) return null;
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList overflow={"auto"} height="50vh">
        {data?.results.map((platform) => {
          return (
            <MenuItem
              key={platform.id}
              onClick={() => {
                onSelectPlatform(platform);
              }}
            >
              {platform.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default PlatformSelector;
