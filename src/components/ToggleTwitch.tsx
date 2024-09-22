import React, { useState } from 'react';

type ToggleSwitchProps = {
  options: string[];
  onOptionChange: (selected: string) => void;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ options, onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onOptionChange(option);
  };

  return (
    <div className="flex bg-gray-200 rounded-full p-1">
      {options.map((option) => (
        <button
          key={option}
          className={`px-4 py-2 rounded-full text-gray-600 font-bold ${
            selectedOption === option ? 'bg-white border border-gray-300 text-gray-900' : ''
          }`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ToggleSwitch;
