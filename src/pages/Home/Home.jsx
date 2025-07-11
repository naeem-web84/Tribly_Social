import React from "react";
import Posts from "../Posts/Posts";
import SearchBanner from "../SearchBanner/SearchBanner";
import TagBoard from "../TagBoard/TagBoard";

const Home = () => {
  return (
    <div>
      <SearchBanner></SearchBanner>
      <TagBoard></TagBoard>
      <Posts></Posts>
    </div>
  );
};

export default Home;
