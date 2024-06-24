import { useState } from "react";
import CardView from "./CardViewComponent/CardView";
import TreeView from "./TreeViewComponent/TreeView";

//component
const Content = () => {
  //state and action logic
  const [view, setView] = useState("cards");

  //return jsx
  return (
    <div className="body">
      <fieldset>
        <input
          onChange={() => setView("cards")}
          type="radio"
          id="view1"
          name="view"
          value="cards"
          checked = {view==='cards'}
        />
        <label htmlFor="view1">Cards View</label>
        <input
          onChange={() => setView("tree")}
          type="radio"
          id="view2"
          name="view"
          value="tree"
          checked = {view === 'tree'}
        />
        <label htmlFor="view2">Tree View</label>
      </fieldset>
      {view === "cards" && <CardView />}
      {view === "tree" && <TreeView />}
    </div>
  );
};
//export component
export default Content;
