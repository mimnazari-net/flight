"use client";
import * as React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { FaBriefcase } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import { MdFlight } from "react-icons/md";
import { IoMdUmbrella } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { FaSimCard } from "react-icons/fa6";
import { RiExchangeBoxFill } from "react-icons/ri";
import Dropdown from "./components/dropdown";
import Airport from "./components/airport";
import Passenger from "./components/passenger";
import CalendarPicker from "./components/calendar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

export default function Home() {
  const [tripType, setTripType] = React.useState<string>("one way");
  const [flightClass, setFlightClass] = React.useState<string>("economy");
  const select = useSelector((state: RootState) => state.flightSlice);

  const windowWidth = window.innerWidth;

  return (
    <div className={styles.main}>
      <div className={styles.bgImage}>
        <Image
          alt="fight picture"
          width={windowWidth >= 600 ? 1440 : 380}
          height={windowWidth >= 600 ? 491 : 500}
          src={"/images/flight.webp"}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.content_titel}>
          <h1>Iran</h1>
          <h4>Endlessly Welcoming</h4>
          <div className={styles.box}>
            <div className={styles.box_tabs}>
              <div className={styles.box_tabs_items}>
                <div className={styles.box_tabs_item}>
                  <FaBriefcase className={styles.box_tabs_icon} />
                  <span>Tours</span>
                </div>
                <div className={styles.box_tabs_item}>
                  <FaHotel className={styles.box_tabs_icon} />
                  <span>Hotel</span>
                </div>
                <div className={styles.box_tabs_item}>
                  <MdFlight
                    className={styles.box_tabs_icon}
                    style={{ fontSize: windowWidth >= 600 ? "20px" : "25px" }}
                  />
                  <span>Flight</span>
                </div>
                <div className={styles.box_tabs_item}>
                  <IoMdUmbrella
                    className={styles.box_tabs_icon}
                    style={{ fontSize: windowWidth >= 600 ? "20px" : "25px" }}
                  />
                  <span>Insurance</span>
                </div>
                <div className={styles.box_tabs_item}>
                  <FaCreditCard className={styles.box_tabs_icon} />
                  <span>Debit Card</span>
                </div>
                <div className={styles.box_tabs_item}>
                  <TbWorld
                    className={styles.box_tabs_icon}
                    style={{ fontSize: windowWidth >= 600 ? "20px" : "25px"  }}
                  />
                  <span>Iran Visa</span>
                </div>
                <div className={styles.box_tabs_item}>
                  <FaSimCard className={styles.box_tabs_icon} />
                  <span>SIM Card</span>
                </div>
                <div className={styles.box_tabs_item}>
                  <RiExchangeBoxFill
                    className={styles.box_tabs_icon}
                    style={{ rotate: "90deg", fontSize: windowWidth >= 600 ? "20px" : "25px"  }}
                  />
                  <span>Pick-Up</span>
                </div>
              </div>
            </div>
            <div className={styles.box_contents}>
              <div className={styles.box_content_inputs}>
                <div className={styles.box_content_up}>
                  <Dropdown
                    label="trip type"
                    title={tripType}
                    items={["one way", "return"]}
                    state={tripType}
                    setState={setTripType}
                  />

                  <Dropdown
                    label="flight class"
                    title={flightClass}
                    items={["economy", "business", "first class"]}
                    state={flightClass}
                    setState={setFlightClass}
                  />
                </div>
                <div className={styles.box_content_middle}>
                  <Airport />
                  <div style={{ width: "49%", height: 45 }}>
                    <CalendarPicker />
                  </div>
                </div>
                <div className={styles.box_content_down}>
                  <Passenger />
                  <button
                    className={styles.box_content_down_button}
                    style={{
                      backgroundColor: select.filledInfo ? "#009688" : "#0000001f",
                      color: select.filledInfo ? "white" : "#00000042",
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
