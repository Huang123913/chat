import * as React from "react";

import List from "@mui/joy/List";
import Sheet from "@mui/joy/Sheet";

import { ChatProps } from "../types";
import MessageInput from "./MessageInput";
import ChatListItem from "./MessageListItem";

type ChatsPaneProps = {
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
};

export default function ChatsPane(props: ChatsPaneProps) {
  const { chats, setSelectedChat, selectedChatId } = props;
  const [textAreaValue, setTextAreaValue] = React.useState("");
  return (
    <Sheet>
      <Sheet
        sx={{
          height: "calc(100dvh - 165px)",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        <List
          sx={{
            py: 0,
            "--ListItem-paddingY": "0.75rem",
            "--ListItem-paddingX": "1rem",
          }}
        >
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              {...chat}
              setSelectedChat={setSelectedChat}
              selectedChatId={selectedChatId}
            />
          ))}
        </List>
      </Sheet>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={() => {
          // const newId = chatMessages.length + 1;
          // const newIdString = newId.toString();
        }}
      />
    </Sheet>
  );
}
