// src/data/tags.js
import {
  FaLaptopCode,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaJsSquare,
  FaBook,
  FaUniversity,
  FaFlask,
  FaCalculator,
  FaPaintBrush,
  FaFigma,
  FaPalette,
  FaLaughBeam,
  FaSmile,
  FaRandom,
  FaUserFriends,
} from "react-icons/fa";

const categorizedTags = [
  {
    label: "Technology",
    labelIcon: FaLaptopCode,
    tags: [
      { name: "React", icon: FaReact },
      { name: "Node.js", icon: FaNodeJs },
      { name: "MongoDB", icon: FaDatabase },
      { name: "Next.js", icon: FaLaptopCode },
      { name: "JavaScript", icon: FaJsSquare },
    ],
  },
  {
    label: "Education",
    labelIcon: FaBook,
    tags: [
      { name: "StudyTips", icon: FaBook },
      { name: "BUET", icon: FaUniversity },
      { name: "Physics", icon: FaFlask },
      { name: "Chemistry", icon: FaFlask },
      { name: "Math", icon: FaCalculator },
    ],
  },
  {
    label: "Creativity",
    labelIcon: FaPaintBrush,
    tags: [
      { name: "UIUX", icon: FaPaintBrush },
      { name: "Design", icon: FaFigma },
      { name: "Art", icon: FaPalette },
      { name: "Figma", icon: FaFigma },
      { name: "ColorTheory", icon: FaPalette },
    ],
  },
  {
    label: "Fun",
    labelIcon: FaLaughBeam,
    tags: [
      { name: "Memes", icon: FaLaughBeam },
      { name: "Jokes", icon: FaSmile },
      { name: "DailyLife", icon: FaUserFriends },
      { name: "RandomThoughts", icon: FaRandom },
      { name: "Lifestyle", icon: FaUserFriends },
    ],
  },
];

export default categorizedTags;
