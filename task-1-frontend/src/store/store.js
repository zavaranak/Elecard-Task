import { configureStore } from "@reduxjs/toolkit"
import cardSlice from "./cardSlice"
import treeSlice from "./treeSlice"
//store configuration
export default configureStore(
    {reducer:{
        cards:cardSlice,
        treeItems:treeSlice
    }
}
)