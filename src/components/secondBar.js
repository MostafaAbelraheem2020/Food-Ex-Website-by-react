import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";
function SecondBar() {
  function getcurrentTime() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 8 && hours < 24) {
      return "Open";
    } else {
      return "Close";
    }
  }

  return (
    <div
      className="secondBar"
      style={{
        width: "100%",
        paddingBottom: "20px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: "20%",
        flexDirection: "column",
      }}
    >
      <h1 className="webTitle">Food Ex</h1>
      <span className="time-status">{getcurrentTime()}</span>
      <div
        style={{
          color: "#939393",
          margin: "0 5px 5px 5px",
          display: "flex",
          alignItems: "baseline",
          flexWrap: "wrap",
        }}
      >
        Sandwiches
        <FiberManualRecordIcon style={{ fontSize: "10px", margin: "0 2px" }} />
        Shawerma
        <FiberManualRecordIcon style={{ fontSize: "10px", margin: "0 2px" }} />
        Basta
        <div
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
        >
          {" "}
          <StarRateIcon style={{ color: "#faad1d", fontSize: "15px" }} />
          <StarRateIcon style={{ color: "#faad1d", fontSize: "15px" }} />
          <StarRateIcon style={{ color: "#faad1d", fontSize: "15px" }} />
          <StarRateIcon style={{ color: "#faad1d", fontSize: "15px" }} />
          <StarHalfIcon style={{ color: "#faad1d", fontSize: "15px" }} />
          <span style={{ marginLeft: "5px ", fontSize: "15px" }}>
            {" "}
            4.5 (1449)
          </span>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10% 0 10px",
        }}
      >
        <p
          style={{
            margin: "0",
            color: "# 183.53 68% 19.61%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LocationOnOutlinedIcon
            style={{
              fontSize: "17px",
            }}
          />{" "}
          Badr City, Cairo, Egypt , Badr mall, 1st floor, 2nd branch
        </p>
        <Link to={"/Contact"}>
          <PhoneIcon
            style={{ color: "#c70000", fontWeight: "bold", cursor: "pointer" }}
          />
        </Link>
      </div>
    </div>
  );
}

export default SecondBar;
