import { useEffect, useState } from "react";

const API_URL = "http://43.205.212.208:8000";

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/dashboard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request failed");
        }
        return response.json();
      })
      .then((data) => {
        setDashboard(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard API error:", error);
        setError("Failed to fetch");
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          EDABIP Dashboard
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "40px",
          }}
        >
          Enterprise Data Analytics and Business Intelligence Platform
        </p>

        {loading && (
          <div
            style={{
              textAlign: "center",
              fontSize: "20px",
              padding: "40px",
            }}
          >
            Loading dashboard...
          </div>
        )}

        {error && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              fontSize: "20px",
              padding: "40px",
            }}
          >
            Error: {error}
          </div>
        )}

        {dashboard && !loading && !error && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2>Total Sales</h2>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                ₹{dashboard.total_sales.toLocaleString()}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2>Total Orders</h2>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                {dashboard.total_orders}
              </p>
            </div>

            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2>Active Users</h2>
              <p
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                }}
              >
                {dashboard.active_users}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;