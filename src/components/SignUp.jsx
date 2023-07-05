import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { checkEmailExist, createUser } from "../apis";
import { sendNotification } from "../utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    if (email && password && username) {
      const validateEmail =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (email.match(validateEmail)) {
        if (password.length >= 8) {
          const payload = {
            username: username,
            email: email,
            password: password,
          };
          const data = await checkEmailExist(email);
          if (data.length === 0) {
            createUser(payload);
            sendNotification(
              "success",
              "User successfully created, redirecting to dashboard!"
            );
            setTimeout(() => {
              navigate("/");
            }, 3000);
          } else {
            sendNotification("error", "Email already registered!");
          }
        } else {
          sendNotification("error", "Enter a valid password!");
        }
      } else {
        sendNotification("error", "Enter a valid email address!");
      }
    } else {
      sendNotification("error", "Email or Password is missing!");
    }
  };

  return (
    <>
      <ToastContainer />
      <Stack alignItems={"center"} height={"100vh"} justifyContent={"center"}>
        <Card align="center" width={["20rem"]} padding={5}>
          <CardHeader>
            <Heading size="lg" color={"twitter.500"}>
              SignUp
            </Heading>
          </CardHeader>
          <CardBody
            padding={0}
            width={"100%"}
            as={Stack}
            spacing={5}
            alignItems={"center"}
          >
            <Input
              type="text"
              variant={"filled"}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              variant={"filled"}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                variant={"filled"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  h="1.75rem"
                  bgColor={"transparent"}
                  size="sm"
                  _hover={"none"}
                  _active={{ bgColor: "none" }}
                  onClick={handleClick}
                >
                  {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </CardBody>
          <CardFooter width={"100%"} paddingX={0}>
            <Button width={"100%"} colorScheme="twitter" onClick={handleSubmit}>
              Register
            </Button>
          </CardFooter>
          <Text textStyle="sm" whiteSpace="nowrap" color="GrayText">
            <Link href="/login">Already have an account!</Link>
          </Text>
          {/* <Stack
            mt={4}
            width={"100%"}
            justifyContent={"space-evenly"}
            flexDirection={"row"}
            spacing={5}
          >
            <Button
              variant={"outline"}
              paddingY={2}
              paddingX={8}
              borderRadius={5}
            >
              <FcGoogle />
            </Button>
            <Button
              variant={"outline"}
              paddingY={2}
              paddingX={8}
              borderRadius={5}
            >
              <FaFacebook color="#3b5998" />
            </Button>
            <Button
              variant={"outline"}
              paddingY={2}
              paddingX={8}
              borderRadius={5}
            >
              <FaTwitter color="#00acee" />
            </Button>
          </Stack> */}
        </Card>
      </Stack>
    </>
  );
};

export default SignUp;
