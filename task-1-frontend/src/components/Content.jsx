import { useState } from "react";
import CardView from "./CardView/CardView";
import TreeView from "./TreeView/TreeView";
import { Box } from "@mui/material";

const Content = () => {
  const [view, setView] = useState("cards");

  return (
    <Box className={`app__content`} maxWidth="xl">
      {view === "cards" && <CardView setView={setView} />}
      {view === "tree" && <TreeView setView={setView} />}
    </Box>
  );
};

export default Content;
