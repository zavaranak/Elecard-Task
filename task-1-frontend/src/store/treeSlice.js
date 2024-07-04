import { createSelector, createSlice } from "@reduxjs/toolkit";
export const fetchTreeItemAction = (data) => (dispatch) => {
  dispatch(fetchItems(data));
  dispatch(setNestedBranches());
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
    nestedBy: "category",
    nestedBranches: [],
    items: [],
  },
  reducers: {
    fetchItems: (state, action) => {
      state.items = action.payload.slice(0);
    },
    setNestedBranches: (state) => {
      state.nestedBranches = nestItems(state.items);
    },
  },
});

export const { fetchItems, setNestedBranches } = treeSlice.actions;

const selectTreeState = (state) => state.treeItems;

export const selectNestedBranches = createSelector(
  [selectTreeState],
  (treeState) => treeState.nestedBranches
);

const selectItems = createSelector(
  [selectTreeState],
  (treeState) => treeState.items
);

export const selectBranchItemsByBranchName = (branchName) =>
  createSelector([selectItems], (items) =>
    items.filter((item) => item.category === branchName)
  );

export default treeSlice.reducer;
