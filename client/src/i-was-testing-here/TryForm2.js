import React from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
} from "@chakra-ui/react";

const VARIANT_COLOR = "red";

export default function TryForm2() {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        // {"hmhmmhhmhmhmh"}
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  );
}

const LoginHeader = () => {
  return (
    <Box textAlign="center">
      <Heading>Donation Details</Heading>
    </Box>
  );
};

const LoginForm = () => {
  return (
    <Box my={8} textAlign="left">
      <form>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email address" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>

        <Button variantColor={VARIANT_COLOR} width="full" mt={4}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};
