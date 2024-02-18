"use client";
import { useState, useEffect, useRef } from "react";
import "../styles/passenger.css";
import { FaChevronDown } from "react-icons/fa";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Counter from "./counter";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { adult } from "../redux/flightSlice";

export default function Passenger() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const passengerRef: React.LegacyRef<HTMLDivElement> = useRef(null);
  const select = useSelector((state: RootState) => state.flightSlice);

    useEffect(() => {
      const close = (event: MouseEvent) => {
        if (passengerRef.current) {
          if (!passengerRef.current.contains(event.target as Node)) {
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
    <div className="passenger_detail_container ">
      <div
        className="passenger_detail_label"
        style={{
          color: isActive ? "#009688" : "",
        }}
      >
        passengers
      </div>
      <div
        ref={passengerRef}
        className="passenger_detail_title"
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
        style={{ border: isActive ? "2px solid #009688" : "" }}
      >
        <p>
          {select.countAdult + select.countChild + select.countIntat} passengers
        </p>
        <FaChevronDown className="passenger_detail_icon" />
        {isActive && (
          <div className="passenger_passenger_container" onClick={(e)=>{e.stopPropagation()}}>
            <Counter count={select.countAdult} type={"adult"} label="adult" />
            <Counter count={select.countChild} type={"child"} label="child" />
            <Counter count={select.countIntat} type={"infat"} label="infat" />
          </div>
        )}
      </div>
    </div>
  );
}
