import React from "react";
import { Button, Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Render from "./Render";
import "./styles.css";

export default function LandingPage() {
  return (
    <>
      <Render />
      <MainContainer />
    </>
  );
}

const MainContainer = () => {
  return (
    <Flex
      width="full"
      minHeight="100vh"
      align="center"
      justifyContent="center"
      p={4}
    >
      <Box
        px={4}
        width="full"
        maxWidth="700px"
        borderRadius={7}
        textAlign="center"
        boxShadow="xl"
        bg="blackAlpha.900"
      >
        <Box p={4}>
          <Content />
        </Box>
      </Box>
    </Flex>
  );
};

const Content = () => {
  return (
    <>
      <Text
        color={"whiteAlpha.900"}
        fontSize="3xl"
        style={{ wordSpacing: "-5px" }}
      >
        DYSLEXIANS 'are' <strike class="rotate">people</strike> t0O{" "}
      </Text>
      <Text color={"whiteAlpha.900"} fontSize="xl">
        What do we do❓
      </Text>
      <Text color={"whiteAlpha.900"}>
        We collect donation and provide personalize guidance to dyslexic people
        because we think its not a mental state that cannot be cured but need
        bit time , energy & efforts.
      </Text>
      <DonateBtn />
    </>
  );
};

const DonateBtn = () => {
  return (
    <Link to="/donation">
      <Button
        size="md"
        height="48px"
        width="200px"
        border="2px"
        borderColor="teal"
        my={4}
        ml={2}
      >
        Donate 💰
      </Button>
    </Link>
  );
};
