import { Box, Button, Stack } from "@chakra-ui/react";
import { deleteItembyId } from "../apis";
import { sendNotification } from "../utils";

const ThreeDotsEdit = ({ editValue, edit, id, update, updateItem }) => {
  return (
    <Box
      position={"absolute"}
      as={Stack}
      flexDirection={"column"}
      spacing={0}
      right={-10}
      zIndex={2}
    >
      <Button
        borderRadius={"4px 4px 0px 0px"}
        fontSize={14}
        onClick={() => {
          editValue({ status: true, id: id });
          edit({ status: false, id: null });
        }}
      >
        Edit
      </Button>
      <Button
        borderRadius={0}
        fontSize={14}
        onClick={async () => {
          await deleteItembyId(id);
          edit({ status: false, id: null });
          update(!updateItem);
          sendNotification("error", "Successfully Item Deleted!");
        }}
      >
        Delete
      </Button>
      <Button
        borderRadius={"0px 0px 4px 4px"}
        fontSize={14}
        onClick={() => {
          edit({ status: false, id: null });
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default ThreeDotsEdit;
