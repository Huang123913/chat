import { Fragment } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/joy";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import { tableList } from "../data";

type ChatListItemProps = {
  sessionItem: object;
  setTableData: (pros: []) => void;
  setSessionItem: (pros: object) => void;
  deleteMessageList: (deleteItem: any) => void;
  isSelected: boolean;
  setSelectedSessionItem: (pros: object) => void;
};

export default function ChatListItem(props: ChatListItemProps) {
  const {
    sessionItem,
    setSessionItem,
    setTableData,
    deleteMessageList,
    isSelected,
    setSelectedSessionItem,
  } = props;

  let selectedModelString = sessionItem?.selectedModel
    ? JSON.parse(sessionItem.selectedModel)
        .map((item: any) => item.text)
        .join(";")
    : "";

  return (
    <Fragment>
      <ListItem>
        <ListItemButton
          selected={isSelected}
          color="neutral"
          sx={{
            width: "100%",
            flexDirection: "column",
            alignItems: "initial",
            position: "relative",
            "&:hover .deleteMessageItem ": {
              display: "flex",
            },
            overflow: "hidden",
            boxSizing: "border-box",
          }}
          onClick={() => {
            setTableData(tableList[sessionItem?.index % 2 === 0 ? 0 : 1]);
            setSessionItem(sessionItem);
            setSelectedSessionItem(sessionItem);
          }}
        >
          <Stack direction="row">
            <Box sx={{ flex: 1 }}>
              <Typography level="title-md" sx={{ color: "rgb(23, 26, 28)" }}>
                {sessionItem.textAreaValue}
              </Typography>
              <Typography level="body-sm" sx={{ color: "rgb(85, 94, 104)" }}>
                {selectedModelString}
              </Typography>
            </Box>
            <Box>
              <Typography
                level="body-xs"
                noWrap
                sx={{ color: "rgb(85, 94, 104)" }}
              >
                {sessionItem.searchTime}
              </Typography>
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{ color: "rgb(85, 94, 104)", marginTop: "-5px" }}
          >
            {sessionItem?.sql}
          </Typography>
          <Box
            sx={{
              display: "none",
              alignItems: "center",
              position: "absolute",
              right: "-6px",
              top: 0,
              bottom: 0,
              height: "100%",
            }}
            className="deleteMessageItem"
          >
            <IconButton
              color="neutral"
              size="sm"
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                deleteMessageList(sessionItem.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ my: 0 }} />
    </Fragment>
  );
}
