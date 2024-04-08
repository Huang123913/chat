import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";

import { BrotherComContextProvider } from "./components/BrotherComContextProvider";
import MessageList from "./components/MessageList";
import Tablelist from "./components/tablelist";

export default function JoyMessagesTemplate() {
  return (
    <BrotherComContextProvider>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: "flex", maxHeight: "100vh", maxWidth: "100%" }}>
          <MessageList />
          <Tablelist />
        </Box>
      </CssVarsProvider>
    </BrotherComContextProvider>
  );
}
