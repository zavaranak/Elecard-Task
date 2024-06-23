import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCardAction = () => async(dispatch) => {
  axios
    .get("http://contest.elecard.ru/frontend_data/catalog.json")
    .then((response) => response.data)
    .then((data) => {
        dispatch(fetchCard(data));
    });
};

const cardSlice = createSlice({
  name: "cards",
  initialState: { cardsData: [] },
  reducers: {
    fetchCard: (state, action) => {
      state.cardsData = action.payload.map(card=>(
        {...card,
          category:card.image.split('/')[0],
          name:card.image.split('/').pop().split('.jpg')[0],
          url:`http://contest.elecard.ru/frontend_data/${card.image}`}));
    },
    deleteCard: (state,action) => {
      state.cardsData = state.cardsData.filter((card) => card.name !== action.payload) 
    },
    removeAllCard:(state)=>{
      state.cardsData = []
    },
    sortCard: (state,action) =>{
      switch(action.payload){
        case 'category':
        case 'timestamp':
        case 'name':
        case 'size':
        default: return state
      }
    }
  }
});

export const { fetchCard, deleteCard, removeAllCard } = cardSlice.actions;

export const selectCards = (state) => state.cards.cardsData;

export default cardSlice.reducer;
