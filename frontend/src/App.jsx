import { useEffect, useState } from "react";

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        return response.json();
      })
      .then((data) => {
        setDashboard(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>EDABIP Dashboard</h1>

      {error && <p>{error}</p>}

      {!dashboard && !error && <p>Loading dashboard...</p>}

      {dashboard && (
        <div>
          <h2>Dashboard Metrics</h2>

          <p>Total Sales: {dashboard.total_sales}</p>
          <p>Total Orders: {dashboard.total_orders}</p>
          <p>Active Users: {dashboard.active_users}</p>
        </div>
      )}
    </div>
  );
}

export default App;