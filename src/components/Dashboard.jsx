import { Avatar, Button, Stack, Text } from "@chakra-ui/react";
import ListCards from "./ListCards";
import CreateCard from "./CreateCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Dashboard = () => {
  const navigate = useNavigate();

  const [editItem, setEditItem] = useState({ status: false, id: null });
  const [updateItem, setUpdateItem] = useState(false);
  const [name, setName] = useState();

  if (!JSON.parse(localStorage.getItem("name"))) {
    navigate("/login");
  }

  useEffect(() => {
    setName(JSON.parse(localStorage.getItem("name")));
  }, []);

  return (
    <Stack w={"100vw"} h={"100vh"}>
      <NavBar name={name} />
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
