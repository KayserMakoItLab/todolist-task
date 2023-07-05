import { AddIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createItem, getItemById, updateItemById } from "../apis";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendNotification } from "../utils";

const CreateCard = ({ updateRender, updateItem, editValue, edit }) => {
  const [title, setTitle] = useState();
  const [task, setTask] = useState();
  const payload = {
    title: title,
    task: task,
    username: JSON.parse(localStorage.getItem("name")),
  };

  const getEditItem = async () => {
    const data = await getItemById(editValue.id);
    setTitle(data[0].title);
    setTask(data[0].task);
  };

  useEffect(() => {
    if (editValue.status) {
      getEditItem();
    }
  }, [editValue]);

  const handleSubmitClick = async () => {
    if (title && task) {
      if (editValue.status) {
        await updateItemById(editValue.id, payload);
        sendNotification("info", "Successfully Item Updated!");
        setTask("");
        setTitle("");
        edit({ status: false, id: null });
        updateRender(!updateItem);
      } else {
        await createItem(payload);
        sendNotification("success", "Successfully Item Created!");
        setTask("");
        setTitle("");
        updateRender(!updateItem);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <Stack width={["15rem", "20rem"]} alignSelf={"center"}>
        <Card padding={5} paddingBottom={10} as={Stack} spacing={4}>
          <Text>Create new item!</Text>
          <Input
            type="text"
            variant={"filled"}
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            maxBlockSize={80}
            variant={"filled"}
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your tasks"
          />
          <Box
            position={"absolute"}
            bottom={-5}
            right={2}
            onClick={handleSubmitClick}
          >
            <IconButton
              borderRadius={50}
              variant="solid"
              colorScheme="twitter"
              aria-label="See menu"
              icon={editValue.status ? <TriangleUpIcon /> : <AddIcon />}
            />
          </Box>
        </Card>
      </Stack>
    </>
  );
};

export default CreateCard;
