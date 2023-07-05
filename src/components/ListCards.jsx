import {
  Box,
  Card,
  CardBody,
  Grid,
  GridItem,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { listItems } from "../apis";
import { useEffect, useState } from "react";
import ThreeDotsEdit from "./ThreeDotsEdit";

const ListCards = ({ updateItem, update, editValue }) => {
  const [taskList, setTaskList] = useState();
  const [openEdit, setOpenEdit] = useState({ status: false, id: null });
  const getData = async () => {
    const data = await listItems();
    setTaskList(data);
  };

  useEffect(() => {
    getData();
  }, [updateItem]);
  return (
    <Stack padding={"2rem"}>
      <Grid
        templateColumns={[
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
          "repeat(5, 1fr)",
        ]}
        gap={6}
      >
        {taskList &&
          taskList.map(({ id, title, task }, index) => {
            return (
              <GridItem w="100%" key={index}>
                <Card>
                  <CardBody>
                    <Box position={"absolute"} right={2} top={2}>
                      <IconButton
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="See menu"
                        borderRadius={50}
                        icon={<BsThreeDotsVertical />}
                        color={"twitter.500"}
                        onClick={() => {
                          setOpenEdit({
                            status: !openEdit.status,
                            id: index,
                          });
                        }}
                      />
                    </Box>
                    {openEdit.status && index === openEdit.id && (
                      <ThreeDotsEdit
                        editValue={editValue}
                        edit={setOpenEdit}
                        id={id}
                        updateItem={updateItem}
                        update={update}
                      />
                    )}
                    <Text fontSize={20} fontWeight={600}>
                      {title}
                    </Text>
                    <Text>{task}</Text>
                  </CardBody>
                </Card>
              </GridItem>
            );
          })}
      </Grid>
    </Stack>
  );
};

export default ListCards;
