import React, { useState } from "react";
import {
  Button,
  Box,
  Flex,
  FormControl,
  Heading,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react";

export default function TryForm() {
  return <MainContainer />;
}

const MainContainer = () => {
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      p={4}
    >
      <Box
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={7}
        textAlign="center"
        boxShadow="xl"
        bg="blackAlpha.500"
      >
        <Box p={4}>
          <DonationHeader />
          <DonationForm />
        </Box>
      </Box>
    </Flex>
  );
};

const DonationHeader = () => {
  return (
    <Box textAlign="center">
      <Heading
        style={{
          borderBottom: "3px solid white",
          paddingBottom: "2px",
          borderTop: "6px solid white",
        }}
      >
        DONATION DETAILS
      </Heading>
    </Box>
  );
};

const DonationForm = () => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [val, setVal] = useState(0);
  const [name, setName] = useState("");

  // VALIDATE THE FINAL PAYEMENT
  const postCallback = async (callback) => {
    // console.log(callback);
    fetch(process.env.REACT_APP_SERVER_VALIDATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(callback),
    });

    const final = {
      callback,
      name,
      email,
    };
    // console.log(final);
    var done = await fetch(process.env.REACT_APP_MAIL_SENDER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(final),
    });
    done = await done.json();
    console.log(done, "EMAIL SEND");
    toast({
      position: "top-right",
      title: "Donation successful.",
      description: "We've recieved your donation ❤.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    {
      console.log("WHAT THE");
    }
  };

  // PLACE THE ORDER
  const order = async () => {
    // console.log("CLCIKDE");
    let options = {
      amount: val,
    };
    // console.log(options, "HEYfhhg");
    // console.log(process.env.REACT_APP_SERVER_ORDERS);
    const order_data = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    });
    const data = await order_data.json();
    return data;
  };

  // DRIVER CODE THIS RUNS THE ENTIRE FRONT END
  const displayRazorpay = async () => {
    // console.log("CLCIKDE");
    const data = await order();
    // console.log(data);
    var options = {
      key: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
      amount: data.amount,
      currency: data.currency,
      name: "Donation",
      description: "Thank you for donation",
      order_id: data.id,
      handler: function (response) {
        const callback = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          amount: data.amount,
        };
        return postCallback(callback);
      },
      prefill: {
        name: name,
        email: email,
      },
    };

    var rzp1 = new window.Razorpay(options);

    rzp1.open();

    rzp1.on("payment.failed", function (response) {
      const errorResponse = {
        error: response.error,
      };
      console.log(errorResponse);
    });
  };

  const handleSubmit = (e) => {
    console.log(name, val, email);
    e.preventDefault();
    if (name === "") {
      toast({
        position: "top-right",
        title: "An error occurred.",
        description: "Name is not provided.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (email === "") {
      toast({
        position: "top-right",
        title: "An error occurred.",
        description: "Email is not provided.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    displayRazorpay();
  };

  return (
    <Box my={8} textAlign="left">
      <form action="/">
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </FormControl>

        <FormControl mt={4} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            isRequired
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </FormControl>

        <FormControl id="amount" isRequired my={2}>
          <FormLabel>Amount (in ₹)</FormLabel>
          <NumberInput min={1}>
            <NumberInputField
              placeholder="Amount"
              onChange={(e) => setVal(e.target.value)}
              value={val}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          borderColor="green.500"
          type="submit"
          mt={4}
          onClick={handleSubmit}
        >
          Donate 💸
        </Button>
      </form>
    </Box>
  );
};
