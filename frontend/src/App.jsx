import { useEffect, useState } from "react";

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://65.0.173.174:8000/api/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        return response.json();
      })
      .then((data) => {
        setDashboard(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1>EDABIP Dashboard</h1>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>EDABIP Dashboard</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>EDABIP Dashboard</h1>

      <pre>
        {JSON.stringify(dashboard, null, 2)}
      </pre>
    </div>
  );
}

export default App;