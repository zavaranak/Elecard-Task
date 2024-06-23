import { configureStore } from "@reduxjs/toolkit"
import cardSlice from "../slices/cardSlice"

export default configureStore(
    {reducer:{
        cards:cardSlice
    }
}
)