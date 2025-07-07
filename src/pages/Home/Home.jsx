import React from "react";

const Home = () => {
  return (
    <section
      style={{
        backgroundColor: "var(--main-background)",
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
      className="font-urbanist"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="rounded-2xl p-8 shadow-lg"
          style={{ backgroundColor: "var(--color-background)", color: "var(--color-text)" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Tribly</h1>
          <p className="text-lg mb-6">
            This is your home base. Built with care, designed to adapt. Theme-aware and fully responsive.
          </p>
          <button
            className="px-6 py-2 rounded-md font-medium"
            style={{
              backgroundColor: "var(--color-button)",
              color: "var(--color-background)",
            }}
          >
            Explore Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
