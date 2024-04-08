import SveIcon from "@mui/icons-material/Save";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

type MessagesPaneHeaderProps = {
  sessionItem: {};
};

export default function MessagesPaneHeader(props: any) {
  const { sessionItem } = props;
  let selectedModelString = sessionItem?.selectedModel
    ? JSON.parse(sessionItem.selectedModel)
        .map((item: any) => item.text)
        .join(";")
    : "";
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      flex={1}
      sx={{
        mb: 2,
        px: 2,
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Stack alignSelf={"center"}>
        <Typography level="title-md" sx={{ color: "rgb(23, 26, 28)" }}>
          {sessionItem?.textAreaValue}
        </Typography>
        <Typography level="body-sm" sx={{ color: "rgb(85, 94, 104)" }}>
          {selectedModelString}
        </Typography>
        <Typography level="body-sm" sx={{ mt: 0.9, color: "rgb(85, 94, 104)" }}>
          {sessionItem?.sql}
        </Typography>
      </Stack>

      <Stack alignSelf={"center"}>
        <Button
          startDecorator={<SveIcon />}
          size="sm"
          sx={{ minWidth: "73px" }}
        >
          保存
        </Button>
      </Stack>
    </Stack>
  );
}
