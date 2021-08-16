import React, { useState, useEffect } from "react";
import "./autoComplete.css";

const AutoComplete = ({
  options,
  placeholder,
  emptyOptionsMsg = "no data found",
  onChange,
  fallBack,
  disabled,
  watchValue,
}) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // if this AutoComplete is dependant on a value (watchValue)
    // then we have to make sure that this component value is clear
    setValue("");
  }, [watchValue]);

  const hanldeTextChange = (e) => {
    setOpen(true);
    setValue(e.target.value);
  };

  const handleLoseFocus = (e) => {
    setOpen(false);
  };

  const handleListClick = (value) => {
    onChange(value);
    setValue(value);
  };

  const renderList = () => {
    const filterOptions = options.filter((option) =>
      option.toLowerCase().includes(value)
    );
    if (filterOptions.length === 0)
      return <li onMouseDown={() => handleListClick("")}>{emptyOptionsMsg}</li>;
    else
      return filterOptions.map((option) => (
        <li key={option} onMouseDown={() => handleListClick(option)}>
          {option}
        </li>
      ));
  };

  return (
    <div className="autocomplete">
      <input
        disabled={disabled}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={hanldeTextChange}
        onFocus={() => setOpen(true)}
        onBlur={handleLoseFocus}
      />
      {open && (
        <div className="autocomplete__list">
          <ul>{renderList()}</ul>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
