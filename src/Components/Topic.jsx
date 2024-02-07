import React, { useState } from "react";
import { Link } from "react-router-dom";

function Topic({ onTopicSelect }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleTopic = (topic) => {
    setOpen(false);
    onTopicSelect(topic);
  };

  return (
    <div>
      <button onClick={handleOpen}>Browse Articles By Topic</button>
      {open && (
        <ul className="menu">
          <li className="menu-item">
            <Link to="/articles" onClick={() => handleTopic(null)}>
              All Articles
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to={`/articles/topic/football`}
              onClick={() => handleTopic("football")}
            >
              Football
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to={`/articles/topic/cooking`}
              onClick={() => handleTopic("cooking")}
            >
              Cooking
            </Link>
          </li>
          <li className="menu-item">
            <Link
              to={`/articles/topic/coding`}
              onClick={() => handleTopic("coding")}
            >
              Coding
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Topic;
