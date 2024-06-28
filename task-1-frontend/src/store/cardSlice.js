//Card View State
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Thunk action function
export const fetchCardAction = () => async (dispatch) => {
  axios
    .get("http://contest.elecard.ru/frontend_data/catalog.json")
    .then((response) => response.data)
    .then((data) => {
      dispatch(fetchCard(data));
    })
    .catch((error) => {
      console.log("Can not load data from server. Error Code:", error);
    });
};
//Local Storage Logic
const handleLocalStorage = (name) => {
  let temp = localStorage.deletedCards;
  let delCards = temp ? JSON.parse(temp) : [];
  localStorage.deletedCards = JSON.stringify([...delCards, name]);
};
//Nest items in groups by catergory
const findCategories = (items) => {
  const branches = [];
  items.map((item) => {
    if (!branches.includes(item.category)) branches.push(item.category);
  });
  return branches;
};
//Compare function
const growingOrder = (a, b) => (a > b ? true : b > a ? false - 1 : 0);
const fallingOrder = (a, b) => (a < b ? true : b < a ? false - 1 : 0);

//Slice
const cardSlice = createSlice({
  name: "cards",
  initialState: {
    status: "",
    cardsData: [],
    tempData: [],
    categories: [],
    sortOrder: 'growing',
  },
  reducers: {
    fetchCard: (state, action) => {
      const cards = action.payload.map((card) => ({
        ...card,
        category: card.image.split("/")[0],
        name: card.image.split("/").pop().split(".jpg")[0],
        url: `http://contest.elecard.ru/frontend_data/${card.image}`,
      }));
      state.status = "good";
      state.cardsData = cards.filter((card) => {
        const temp = localStorage.deletedCards;
        if (temp) {
          return !JSON.parse(temp).includes(card.name);
        } else return true;
      });
      state.tempData = state.cardsData;
      state.categories = findCategories(state.cardsData);
    },
    deleteCard: (state, action) => {
      handleLocalStorage(action.payload);
      state.cardsData = state.cardsData.filter(
        (card) => card.name !== action.payload
      );
      state.tempData = state.tempData.filter(
        (card) => card.name !== action.payload
      );
    },
    removeAllCard: (state) => {
      state.tempData = [];
    },
    sortCard: (state, action) => {
      let compare = (state.sortOrder==='growing')?growingOrder:(state.sortOrder==='falling')?fallingOrder:()=>{}
      if (action.payload === "default") state.tempData = state.cardsData;
      else
        state.tempData = state.tempData.sort((a, b) =>
          compare(a[action.payload], b[action.payload])
        );
    },
    sortOrderCard: (state, action) => {
      state.sortOrder = action.payload
    },
    filterCard: (state, action) => {
      if (action.payload === "default") state.tempData = state.cardsData;
      else
        state.tempData = state.cardsData.filter(
          (card) => card.category === action.payload
        );
    },
  },
});

//Export actions for state updating
export const { fetchCard, deleteCard, removeAllCard, sortCard, filterCard,sortOrderCard } =
  cardSlice.actions;
//Length of data "cards"
export const selectCardsLength = (state) => state.cards.tempData.length;
export const selectStatus = (state) => state.cards.status;
export const selectFilteredCard = (state) => state.cards.filteredData;
export const selectCategories = (state) => state.cards.categories;
export const selectOrder = (state) => state.cards.sortOrder;
//export reducer
export default cardSlice.reducer;