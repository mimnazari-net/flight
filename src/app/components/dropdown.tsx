"use client";
import { useState, useEffect, useRef } from "react";
import "../styles/dropdown.css";
import { FaChevronDown } from "react-icons/fa";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

interface dropdown {
  label: string;
  title: string;
  items: string[];
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function Dropdown({
  label,
  title,
  items,
  state,
  setState,
}: dropdown) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const dropdownRef: React.LegacyRef<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (dropdownRef.current) {
        if (!dropdownRef.current.contains(event.target as Node)) {
          setIsActive(false);
        }
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("click", close);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("click", close);
      }
    };
  }, []);

  return (
    <div className="dropdown_detail_container ">
      <div
        className="dropdown_detail_label"
        style={{
          color: isActive ? "#009688" : "",
        }}
      >
        {label}
      </div>
      <div
        ref={dropdownRef}
        className="dropdown_detail_title"
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
        style={{ border: isActive ? "2px solid #009688" : "" }}
      >
        <p>{state === "" ? title : state}</p>
        <FaChevronDown className="dropdown_detail_icon" />
        {isActive && (
          <div className="dropdown_dropdown_container">
            {items.map((item, index) => (
              <div
                key={index}
                className="dropdown_dropdown_items"
                style={{
                  backgroundColor: item === state ? "rgb(202, 236, 247)" : "",
                }}
                onClick={() => {
                  setState(item);
                }}
              >
                <label>
                  <input
                    type="radio"
                    className="dropdown_dropdown_items_radio"
                    value={item}
                    checked={item === state ? true : false}
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
