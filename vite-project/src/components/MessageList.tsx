import { useContext, useState } from "react";

import axios from "axios";

import CloseIcon from "@mui/icons-material/CloseRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Chip, IconButton, Input } from "@mui/joy";
import List from "@mui/joy/List";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

import { tableList } from "../data";
import getNowDate from "../util/getTime";
import { BrotherComContext } from "./BrotherComContext";
import Loading from "./Loading";
import MessageInput from "./MessageInput";
import MessageListItem from "./MessageListItem";
import Sidebar from "./Sidebar";

export default function MessageList() {
  const [textAreaValue, setTextAreaValue] = useState(""); //查询内容
  const [messageList, setMessageList] = useState<any[]>([]); //会话列表
  const [selectedSessionItem, setSelectedSessionItem] = useState({}); //被选的会话
  const [isOpen, setIsopen] = useState(false); //是否打开选择模型
  const [selectedModelData, setSelectedModelData] = useState<any[]>([]); //选择的数据
  const [isShowLoading, setIsShowLoading] = useState(false);
  const { sessionItem, setSessionItem, setTableData } =
    useContext(BrotherComContext);
  const [searchValue, setSearchValue] = useState(""); //搜索会话
  const [searchSession, setSearchSession] = useState<any[]>([]); //搜索的会话结果
  const [isShowSearchSession, setIsShowSearchSession] = useState(false); //是否显示搜索的结果

  //搜索
  const searchSessionFn = () => {
    setIsShowSearchSession(true);
    if (!searchValue) {
      setIsShowSearchSession(false);
    } else {
      setSearchSession(() => {
        let searchSession = messageList.filter((item) => {
          return item.textAreaValue.indexOf(searchValue) > -1;
        });
        setSessionItem(searchSession[0]);
        return searchSession.length ? searchSession : [];
      });
    }
  };

  //会话删除
  const deleteMessageList = (id: string) => {
    setMessageList(() => {
      let newMessageList = messageList.filter((item) => item.id !== id);
      let findSessionItem = newMessageList.find(
        (item) => item.textAreaValue === sessionItem?.textAreaValue
      );
      !findSessionItem && setSessionItem(newMessageList[0]);
      return newMessageList;
    });
  };

  return (
    <Sheet
      sx={{
        display: "flex",
        width: "40%",
        boxSizing: "border-box",
      }}
    >
      {/* 会话 */}
      <Sheet
        sx={{
          width: "100%",
          height: "100vh",
          borderRight: "1px solid",
          borderColor: "divider",
          backgroundColor: "rgb(240, 244, 248)",
        }}
      >
        <Sheet
          sx={{
            marginBottom: "20px",
            backgroundColor: "rgb(240, 244, 248)",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ boxSizing: "border-box", p: 2 }}
          >
            <Typography
              fontSize={{ xs: "md", md: "lg" }}
              component="h1"
              fontWeight="lg"
              endDecorator={
                <Chip
                  variant="soft"
                  color="primary"
                  size="md"
                  slotProps={{ root: { component: "span" } }}
                  sx={{ display: messageList.length ? "block" : "none" }}
                >
                  {messageList?.length}
                </Chip>
              }
              sx={{ mr: "auto" }}
            >
              会话
            </Typography>
            <Box>
              <IconButton
                title="清除会话"
                variant="plain"
                color="neutral"
                size="sm"
                onClick={() => {
                  setMessageList([]);
                  setSessionItem({});
                  setTableData([]);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Stack>
          <Box sx={{ px: 2, mb: 1.5, boxSizing: "border-box" }}>
            <Input
              size="sm"
              endDecorator={
                <>
                  <IconButton
                    size="sm"
                    sx={{
                      display: searchValue ? "block" : "none",
                      mr: 0.3,
                      position: "relative",
                      top: "2px",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                    onClick={() => {
                      setSearchValue("");
                      setIsShowSearchSession(false);
                      if (selectedSessionItem?.id)
                        setSessionItem(selectedSessionItem);
                      else {
                        setSessionItem(messageList[0]);
                      }
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    onClick={searchSessionFn}
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <SearchRoundedIcon />
                  </IconButton>
                </>
              }
              placeholder="搜索会话"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) searchSessionFn();
              }}
            />
          </Box>

          <List
            sx={{
              width: "100%",
              height: "calc(100vh - 320px)",
              py: 0,
              "--ListItem-paddingY": "0.75rem",
              "--ListItem-paddingX": "1rem",
              overflowY: "auto",
            }}
          >
            {isShowSearchSession
              ? searchSession.map((item) => (
                  <MessageListItem
                    key={item.id}
                    sessionItem={item}
                    setTableData={setTableData}
                    setSessionItem={setSessionItem}
                    deleteMessageList={deleteMessageList}
                    isSelected={item.id === selectedSessionItem?.id}
                    setSelectedSessionItem={setSelectedSessionItem}
                  />
                ))
              : messageList.map((item) => (
                  <MessageListItem
                    key={item.id}
                    sessionItem={item}
                    setTableData={setTableData}
                    setSessionItem={setSessionItem}
                    deleteMessageList={deleteMessageList}
                    isSelected={item.id === selectedSessionItem?.id}
                    setSelectedSessionItem={setSelectedSessionItem}
                  />
                ))}
          </List>
        </Sheet>

        <MessageInput
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
          onSubmit={() => {
            setIsShowLoading(true);
            axios
              .get("/api/v0/ask", {
                params: {
                  question: `${textAreaValue}`,
                  id: "9037e2d8-7bde-40b2-bade-eebf38d7e496",
                  orgid: 1,
                  projectid: 1,
                  modelrange: JSON.stringify(["contract", "sales", "metal"]),
                },
                headers: {
                  "ngrok-skip-browser-warning": "true",
                },
              })
              .then((response: any) => {
                let newSessionItem = {
                  id: response.data.id,
                  textAreaValue: textAreaValue,
                  sql: response.data.text,
                  index: messageList.length,
                  searchTime: getNowDate(),
                  selectedModel: selectedModelData.length
                    ? JSON.stringify(selectedModelData)
                    : "",
                };
                let newMessage = [newSessionItem, ...messageList];
                let index = newMessage?.length - 1;
                if (tableList.length < newMessage.length) {
                  index = newMessage.length % 2 === 0 ? 1 : 0;
                }
                setSessionItem(newSessionItem);
                setTableData(tableList[index]);
                setMessageList(newMessage);
                setTextAreaValue("");
                setIsShowLoading(false);
                setSelectedSessionItem({});
              })
              .catch((err: any) => {
                setIsShowLoading(false);
                setTextAreaValue("");
              });
            setTimeout(() => {
              let newSessionItem = {
                id: Date.now(),
                textAreaValue: textAreaValue,
                sql: "SELECT * FROM sales_data WHERE date >= '2022-01-01' AND date <= '2023-12-31' AND department = '大客户部';",
                index: messageList.length,
                searchTime: getNowDate(),
                selectedModel: selectedModelData.length
                  ? JSON.stringify(selectedModelData)
                  : "",
              };
              let newMessage = [newSessionItem, ...messageList];
              let index = newMessage?.length - 1;
              if (tableList.length < newMessage.length) {
                index = newMessage.length % 2 === 0 ? 1 : 0;
              }
              setSessionItem(newSessionItem);
              setTableData(tableList[index]);
              setMessageList(newMessage);
              setTextAreaValue("");
              setIsShowLoading(false);
              setSelectedSessionItem({});
            }, 200);
          }}
          chooseModel={setIsopen}
          selectedModelData={selectedModelData}
          setSelectedModelData={setSelectedModelData}
          isShow={isShowLoading}
        />
      </Sheet>
      {/* 选择模型 */}
      <Sidebar
        isOpen={isOpen}
        setSelectedModelData={setSelectedModelData}
        chooseModel={setIsopen}
      ></Sidebar>
      {/* 加载效果 */}
      <Loading isShow={isShowLoading} />
    </Sheet>
  );
}
