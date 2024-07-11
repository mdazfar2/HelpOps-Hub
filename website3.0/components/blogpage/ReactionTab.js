import { useState, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as regularHeart,
  faComment as regularComment,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { Context } from "@context/store";

// Define regular icons
const regularIcons = {
  Heart: regularHeart,
  Comment: regularComment,
  Save: regularBookmark,
};

// Define image URLs for solid icons
const solidIcons = {
  Heart: "/icon1.png",
  Comment: "/icon2.png",
  Save: "/icon3.png",
};

const reactions = [
  {
    solidIcon: solidIcons.Heart,
    regularIcon: regularIcons.Heart,
    label: "Heart",
    count: 48,
  },
  {
    solidIcon: solidIcons.Comment,
    regularIcon: regularIcons.Comment,
    label: "Comment",
    count: 2,
  },
  {
    solidIcon: solidIcons.Save,
    regularIcon: regularIcons.Save,
    label: "Save",
    count: 12,
  },
];

const ReactionTab = () => {
  const [hovered, setHovered] = useState(false);
  const iconRef = useRef(null);
  const panelRef = useRef(null);
  const timerRef = useRef(null);
  const {isLogin}=useContext(Context)

  const handleMouseEnterIcon = () => {
    clearTimeout(timerRef.current);
    setHovered(true);
  };

  const handleMouseLeaveIcon = (e) => {
    if (!panelRef.current.contains(e.relatedTarget)) {
      timerRef.current = setTimeout(() => setHovered(false), 1000);
    }
  };

  const handleMouseEnterPanel = () => {
    clearTimeout(timerRef.current);
    setHovered(true);
  };

  const handleMouseLeavePanel = (e) => {
    if (!iconRef.current.contains(e.relatedTarget)) {
      timerRef.current = setTimeout(() => setHovered(false), 1000);
    }
  };

  return (
    <div className="relative flex flex-col items-center space-y-4">
      <div className="space-y-4">
        {reactions.slice(0, 3).map((reaction, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
            onMouseEnter={
              reaction.label === "Heart" ? handleMouseEnterIcon : undefined
            }
            onMouseLeave={
              reaction.label === "Heart" ? handleMouseLeaveIcon : undefined
            }
            ref={reaction.label === "Heart" ? iconRef : null}
          >
            <FontAwesomeIcon
              icon={reaction.regularIcon}
              className="text-gray-900 text-[20px]"
            />
            <span className="my-2 text-sm">{reaction.count}</span>
          </div>
        ))}
      </div>
      {hovered && (
        <div
          className="absolute top-0 left-full flex bg-white shadow-lg rounded-lg p-4 "
          onMouseEnter={handleMouseEnterPanel}
          onMouseLeave={handleMouseLeavePanel}
          ref={panelRef}
        >
          {reactions.map((reaction, index) => (
            <div key={index} className="flex w-14 items-center justify-center space-x-2 mb-2 cursor-pointer">
              <img src={reaction.solidIcon} alt={reaction.label} className="w-10" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionTab;
