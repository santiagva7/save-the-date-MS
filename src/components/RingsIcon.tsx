import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRingsWedding } from "@fortawesome/free-solid-svg-icons";

interface RingsIconProps {
  className?: string;
  style?: React.CSSProperties;
}

const RingsIcon = ({ className = "w-12 h-12", style }: RingsIconProps) => {
  return (
    <FontAwesomeIcon
      icon={faRingsWedding}
      className={className}
      style={style}
    />
  );
};

export default RingsIcon;
