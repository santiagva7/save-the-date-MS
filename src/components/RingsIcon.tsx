import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRing } from "@fortawesome/free-solid-svg-icons";

interface RingsIconProps {
  className?: string;
  style?: React.ComponentProps<typeof FontAwesomeIcon>["style"];
}

const RingsIcon = ({ className = "w-12 h-12", style }: RingsIconProps) => {
  return (
    <FontAwesomeIcon
      icon={faRing}
      className={className}
      style={style}
    />
  );
};

export default RingsIcon;
