import React from "react";
import { Link } from "react-router"; // ✅ Fix: react-router-dom, not "react-router"
import { Users } from "lucide-react";

// The Logo component dynamically adapts to the theme
const Logo = ({
  size = "md",
  color = "var(--color-primary)", // ✅ Use theme-based dynamic color
  hideText = false,
  className = "",
}) => {
  let svgDimensions = { width: "38", height: "42" };
  let textSizeClass = "text-2xl";
  let iconSizeClass = "w-5 h-5";
  let textMarginClass = "-ml-3 mt-2";

  switch (size) {
    case "sm":
      svgDimensions = { width: "24", height: "28" };
      textSizeClass = "text-xl";
      iconSizeClass = "w-4 h-4";
      textMarginClass = "-ml-2 mt-1";
      break;
    case "lg":
      svgDimensions = { width: "50", height: "54" };
      textSizeClass = "text-3xl";
      iconSizeClass = "w-6 h-6";
      textMarginClass = "-ml-4 mt-3";
      break;
    case "md":
    default:
      break;
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label="Go to Tribly homepage"
    >
      {/* Big stylized 'T' using theme color */}
      <svg
        width={svgDimensions.width}
        height={svgDimensions.height}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="logoTitle"
        style={{ fill: color }}
      >
        <title id="logoTitle">Tribly Logo Icon</title>
        <path d="M8 10 H56 V18 H38 V54 H26 V18 H8 Z" />
      </svg>

      {/* Text: "ribly" */}
      {!hideText && (
        <span
          className={`${textSizeClass} ${textMarginClass} font-extrabold tracking-tight font-urbanist`}
          style={{ color: color }}
        >
          ribly
        </span>
      )}

      {/* Icon beside logo */}
      <Users
        className={`${iconSizeClass}`}
        style={{ color: color }}
        aria-hidden="true"
      />
    </Link>
  );
};

export default Logo;
