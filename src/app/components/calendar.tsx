import React, { useState } from "react";
import "../styles/datepicker.css";
import { ConfigProvider, DatePicker } from "antd";
const { RangePicker } = DatePicker;

export default function CalendarPicker() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const handleDateChange = (dates: any, dateStrings: string[]) => {
    setSelectedDates(dateStrings);
    console.log(`Selected Date Range: ${dateStrings[0]} to ${dateStrings[1]}`);
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              activeBorderColor: "#009688",
              cellHeight: 20,
              cellWidth: 30,
              colorPrimary: "#009688",
              controlItemBgActive: "#E5E5E5",
              cellActiveWithRangeBg: "#E5E5E5",
            },
          },
        }}
      >
        <RangePicker
          style={{ width: "100%", height: "45px" }}
          renderExtraFooter={() => (
            <div
              style={{
                width: "100%",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div>departure: {selectedDates[0]}</div>
              <div>return: {selectedDates[1]}</div>
              <button
                style={{
                  background: "#009688",
                  border: "none",
                  height: 38,
                  paddingInline: 10,
                  cursor: "pointer",
                  borderRadius: 8,
                }}
              >
                confirm date
              </button>
            </div>
          )}
          placement="bottomRight"
          onChange={handleDateChange}
        />
      </ConfigProvider>
    </div>
  );
}
