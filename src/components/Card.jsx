import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
function Card({ id, name, description, image, setCurrentTrack }) {
  const [isExpanded] = useState(false);
  const navigate = useNavigate();
  const handleCardClick = () => {
    setCurrentTrack({ id, name, description, image });
    navigate(`/details/${id}`, { state: { id, name, description, image } });
  };
  const sanitizedDescription = DOMPurify.sanitize(description);
  const shortDescription =
    sanitizedDescription.length > 100
      ? sanitizedDescription.substring(0, 100) + "..."
      : sanitizedDescription;
  return (
    <div
      className="bg-gray-700 p-4 rounded-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={image}
        alt={name}
        className="h-32 mb-4 w-full object-cover rounded-md"
      />
      <div className="flex flex-col">
        <h4 className="text-lg font-bold truncate">{name}</h4>
        <p className="text-gray-400 truncate">
          <span
            dangerouslySetInnerHTML={{
              __html: isExpanded ? sanitizedDescription : shortDescription,
            }}
          />
        </p>
      </div>
    </div>
  );
}
export default Card;