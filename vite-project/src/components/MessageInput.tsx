import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Stack } from "@mui/joy";
import Badge from "@mui/joy/Badge";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListSubheader from "@mui/joy/ListSubheader";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";

import eventBus from "../util/eventBus";

export type MessageInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  onSubmit: () => void;
  chooseModel: (props: any) => void;
  selectedModelData: any[];
  isShow: boolean;
  setSelectedModelData: (props: any) => void;
};

export default function MessageInput(props: MessageInputProps) {
  const {
    textAreaValue,
    setTextAreaValue,
    onSubmit,
    chooseModel,
    selectedModelData,
    isShow,
    setSelectedModelData,
  } = props;
  const textAreaRef = React.useRef<HTMLDivElement>(null);
  const handleClick = () => {
    if (textAreaValue.trim() !== "") {
      onSubmit();
    }
  };
  const [showSelectedMode, setShowSelectedMode] = React.useState(false);

  return (
    <Box sx={{ px: 2, pb: 1.5 }}>
      <FormControl>
        <Textarea
          placeholder="请输入你的查询要求"
          ref={textAreaRef}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          value={textAreaValue}
          minRows={3}
          maxRows={10}
          endDecorator={
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              flexGrow={1}
              width={"100%"}
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                padding: "8px 8px 3px 8px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: "38px",
                  top: "-4px",
                  paddingTop: "10px",
                }}
                onMouseLeave={() => {
                  setShowSelectedMode(false);
                }}
                onMouseEnter={() => {
                  setShowSelectedMode(true);
                }}
              >
                <Button
                  size="sm"
                  color="primary"
                  sx={{
                    alignSelf: "center",
                    borderRadius: "sm",
                    mr: "20px",
                  }}
                  onClick={() => {
                    chooseModel(true);
                  }}
                >
                  选择模型
                </Button>
                <List
                  variant="outlined"
                  sx={{
                    minWidth: "180px",
                    borderRadius: "sm",
                    position: "absolute",
                    bottom: "35px",
                    left: "40px",
                    zIndex: 1000,
                    backgroundColor: "white",
                    display:
                      showSelectedMode && selectedModelData?.length
                        ? "block"
                        : "none",
                  }}
                >
                  <ListItem nested>
                    <ListSubheader>
                      <Badge
                        badgeInset="3px -13px 0 0"
                        badgeContent={selectedModelData?.length}
                        variant="soft"
                      >
                        <Typography
                          level="title-sm"
                          sx={{ fontWeight: "700", fontSize: "15px" }}
                        >
                          已选模型
                        </Typography>
                      </Badge>
                    </ListSubheader>
                    <List>
                      {selectedModelData?.map((item: any) => (
                        <ListItem key={item.id}>
                          <ListItemButton
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignContent: "center",
                              "&:hover .CloseIcon ": {
                                display: "block",
                              },
                            }}
                          >
                            <Typography level="body-sm">{item.text}</Typography>
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                let newSelectedModelData: any[] = [];
                                newSelectedModelData = selectedModelData.filter(
                                  (item1) => item.id !== item1.id
                                );
                                setSelectedModelData(newSelectedModelData);
                                let deleteData = selectedModelData.filter(
                                  (item1) => item.id === item1.id
                                );
                                eventBus.$emit("updateDate", deleteData);
                              }}
                            >
                              <CloseIcon
                                className="CloseIcon"
                                sx={{ display: "none" }}
                              />
                            </div>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                </List>
              </div>
              <Button
                size="sm"
                color="primary"
                sx={{ alignSelf: "center", borderRadius: "sm" }}
                endDecorator={<SendRoundedIcon />}
                onClick={handleClick}
                disabled={isShow}
              >
                发送
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            "& textarea:first-of-type": {
              minHeight: 72,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
