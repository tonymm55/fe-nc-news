import React, { useState } from "react";

function Topic({ setSelectedTopic }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleTopic = (topic) => {
    setOpen(false);
    setSelectedTopic(topic);
  };

  // This return renders the "Browse Articles By Topic" button in the Articles Component. Home renders the Article component
  return (
    <div>
      <button onClick={handleOpen}>Browse Articles By Topic</button>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button onClick={() => handleTopic(" ")}>All Articles</button>
          </li>
          <li className="menu-item">
            <button onClick={() => handleTopic("football")}>Football</button>
          </li>
          <li className="menu-item">
            <button onClick={() => handleTopic("cooking")}>Cooking</button>
          </li>
          <li className="menu-item">
            <button onClick={() => handleTopic("coding")}>Coding</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}

export default Topic;
