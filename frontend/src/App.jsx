import { useEffect, useState } from "react";

const API_URL = "";

function App() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/dashboard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend API request failed");
        }

        return response.json();
      })
      .then((data) => {
        setDashboard(data);
        setError("");
      })
      .catch((err) => {
        console.error("Dashboard API Error:", err);
        setError("Failed to fetch");
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
          maxWidth: "1100px",
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

        {error && (
          <div
            style={{
              backgroundColor: "#ffe5e5",
              color: "#c62828",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Error: {error}
          </div>
        )}

        {!dashboard && !error && (
          <p
            style={{
              textAlign: "center",
            }}
          >
            Loading dashboard...
          </p>
        )}

        {dashboard && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "25px",
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
                &#8377;{dashboard.total_sales}
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