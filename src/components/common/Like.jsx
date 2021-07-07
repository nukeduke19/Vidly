import { BsHeart } from "react-icons/bs";
import { BsHeartFill } from "react-icons/bs";

const Like = ({ Icon, color, onClick }) => {
  return <Icon color={color} onClick={onClick} style={{ cursor: "pointer" }} />;
};

export default Like;
