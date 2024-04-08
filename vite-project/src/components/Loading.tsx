import { Box } from "@mui/joy";
import CircularProgress from "@mui/material/CircularProgress";

type LoadingType = {
  isShow: boolean;
};
export default function Loading(props: LoadingType) {
  return (
    <Box
      className="circular_loading"
      sx={{
        display: props.isShow ? "flex" : "none",
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 888,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <CircularProgress sx={{ color: "rgb(25, 118, 210)" }} size={50} />
      </Box>
    </Box>
  );
}
