import { useSelector, useDispatch } from "react-redux";
import { setUnit } from "../store/settingsSlice";

export default function UnitToggle() {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.settings.unit);

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        background: "#eee",
        padding: "5px",
        borderRadius: "8px",
        width: "fit-content",
      }}
    >
      <button
        onClick={() => dispatch(setUnit("C"))}
        style={{
          padding: "8px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          background: unit === "C" ? "#333" : "#fff",
          color: unit === "C" ? "#fff" : "#000",
          fontWeight: "bold",
        }}
      >
        °C
      </button>

      <button
        onClick={() => dispatch(setUnit("F"))}
        style={{
          padding: "8px 12px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          background: unit === "F" ? "#333" : "#fff",
          color: unit === "F" ? "#fff" : "#000",
          fontWeight: "bold",
        }}
      >
        °F
      </button>
    </div>
  );
}