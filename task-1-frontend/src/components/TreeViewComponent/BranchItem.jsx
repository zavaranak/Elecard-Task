import { useEffect, useState, useRef } from "react";
import FullSizeItem from "../FullSizeItem";
//component
const BranchItem = ({ item }) => {
  //State and logic
  const [displayFSI, setDisplayFSI] = useState(false); //FSI = Full Size Image
  const date = new Date(item.timestamp).toLocaleDateString();
  const refFSI = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refFSI.current && !refFSI.current.contains(event.target)) {
        setDisplayFSI(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refFSI]);
  //return JSX
  return (
    <div>
      <img
        src={item.url}
        alt={item.name}
        style={{ height: "50px", width: "100px", objectFit: "cover" }}
        onClick={() => setDisplayFSI(true)}
      />
      <p>Date: {date} </p> <p>Size: {item.filesize}</p>
      <div ref={refFSI}>{displayFSI && <FullSizeItem url={item.url} />}</div>
    </div>
  );
};
//export component
export default BranchItem;
