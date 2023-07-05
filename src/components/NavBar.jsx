import { Avatar, Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NavBar = ({ name }) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack
        position={"sticky"}
        width={"100%"}
        flexDir={"row"}
        alignItems={"center"}
        padding={3}
        bgColor={"#00acee"}
      >
        <Avatar size={"sm"} name={name} />
        <Text color={"#fff"}>{name && name.toLocaleUpperCase()}</Text>
      </Stack>
      <Button
        colorScheme="gray"
        position={"absolute"}
        top={2}
        right={2}
        onClick={() => {
          navigate("/login");
          localStorage.removeItem("name");
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default NavBar;
