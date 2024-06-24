import { configureStore } from "@reduxjs/toolkit"
import cardSlice from "../slices/cardSlice"
import treeSlice from "../slices/treeSlice"
//store configuration
export default configureStore(
    {reducer:{
        cards:cardSlice,
        treeItems:treeSlice
    }
}
)