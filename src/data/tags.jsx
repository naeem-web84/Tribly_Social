// src/data/tags.js
import { FaLaptopCode, FaBook, FaPaintBrush, FaLaugh } from "react-icons/fa";

const categorizedTags = [
  {
    icon: FaLaptopCode,
    label: "💻 Technology",
    tags: ["React", "Node.js", "MongoDB", "Next.js", "JavaScript"],
  },
  {
    icon: FaBook,
    label: "📚 Education",
    tags: ["StudyTips", "BUET", "Physics", "Chemistry", "Math"],
  },
  {
    icon: FaPaintBrush,
    label: "🎨 Creativity",
    tags: ["UIUX", "Design", "Art", "Figma", "ColorTheory"],
  },
  {
    icon: FaLaugh,
    label: "😄 Fun",
    tags: ["Memes", "Jokes", "DailyLife", "RandomThoughts", "Lifestyle"],
  },
];

export default categorizedTags;
