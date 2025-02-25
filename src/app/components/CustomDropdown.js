import { useState } from "react";
import "../../app/styles.css"; // Import the CSS file

const CustomDropdown = ({ options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="custom-dropdown">
      {/* Selected Option */}
      <div
        className="dropdown-selected"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected || "Select Currency"}
        <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="dropdown-list">
        {options.map((option) => (
          <div
            key={option}
            className={`dropdown-item ${selected === option ? "selected" : ""}`}
            onClick={() => {
              setSelected(option);
              setIsOpen(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default CustomDropdown;
