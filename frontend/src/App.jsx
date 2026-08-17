import { useEffect, useState } from "react";

const API_URL = "http://13.201.39.169:8000";

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/dashboard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Backend returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDashboard(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard API error:", err);
        setError("Failed to fetch");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1>EDABIP Dashboard</h1>

      {loading && <p>Loading dashboard...</p>}

      {error && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Error: {error}
        </p>
      )}

      {dashboard && (
        <div>
          <h2>Dashboard Data</h2>

          <pre
            style={{
              background: "#f4f4f4",
              padding: "20px",
              borderRadius: "8px",
              overflowX: "auto",
            }}
          >
            {JSON.stringify(dashboard, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;