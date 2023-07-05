import { Avatar, Button, Stack, Text } from "@chakra-ui/react";
import ListCards from "./ListCards";
import CreateCard from "./CreateCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  if (!JSON.parse(localStorage.getItem("name"))) {
    navigate("/login");
  }

  const [editItem, setEditItem] = useState({ status: false, id: null });
  const [updateItem, setUpdateItem] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    setName(JSON.parse(localStorage.getItem("name")));
  }, []);
  return (
    <Stack w={"100vw"} h={"100vh"}>
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
      <Text
        padding={2}
        textAlign={"center"}
        fontSize={32}
        fontWeight={600}
        color={"twitter.500"}
      >
        ToDo App
      </Text>
      <CreateCard
        updateItem={updateItem}
        updateRender={setUpdateItem}
        editValue={editItem}
        edit={setEditItem}
      />
      <ListCards
        updateItem={updateItem}
        update={setUpdateItem}
        editValue={setEditItem}
      />
    </Stack>
  );
};

export default Dashboard;
