import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCardAction = () => async (dispatch) => {
  axios
    .get("http://contest.elecard.ru/frontend_data/catalog.json")
    .then((response) => response.data)
    .then((data) => {
      dispatch(fetchCard(data));
    });
};

const handleLocalStorage = (name) =>{
  let temp = localStorage.deletedCards;
  let delCards = temp? JSON.parse(temp):[]
  localStorage.deletedCards = JSON.stringify([...delCards,name])
}

const cardSlice = createSlice({
  name: "cards",
  initialState: { cardsData: [] },
  reducers: {
    fetchCard: (state, action) => {
      const cards = action.payload.map((card) => ({
        ...card,
        category: card.image.split("/")[0],
        name: card.image.split("/").pop().split(".jpg")[0],
        url: `http://contest.elecard.ru/frontend_data/${card.image}`,
      }));
      state.cardsData = cards.filter(card => {
        const temp = localStorage.deletedCards
        if (temp) {
          return !JSON.parse(temp).includes(card.name)
        }
        else return true
      })
    },
    deleteCard: (state, action) => {
      handleLocalStorage(action.payload)
      state.cardsData = state.cardsData.filter(
        (card) => card.name !== action.payload
      );
    },
    removeAllCard: (state) => {
      state.cardsData = [];
    },
    sortCard: (state, action) => {
      state.cardsData = state.cardsData.sort((a, b) =>
        a[action.payload] > b[action.payload]
          ? 1
          : a[action.payload] < b[action.payload]
          ? -1
          : 0
      );
    },
  },
});

export const { fetchCard, deleteCard, removeAllCard, sortCard } =
  cardSlice.actions;

export const selectCardsLength = (state) => state.cards.cardsData.length;

export default cardSlice.reducer;
