import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <div
        style={{
          position: "relative",
          textAlign: "center",
          width: "200px",
          height: "200px",
          margin: "auto",
        }}
      >
        <h2
          style={{
            color: "red",
            backgroundColor: "#eeeeee33",
            padding: "3px",
            margin: "48% 0 0 0",
          }}
        >
          404 Not Found
        </h2>
        <Link to="/Home">
          <button className="homeBtn">Back To Home Page</button>
        </Link>
      </div>
    </>
  );
}
