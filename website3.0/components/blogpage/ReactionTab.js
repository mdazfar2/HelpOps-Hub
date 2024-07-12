import { useState, useRef, useContext, useEffect } from "react";
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
  Icon1: "/icon1.png",
  Icon2: "/icon2.png",
  Icon3: "/icon3.png",
};

const ReactionTab = ({ commentCount }) => {
  const [hovered, setHovered] = useState(false);
  const [reactions, setReactions] = useState([
    {
      solidIcon: solidIcons.Icon1,
      label: "Icon1",
      count: 0,
    },
    {
      solidIcon: solidIcons.Icon2,
      label: "Icon2",
      count: 0,
    },
    {
      solidIcon: solidIcons.Icon3,
      label: "Icon3",
      count: 0,
    },
  ]);
  const iconRef = useRef(null);
  const panelRef = useRef(null);
  const timerRef = useRef(null);
  const { isLogin } = useContext(Context);
  let { theme } = useContext(Context);

  const panelIcons = [
    {
      regularIcon: regularIcons.Heart,
      label: "Heart",
      count: 48, // This count will be updated with the sum of all reaction counts
    },
    {
      regularIcon: regularIcons.Comment,
      label: "Comment",
      count: commentCount,
    },
    {
      regularIcon: regularIcons.Save,
      label: "Save",
      count: 12,
    },
  ];

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

  const handleReactionClick = (index) => {
    setReactions((prevReactions) => {
      const newReactions = [...prevReactions];
      newReactions[index].count += 1 / 2; // Assuming this is intentional
      return newReactions;
    });
  };

  // Calculate the total count for the heart icon
  const totalReactionsCount = reactions.reduce((sum, reaction) => sum + reaction.count, 0);

  useEffect(() => {
    if (iconRef.current) {
      const iconElement = iconRef.current;

      const handleClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };

      iconElement.addEventListener("click", handleClick);

      return () => {
        iconElement.removeEventListener("click", handleClick);
      };
    }
  }, [iconRef.current]);

  return (
    <div className="relative flex flex-col items-center space-y-4">
      <div className="space-y-4">
        {panelIcons.slice(0, 3).map((panelIcon, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
            onMouseEnter={
              panelIcon.label === "Heart" ? handleMouseEnterIcon : undefined
            }
            onMouseLeave={
              panelIcon.label === "Heart" ? handleMouseLeaveIcon : undefined
            }
            ref={panelIcon.label === "Heart" ? iconRef : null}
          >
            <FontAwesomeIcon
              icon={panelIcon.regularIcon}
              className={`${theme ? "text-gray-900 " : " text-white "} text-[20px]`}
            />
            <span className={`${theme ? "text-gray-900 " : " text-white "} my-2 text-sm`}>
              {panelIcon.label === "Heart" ? totalReactionsCount : panelIcon.count}
            </span>
          </div>
        ))}
      </div>
      {hovered && (
        <div
          className="absolute top-0 left-full flex bg-white shadow-lg rounded-lg p-4"
          onMouseEnter={handleMouseEnterPanel}
          onMouseLeave={handleMouseLeavePanel}
          ref={panelRef}
          style={{ width: "auto", minWidth: "150px" }} // Fixed width to avoid resizing
        >
          {reactions.map((reaction, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-x-2 mb-2 cursor-pointer"
              style={{ width: "auto", minWidth: "50px" }} // Fixed width to avoid resizing
              onClick={() => handleReactionClick(index)}
            >
              <img src={reaction.solidIcon} alt={reaction.label} className="w-10" />
              <span className="text-sm">{reaction.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReactionTab;
