import { Heading, Text, VStack } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { BiMessageSquareError } from "react-icons/bi";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <VStack my="20%" alignItems="center" justifyContent="center">
        <BiMessageSquareError
          style={{ width: "60px", height: "60px", color: "#c69035" }}
        />
        <Heading as="h1" size="md" m={2}>
          Something goes wrong
        </Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "This page does not exist."
            : "Sorry, an unexpected error occurred."}
        </Text>
      </VStack>
    </>
  );
};

export default ErrorPage;
