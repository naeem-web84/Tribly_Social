import React from "react";
import Posts from "../Posts/Posts";
import SearchBanner from "../SearchBanner/SearchBanner";
import TagBoard from "../TagBoard/TagBoard";
import Announcements from "../Announcements/Announcements"; 

const Home = () => {
  return (
    <div>
      

       
      <SearchBanner></SearchBanner>
      <TagBoard></TagBoard>
      <Posts></Posts>
      <Announcements></Announcements>
    </div>
  );
};

export default Home;
