import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { LuPlaneTakeoff, LuPlaneLanding } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import "../styles/airport.css";
import { useState, useEffect, useRef } from "react";
import { TextField, styled } from "@mui/material";
import React from 'react'
import { useDispatch } from "react-redux";
import { setFill } from "../redux/flightSlice";
import { BsAirplane } from "react-icons/bs";
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#009688",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#E0E3E7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#009688",
    },
  },
});

export default function Airport() {
  const [origin, setOrigin] = useState<string>("");
  const [origin2, setOrigin2] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [destination2, setDestination2] = useState<string>("");
  const [res, setRes] = useState<any>();
  const [dropdownActive, setDropdownActive] = useState<string>("");
  const dispatch = useDispatch();
  function getAirPort (location: string){
    
    fetch(`https://booking-api.visitouriran.com/flight/place/search/?&query=${location}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    })
      .then(response => response.json()) // parses response to JSON
      .then(data => {
        setRes(data)
      })
      .catch(error => {
        console.error(error)
      });
  }
  const airportsName = [
    {
      name: "all airports",
      city: "Tehran",
      country: "Iran",
      Abbreviation: "THR",
    },
    {
      name: "all airports",
      city: "Mashhad",
      country: "Iran",
      Abbreviation: "MHD",
    },
    {
      name: "all airports",
      city: "Shiraz",
      country: "Iran",
      Abbreviation: "SYZ",
    },
    {
      name: "all airports",
      city: "Isfahan",
      country: "Iran",
      Abbreviation: "IFN",
    },
  ];

  const dropdownRef: React.LegacyRef<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (dropdownRef.current) {
        if (!dropdownRef.current.contains(event.target as Node)) {
          setDropdownActive("");
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
 useEffect(() => {
  if (origin !== "" && destination !== "") dispatch(setFill(true));
  else dispatch(setFill(false));
  if(origin){
    if(origin !== origin2){
      getAirPort(origin)
      setOrigin2(origin) 
    }
  }if (destination){
    if(destination !== destination2){
      getAirPort(destination) 
      setDestination2(destination)
    }
  }
 }, [origin,destination])
 
  return (
    <div className="airport_container">
      <div className="airport_container_inputs">
        <div className="airport_origin">
          <div
            ref={dropdownRef}
            className="airport_input_content"
            onClick={() => {
              setDropdownActive("origin");
            }}
          >
            <CssTextField
              id="outlined-input"
              label="origin(city،air port)"
              variant="outlined"
              size="small"
              value={origin}
            />
            <div className="airport_icon">
              <LuPlaneTakeoff />
            </div>
          </div>
        </div>
        <div
          className="airport_swap"
          onClick={() => {
            let tmp = destination;
            setDestination(origin);
            setOrigin(tmp);
          }}
        >
          <MdOutlineSwapHorizontalCircle
            style={{ color: "#009688", fontSize: "30px" , backgroundColor: "white" }}
          />
        </div>
        <div className="airport_destination">
          <div className="airport_input_content">
            <CssTextField
              id="outlined-input"
              label="destination(city،air port)"
              variant="outlined"
              size="small"
              value={destination}
              onClick={(e:any) => {
                e.stopPropagation();
                setDropdownActive("destination");
              }}
            />
            <div className="airport_icon">
              <LuPlaneLanding />
            </div>
          </div>
        </div>
      </div>
      {dropdownActive && (
        <div className="airport_details_container">
          {res? res.map((item:any, index:number) => (
                  item.cities.map((itemCities:any , ind:number)=>(
                    itemCities.airports.map((airport:any , ind2:number)=>(

            <div
              key={index}
              className="airport_details_item"
              onClick={() => {
                dropdownActive === "origin"
                  ? item.resultType !== 'city'?setOrigin(itemCities.cityNames[1].value): setOrigin(airport.airportNames[1].value)
                  : item.resultType !== 'city'?setDestination(itemCities.cityNames[1].value): setDestination(airport.airportNames[1].value);
              }}
            >
              <div className="airport_details_item_up"  >
                <div className="airport_details_item_up_left">
                  {item.resultType === 'city'?<BsAirplane className="airport_details_location_icon"/>:<GrLocation className="airport_details_location_icon" />}
                    <span >{} {item.resultType !== 'city'?`${itemCities.cityNames[1].value} - all airport`:airport.airportNames[1].value} </span>

                </div>
                    <p>{item.resultType !== 'city'?itemCities.cityCode:airport.airportCode}</p>
              </div>
              <div className="airport_details_item_down">{item.countryNames[0].value}</div>
            </div>
                    ))
                  ))
            )):airportsName.map((item, index) => (
            <div
              key={index}
              className="airport_details_item"
              onClick={() => {
                dropdownActive === "origin"
                  ? setOrigin(item.city)
                  : setDestination(item.city);
              }}
            >
              <div className="airport_details_item_up">
                <div className="airport_details_item_up_left">
                  <GrLocation className="airport_details_location_icon" />
                  <span>{item.city} - </span>
                  <p>{item.name}</p>
                </div>
                <div className="airport_details_abbreviation"  > {item.Abbreviation} </div>
              </div>
              <div className="airport_details_item_down">{item.country}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
