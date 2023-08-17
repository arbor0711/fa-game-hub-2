import { Badge } from "@chakra-ui/react";
interface Props {
  score: number;
}

function CriticScore({ score }: Props) {
  let color = score >= 85 ? "green" : score >= 75 ? "yellow" : "";
  return (
    <>
      <Badge
        fontSize="14px"
        borderRadius="sm"
        variant="subtle"
        colorScheme={color}
      >
        {score}
      </Badge>
    </>
  );
}

export default CriticScore;
