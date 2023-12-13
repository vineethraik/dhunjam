import React from "react";
import "./Chart.css";

export default function Chart({ data }) {
  const maxDataValue = Math.max(...Object.keys(data).map((key) => data[key]));
  const dataList = Object.keys(data).map((key) => {
    return {
      key: key,
      value: data[key],
      percentage: Math.floor((data[key] / maxDataValue) * 100),
    };
  });

  return (
    <div className="flex flex-row">
      <span>₹</span>
      <div className="flex flex-row align-items-end chart gap-10  ">
        {dataList.map((data) => {
          return (
            <div className="chart__bar__container flex flex-column justify-end relative align-items-center h-100">
              <div
                key={data?.key}
                className="background-pink padding-10 relative  chart__bar__"
                style={{
                  height: `calc(${data?.percentage}% + 20px)`,
                  width: "20px",
                }}
              ></div>
              <div className=" chart__bar__title">{data?.key}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
