import { useSelector } from "react-redux"
import { selectBranchItemsByBranchName } from "../../slices/treeSlice"
import BranchItem from "./BranchItem"
//component
const BranchList = ({branchName}) => {
    //logic
    const items = useSelector((state)=>selectBranchItemsByBranchName(state,branchName))
    //return JSX
    return <div>
        <b>Branch include {items.length} items</b>
        {items.map((item,index) => <BranchItem key={index} item ={item} />)}
    </div>
}
//export component
export default BranchList