import { configureStore } from "@reduxjs/toolkit"
import cardSlice from "./cardSlice"
import treeSlice from "./treeSlice"

export default configureStore(
    {reducer:{
        cards:cardSlice,
        treeItems:treeSlice
    }
}
)