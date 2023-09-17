import { Text, Button, Collapse } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  // #First Approach
  //   return (
  //     <>
  //       <Collapse startingHeight={50} in={expanded}>
  //         <Text>{children}</Text>
  //       </Collapse>
  //       <Button
  //         onClick={() => setExpanded(!expanded)}
  //         mt={3}
  //         bgGradient="linear(to-l, #7928CA, #FF0080)"
  //         _hover={{ bgGradient: "linear(to-l, #1978CA, #FF0080)" }}
  //         transition={"all 15s ease-in-out"}
  //       >
  //         {expanded ? "Show Less" : "Show More"}
  //       </Button>
  //     </>
  //   );

  // #Second Approach
  const limit = 300; //character limitation
  if (!children) return null;

  if (children.length <= 300) return <Text>{children}</Text>;

  const summary = children.substring(0, limit);
  return (
    <>
      <Text>{expanded ? children : summary + ". . ."}</Text>
      <Button
        onClick={() => setExpanded(!expanded)}
        mt={3}
        size="sm"
        fontWeight="bold"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        _hover={{
          bgGradient: "linear(to-l, #1978CA, #FF0080)",
          transitionDuration: "2s",
        }}
      >
        {expanded ? "Show Less" : "Show More"}
      </Button>
    </>
  );
};

export default ExpandableText;
