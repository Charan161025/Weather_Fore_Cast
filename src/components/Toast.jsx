export default function Toast({ message }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#333",
        color: "#fff",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        fontSize: "14px",
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
}