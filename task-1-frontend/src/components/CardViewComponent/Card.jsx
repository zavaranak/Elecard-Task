import { useDispatch } from "react-redux"
import { deleteCard } from "../../slices/cardSlice"

const Card = ({cardInfo}) =>{
    const dispatch = useDispatch()
    const {url,name} = cardInfo
    return (
        <div>
            <img src={url} alt={url} style={{width:'400px', height:'300px', objectFit:'cover'}}  />
            <p>{name}</p>
            <button onClick={()=>dispatch(deleteCard(name))}>Delete</button>
        </div>
    )
}

export default Card