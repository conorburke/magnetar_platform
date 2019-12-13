import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Magnetar</h1>
      <h2>The Community Blacksmith.</h2>
      <div className="icon-container icons">
        <a
          href="https://github.com/conorburke/magnetar_platform"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github fa-4x" />
        </a>
      </div>
    </div>
  );
};

export default Home;
