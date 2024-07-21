import { createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;
//Thunk action function
export const fetchCardAction = () => async (dispatch) => {
  axios
    .get(`${apiURL}/catalog.json`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .then((data) => {
      dispatch(fetchCard(data));
    })
    .catch(() => {
      dispatch(setBadStatus());
    });
};

const handleLocalStorage = (name) => {
  let temp = localStorage.deletedCards;
  let delCards = temp ? JSON.parse(temp) : [];
  localStorage.deletedCards = JSON.stringify([...delCards, name]);
};

const findCategories = (items) => {
  const branches = [];
  items.map((item) => {
    if (!branches.includes(item.category)) branches.push(item.category);
  });
  return branches;
};

const growingOrder = (a, b) => (a > b ? true : b > a ? false - 1 : 0);
const fallingOrder = (a, b) => (a < b ? true : b < a ? false - 1 : 0);

const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    status: 'loading',
    cardsData: [],
    tempData: [],
    categories: [],
    sortOrder: 'growing',
  },
  reducers: {
    fetchCard: (state, action) => {
      if (action.payload.length > 0) {
        const cards = action.payload.map((card) => ({
          ...card,
          category: card.image.split('/')[0],
          name: card.image.split('/').pop().split('.jpg')[0],
          url: `${apiURL + '/' + card.image}`,
        }));
        state.status = 'good';
        state.cardsData = cards;
        state.tempData = cards.filter((card) => {
          const temp = localStorage.deletedCards;
          if (temp) {
            return !JSON.parse(temp).includes(card.name);
          } else return true;
        });
        state.categories = findCategories(state.cardsData);
      } else state.status = 'bad';
    },
    deleteCard: (state, action) => {
      handleLocalStorage(action.payload);
      state.tempData = state.tempData.filter(
        (card) => card.name !== action.payload
      );
    },
    removeAllCard: (state) => {
      state.tempData = [];
    },
    sortOrderCard: (state, action) => {
      state.sortOrder = action.payload;
    },
    sortAndFilterCard: (state, action) => {
      let [sortBy, filterBy] = action.payload;
      state.tempData = state.cardsData.filter((card) => {
        const temp = localStorage.deletedCards;
        if (temp) {
          return !JSON.parse(temp).includes(card.name);
        } else return true;
      });

      if (filterBy !== 'default') {
        state.tempData = state.tempData.filter(
          (card) => card.category === filterBy
        );
      }

      if (sortBy !== 'default') {
        let compare =
          state.sortOrder === 'growing'
            ? growingOrder
            : state.sortOrder === 'falling'
            ? fallingOrder
            : () => 0;
        state.tempData = state.tempData.sort((a, b) =>
          compare(a[sortBy], b[sortBy])
        );
      }
    },
    restoreCards: (state) => {
      state.tempData = state.cardsData;
    },
    setBadStatus: (state) => {
      state.status = 'bad';
    },
  },
});

export const {
  fetchCard,
  deleteCard,
  removeAllCard,
  sortOrderCard,
  sortAndFilterCard,
  restoreCards,
  setBadStatus,
} = cardSlice.actions;

const selectCardState = (state) => state.cards;

export const selectCardsInRange = (start, end) =>
  createSelector([selectCardState], (cardState) =>
    cardState.tempData.slice(start, end)
  );

export const selectCardsLength = createSelector(
  [selectCardState],
  (cardState) => cardState.tempData.length
);

export const selectCardsData = createSelector(
  [selectCardState],
  (cardState) => cardState.cardsData
);

export const selectStatus = createSelector(
  [selectCardState],
  (cardState) => cardState.status
);

export const selectCategories = createSelector(
  [selectCardState],
  (cardState) => cardState.categories
);
export const selectOrder = createSelector(
  [selectCardState],
  (cardState) => cardState.sortOrder
);
export default cardSlice.reducer;
