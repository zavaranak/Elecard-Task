import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//Thunk action function
export const fetchTreeItemAction = () => async (dispatch) => {
  axios
    .get("http://contest.elecard.ru/frontend_data/catalog.json")
    .then((response) => response.data)
    .then((data) => {
      dispatch(fetchItems(data));
    })
    .then(() => {
      dispatch(setNestedBranches());
    })
    .catch((error) => {
      console.log("Can not load data from server. Error Code:", error);
    });
};
//Nest items in groups by catergory
const nestItems = (items) => {
  const branches = [];
  items.map((item) => {
    if (!branches.includes(item.category)) branches.push(item.category);
  });
  return branches;
};

const treeSlice = createSlice({
  name: "tree",
  initialState: {
    status: "",
    nestedBy: "category",
    nestedBranches: [],
    items: [],
  },
  reducers: {
    fetchItems: (state, action) => {
      state.status = "good";
      state.items = action.payload.map((item) => ({
        ...item,
        category: item.image.split("/")[0],
        name: item.image.split("/").pop().split(".jpg")[0],
        url: `http://contest.elecard.ru/frontend_data/${item.image}`,
      }));
    },
    setNestedBranches: (state) => {
      state.nestedBranches = nestItems(state.items);
    },
  },
});

export const { fetchItems, setNestedBranches } = treeSlice.actions;

export const selectNestedBranches = (state) => state.treeItems.nestedBranches;
export const selectTreeItems = (state) => state.treeItems.items;
export const selectTreeStatus = (state) => state.treeItems.status;
export const selectBranchItemsByBranchName = (state, branchName) =>
  state.treeItems.items.filter((item) => item.category === branchName);

export default treeSlice.reducer;
