import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "src/components/Chart/Chart";
import { getDashboardData, updateDashboardData } from "src/services/dashboard";
import _ from "underscore";
import { songListCountLimits } from "src/constants/dashboard";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state?.auth);
  const dashboard = useSelector((state) => state?.dashboard);
  const [enableSave, setEnableSave] = useState(true);
  const { loading, error, dashboardData } = dashboard;
  const [chargeCustomer, setChargeCustomer] = useState(
    dashboardData?.charge_customers
  );
  const { isLoggedIn, authData } = auth;

  const chartDataBuilder = (data) => {
    return {
      custom: data?.category_6 || 0,
      category_7: data?.category_7 || 0,
      category_8: data?.category_8 || 0,
      category_9: data?.category_9 || 0,
      category_10: data?.category_10 || 0,
    };
  };

  const [songCounts, setSongCounts] = useState(
    chartDataBuilder(dashboardData?.amount)
  );

  const updateSongsCount = (value, key = "custom") => {
    setSongCounts({
      ...songCounts,
      [key]: Number(
        value < songListCountLimits?.[key] ? songListCountLimits?.[key] : value
      ),
    });
  };

  const isSongCountChanged = () => {
    return !Object.keys(songCounts).every((key) => {
      console.log(
        key,
        songCounts[key],
        chartDataBuilder(dashboardData?.amount)[key]
      );
      return songCounts[key] === chartDataBuilder(dashboardData?.amount)[key];
    });
  };

  const isSongCountAboveLimit = () => {
    return Object.keys(songCounts).every((key) => {
      return songCounts[key] >= songListCountLimits[key];
    });
  };

  const normalize = (data) => {
    const { custom, ...rest } = data;
    return { ...rest, category_6: data?.custom };
  };

  useEffect(() => {
    setSongCounts(chartDataBuilder(dashboardData?.amount));
    setChargeCustomer(dashboardData?.charge_customers);
  }, [dashboardData]);

  useEffect(() => {
    setEnableSave(isSongCountChanged() && isSongCountAboveLimit());
  }, [dashboardData, songCounts]);

  useEffect(() => {
    if (isLoggedIn) {
      if (!loading && !error && Object.keys(dashboardData)?.length === 0) {
        dispatch(getDashboardData({ id: authData.id }));
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="dashboard  flex flex-column justify-center gap-10 h-100">
      <div className="header">
        <span>{dashboardData.name + ", "}</span>
        <span>{dashboardData.location + " on Dhun Jam"}</span>
      </div>
      <div className="flex flex-row ">
        <span className="dashboard__input__legend">
          Do you want to charge your customers for requesting songs?
        </span>
        <div className="flex flex-row justify-evenly w-50">
          <label className="flex justify-center align-items-center gap-10">
            <input
              type="radio"
              name="charge_users"
              value={"Yes"}
              checked={chargeCustomer}
              onChange={() => {
                setChargeCustomer(true);
              }}
            />
            Yes
          </label>
          <label className="flex justify-center align-items-center gap-10">
            <input
              type="radio"
              name="charge_users"
              value={"No"}
              checked={!chargeCustomer}
              onChange={() => {
                setChargeCustomer(false);
              }}
            />
            No
          </label>
        </div>
      </div>
      <div className="flex flex-row ">
        <span className="dashboard__input__legend">
          Custom song request amount-
        </span>
        <input
          className="custom__song__count w-50"
          type="number"
          value={songCounts?.custom}
          onChange={(e) => {
            updateSongsCount(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-row ">
        <span className="dashboard__input__legend">
          Regular song request amounts, from high to low-
        </span>
        <div className="w-50 flex flex-row justify-evenly">
          <input
            type="number"
            value={songCounts?.category_7}
            onChange={(e) => {
              updateSongsCount(e.target.value, "category_7");
            }}
          />
          <input
            type="number"
            value={songCounts?.category_8}
            onChange={(e) => {
              updateSongsCount(e.target.value, "category_8");
            }}
          />
          <input
            type="number"
            value={songCounts?.category_9}
            onChange={(e) => {
              updateSongsCount(e.target.value, "category_9");
            }}
          />
          <input
            type="number"
            value={songCounts?.category_10}
            onChange={(e) => {
              updateSongsCount(e.target.value, "category_10");
            }}
          />
        </div>
      </div>
      {_.isObject(dashboardData?.amount) && chargeCustomer && (
        <Chart data={songCounts} />
      )}
      <div>
        <button
          onClick={() => {
            dispatch(
              updateDashboardData({
                id: authData?.id,
                changeData: normalize(songCounts),
                dispatch: dispatch,
              })
            );
          }}
          className={`w-100 ${!enableSave || loading ? "background-gray" : ""}`}
          disabled={!enableSave || loading}
        >
          Save Data
        </button>
      </div>
    </div>
  );
}
