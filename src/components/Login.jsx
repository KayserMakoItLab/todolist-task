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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { checkUser } from "../apis";
import { sendNotification } from "../utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    if (username && password) {
      const data = await checkUser(username, password);
      if (data && data.length !== 0) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
        sendNotification("success", "Successfully Logged In!");
      } else {
        console.log("here");
        sendNotification("error", "Invalid Username or Password!");
      }
    } else {
      sendNotification("error", "Username or Password is empty!");
    }
  };
  return (
    <>
      <ToastContainer />
      <Stack alignItems={"center"} height={"100vh"} justifyContent={"center"}>
        <Card align="center" width={["20rem"]} padding={5}>
          <CardHeader>
            <Heading size="lg" color={"twitter.500"}>
              Login
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
              Login
            </Button>
          </CardFooter>
          <Text textStyle="sm" whiteSpace="nowrap" color="GrayText">
            <Link href="/signup">Click here to register</Link>
          </Text>
        </Card>
      </Stack>
    </>
  );
};

export default Login;
