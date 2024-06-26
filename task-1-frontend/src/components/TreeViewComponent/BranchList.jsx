import { useSelector } from "react-redux"
import { selectBranchItemsByBranchName } from "../../slices/treeSlice"
import BranchItem from "./BranchItem"
import { Box } from "@mui/material"
//component
const BranchList = ({branchName}) => {
    //logic
    const items = useSelector((state)=>selectBranchItemsByBranchName(state,branchName))
    //return JSX
    return <Box className='branchList'>
        {items.map((item,index) => <BranchItem key={index} item ={item} />)}
    </Box>
}
//export component
export default BranchList