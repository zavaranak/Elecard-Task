import { useDispatch } from "react-redux";
import { deleteCard } from "../../slices/cardSlice";

const Card = ({ cardInfo, showValue }) => {
  const dispatch = useDispatch();
  const { url, name } = cardInfo;
  let showInfo;
  let value;
  switch (showValue) {
    case "timestamp": {
      showInfo = true;
      value = new Date(cardInfo[showValue]).toLocaleDateString();
      showValue = "Date";
      break;
    }
    case "name": {
      value = cardInfo[showValue];
      showValue = "Name";
      showInfo = true;
      break;
    }
    case "filesize": {
      value = cardInfo[showValue];
      showValue = "Size";
      showInfo = true;
      break;
    }
    case "category": {
      value = cardInfo[showValue];
      showValue = "Category";
      showInfo = true;
      break;
    }
    default: {
      showInfo = false;
    }
  }

  return (
    <div>
      <img
        src={url}
        alt={url}
        style={{ width: "400px", height: "300px", objectFit: "cover" }}
      />
      {showInfo && (
        <p>
          {showValue}:{value}
        </p>
      )}
      <button onClick={() => dispatch(deleteCard(name))}>Delete</button>
    </div>
  );
};

export default Card;
