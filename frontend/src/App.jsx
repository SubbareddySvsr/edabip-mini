import { useEffect, useState } from "react";

const API_URL = "";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

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
        setError("Unable to load dashboard data");
      });
  }, [loggedIn]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    setLoggedIn(true);
  };

  const menuItems = [
    "Dashboard",
    "Billing",
    "STO Management",
    "Transactions",
    "Reports",
    "Users",
    "Settings",
  ];

  if (!loggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          backgroundColor: "#f4f7ff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            background:
              "linear-gradient(135deg, #06245c 0%, #0757d5 60%, #1f78ff 100%)",
            color: "white",
            padding: "70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              margin: "0 0 15px",
              letterSpacing: "1px",
            }}
          >
            EDABIP
          </h1>

          <h2
            style={{
              fontSize: "26px",
              fontWeight: "500",
              maxWidth: "520px",
              lineHeight: "1.4",
            }}
          >
            Enterprise Data Analytics & Business Intelligence Platform
          </h2>

          <p
            style={{
              fontSize: "17px",
              lineHeight: "1.7",
              maxWidth: "500px",
              opacity: 0.9,
              marginTop: "20px",
            }}
          >
            Manage your business data, transactions, billing, analytics and
            operational activities from one centralized platform.
          </p>

          <div
            style={{
              marginTop: "45px",
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: "15px 20px",
                backgroundColor: "rgba(255,255,255,0.12)",
                borderRadius: "10px",
              }}
            >
              Analytics
            </div>

            <div
              style={{
                padding: "15px 20px",
                backgroundColor: "rgba(255,255,255,0.12)",
                borderRadius: "10px",
              }}
            >
              Billing
            </div>

            <div
              style={{
                padding: "15px 20px",
                backgroundColor: "rgba(255,255,255,0.12)",
                borderRadius: "10px",
              }}
            >
              Operations
            </div>
          </div>
        </div>

        <div
          style={{
            width: "460px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              width: "100%",
              maxWidth: "360px",
            }}
          >
            <h1
              style={{
                fontSize: "32px",
                marginBottom: "10px",
              }}
            >
              Welcome Back
            </h1>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "35px",
              }}
            >
              Login to your EDABIP account
            </p>

            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "15px",
              }}
            />

            <label
              style={{
                display: "block",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                marginBottom: "15px",
                fontSize: "15px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                fontSize: "14px",
              }}
            >
              <label>
                <input type="checkbox" /> Remember Me
              </label>

              <span
                style={{
                  color: "#1261e8",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#1261e8",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Login
            </button>

            <p
              style={{
                textAlign: "center",
                marginTop: "25px",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Don't have an account? Contact Admin
            </p>
          </form>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Enterprise Data Analytics and Business Intelligence Platform"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <MetricCard
          title="Total Sales"
          value={dashboard ? `₹${dashboard.total_sales}` : "Loading..."}
          icon="₹"
        />

        <MetricCard
          title="Total Orders"
          value={dashboard ? dashboard.total_orders : "Loading..."}
          icon="🛒"
        />

        <MetricCard
          title="Active Users"
          value={dashboard ? dashboard.active_users : "Loading..."}
          icon="👥"
        />

        <MetricCard
          title="Revenue"
          value="₹1,25,000"
          icon="📈"
        />
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        <Card title="Sales Overview">
          <div
            style={{
              height: "250px",
              display: "flex",
              alignItems: "flex-end",
              gap: "18px",
              padding: "20px",
            }}
          >
            {[45, 65, 50, 80, 62, 90, 72, 100, 82, 110, 95, 125].map(
              (height, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    height: `${height * 1.5}px`,
                    backgroundColor: "#1261e8",
                    borderRadius: "6px 6px 0 0",
                    minWidth: "15px",
                  }}
                />
              )
            )}
          </div>
        </Card>

        <Card title="Order Status">
          <div
            style={{
              padding: "20px",
              lineHeight: "2.3",
            }}
          >
            <StatusRow label="Delivered" value="120" />
            <StatusRow label="Processing" value="70" />
            <StatusRow label="Pending" value="40" />
            <StatusRow label="Cancelled" value="20" />
          </div>
        </Card>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Card title="Recent Activities">
          <Table
            headers={["Activity", "Reference", "Status", "Time"]}
            rows={[
              ["New Order Received", "ORD-001", "Completed", "2 mins ago"],
              ["Invoice Generated", "INV-001", "Completed", "15 mins ago"],
              ["Payment Received", "PAY-001", "Completed", "1 hour ago"],
              ["New User Registered", "USR-001", "Active", "2 hours ago"],
            ]}
          />
        </Card>
      </div>
    </>
  );

  const renderBilling = () => (
    <>
      <PageHeader
        title="Billing"
        subtitle="Manage invoices, payments and billing operations"
        button="Create Invoice"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <MetricCard title="Total Invoices" value="150" icon="📄" />
        <MetricCard title="Paid Invoices" value="₹1,85,000" icon="✓" />
        <MetricCard title="Pending Invoices" value="₹45,000" icon="⏳" />
        <MetricCard title="Overdue Invoices" value="₹15,000" icon="!" />
      </div>

      <Card title="Invoice List">
        <Table
          headers={[
            "Invoice ID",
            "Customer",
            "Date",
            "Amount",
            "Status",
            "Action",
          ]}
          rows={[
            ["INV-2026-00123", "ABC Pvt Ltd", "18 Aug 2026", "₹25,000", "Paid", "View"],
            ["INV-2026-00122", "XYZ Solutions", "17 Aug 2026", "₹40,000", "Pending", "View"],
            ["INV-2026-00121", "Global Corp", "16 Aug 2026", "₹30,000", "Paid", "View"],
            ["INV-2026-00120", "Tech Systems", "15 Aug 2026", "₹20,000", "Overdue", "View"],
            ["INV-2026-00119", "DataWorks", "14 Aug 2026", "₹15,000", "Paid", "View"],
          ]}
        />
      </Card>
    </>
  );

  const renderSTO = () => (
    <>
      <PageHeader
        title="STO Management"
        subtitle="Manage Stock Transfer Orders"
        button="New STO"
      />

      <Card title="STO List">
        <Table
          headers={[
            "STO ID",
            "Customer",
            "Date",
            "Status",
            "Amount",
            "Priority",
            "Action",
          ]}
          rows={[
            ["STO-1001", "ABC Pvt Ltd", "18 Aug 2026", "Active", "₹25,000", "High", "View"],
            ["STO-1000", "XYZ Solutions", "17 Aug 2026", "Completed", "₹40,000", "Medium", "View"],
            ["STO-0999", "Global Corp", "16 Aug 2026", "Active", "₹30,000", "High", "View"],
            ["STO-0998", "Tech Systems", "15 Aug 2026", "Pending", "₹20,000", "Low", "View"],
            ["STO-0997", "DataWorks", "14 Aug 2026", "Completed", "₹15,000", "Medium", "View"],
          ]}
        />
      </Card>
    </>
  );

  const renderTransactions = () => (
    <>
      <PageHeader
        title="Transactions"
        subtitle="View and manage business transactions"
      />

      <Card title="Transaction History">
        <Table
          headers={[
            "Transaction ID",
            "Type",
            "Customer",
            "Amount",
            "Date",
            "Status",
          ]}
          rows={[
            ["TXN-1001", "Sale", "ABC Pvt Ltd", "₹25,000", "18 Aug 2026", "Completed"],
            ["TXN-1002", "Payment", "XYZ Solutions", "₹40,000", "18 Aug 2026", "Completed"],
            ["TXN-1003", "Refund", "Global Corp", "₹10,000", "17 Aug 2026", "Pending"],
            ["TXN-1004", "Sale", "Tech Systems", "₹20,000", "17 Aug 2026", "Completed"],
            ["TXN-1005", "Payment", "DataWorks", "₹15,000", "16 Aug 2026", "Completed"],
          ]}
        />
      </Card>
    </>
  );

  const renderReports = () => (
    <>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Business performance and analytics"
        button="Download Report"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <MetricCard title="Total Revenue" value="₹3,45,000" icon="₹" />
        <MetricCard title="Total Orders" value="850" icon="🛒" />
        <MetricCard title="New Customers" value="45" icon="👤" />
        <MetricCard title="Conversion Rate" value="75.8%" icon="📊" />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <Card title="Revenue Trend">
          <div
            style={{
              height: "280px",
              display: "flex",
              alignItems: "flex-end",
              gap: "20px",
              padding: "25px",
            }}
          >
            {[50, 75, 90, 65, 85, 105, 95].map((height, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: `${height * 1.7}px`,
                  backgroundColor: "#1261e8",
                  borderRadius: "6px 6px 0 0",
                }}
              />
            ))}
          </div>
        </Card>

        <Card title="Top Customers">
          <div style={{ padding: "25px" }}>
            <ProgressRow label="ABC Pvt Ltd" value="40%" width="40%" />
            <ProgressRow label="XYZ Solutions" value="25%" width="25%" />
            <ProgressRow label="Global Corp" value="20%" width="20%" />
            <ProgressRow label="Others" value="15%" width="15%" />
          </div>
        </Card>
      </div>
    </>
  );

  const renderUsers = () => (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage EDABIP users and access"
        button="Add User"
      />

      <Card title="User Management">
        <Table
          headers={["Name", "Email", "Role", "Department", "Status", "Action"]}
          rows={[
            ["Admin User", "admin@example.com", "Administrator", "IT Operations", "Active", "Edit"],
            ["John Smith", "john@example.com", "Manager", "Sales", "Active", "Edit"],
            ["Jane Doe", "jane@example.com", "Analyst", "Analytics", "Active", "Edit"],
            ["Robert Brown", "robert@example.com", "User", "Operations", "Inactive", "Edit"],
          ]}
        />
      </Card>
    </>
  );

  const renderSettings = () => (
    <>
      <PageHeader
        title="Profile & Settings"
        subtitle="Manage your account and application settings"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <Card title="Profile">
          <div style={{ padding: "20px" }}>
            <SettingField label="Full Name" value="Admin User" />
            <SettingField label="Email" value="admin@example.com" />
            <SettingField label="Phone" value="+91 9876543210" />
            <SettingField label="Role" value="Administrator" />
            <SettingField label="Department" value="IT Operations" />
          </div>
        </Card>

        <Card title="Account Summary">
          <div style={{ padding: "20px", lineHeight: "2.5" }}>
            <p>
              <strong>Username:</strong> admin@example.com
            </p>
            <p>
              <strong>Account Type:</strong> Administrator
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span style={{ color: "#16a34a" }}>Active</span>
            </p>
          </div>
        </Card>
      </div>
    </>
  );

  const renderPage = () => {
    switch (activePage) {
      case "Billing":
        return renderBilling();

      case "STO Management":
        return renderSTO();

      case "Transactions":
        return renderTransactions();

      case "Reports":
        return renderReports();

      case "Users":
        return renderUsers();

      case "Settings":
        return renderSettings();

      default:
        return renderDashboard();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
        fontFamily: "Arial, sans-serif",
        display: "flex",
      }}
    >
      <aside
        style={{
          width: "235px",
          minHeight: "100vh",
          backgroundColor: "#071b42",
          color: "white",
          padding: "25px 15px",
          boxSizing: "border-box",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            padding: "5px 15px 30px",
          }}
        >
          ◉ EDABIP
        </div>

        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActivePage(item)}
            style={{
              width: "100%",
              border: "none",
              color: "white",
              textAlign: "left",
              padding: "13px 15px",
              marginBottom: "7px",
              borderRadius: "7px",
              cursor: "pointer",
              backgroundColor:
                activePage === item ? "#1261e8" : "transparent",
              fontSize: "14px",
            }}
          >
            {getIcon(item)} {item}
          </button>
        ))}

        <button
          onClick={() => {
            setLoggedIn(false);
            setPassword("");
          }}
          style={{
            width: "100%",
            border: "none",
            color: "white",
            textAlign: "left",
            padding: "13px 15px",
            marginTop: "15px",
            borderRadius: "7px",
            cursor: "pointer",
            backgroundColor: "transparent",
            fontSize: "14px",
          }}
        >
          ⇥ Logout
        </button>
      </aside>

      <main
        style={{
          marginLeft: "235px",
          width: "calc(100% - 235px)",
          minHeight: "100vh",
        }}
      >
        <header
          style={{
            height: "70px",
            backgroundColor: "white",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
            boxSizing: "border-box",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            {activePage}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <span>🔔</span>

            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "#dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              👤
            </div>

            <div>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>
                Admin User
              </div>

              <div style={{ color: "#6b7280", fontSize: "12px" }}>
                admin@example.com
              </div>
            </div>
          </div>
        </header>

        <section
          style={{
            padding: "30px",
            boxSizing: "border-box",
          }}
        >
          {renderPage()}
        </section>
      </main>
    </div>
  );
}

function PageHeader({ title, subtitle, button }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "30px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#6b7280",
          }}
        >
          {subtitle}
        </p>
      </div>

      {button && (
        <button
          style={{
            border: "none",
            backgroundColor: "#1261e8",
            color: "white",
            padding: "12px 18px",
            borderRadius: "7px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          + {button}
        </button>
      )}
    </div>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            color: "#6b7280",
            fontSize: "13px",
            marginBottom: "8px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "25px",
            fontWeight: "700",
          }}
        >
          {value}
        </div>
      </div>

      <div
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "10px",
          backgroundColor: "#eaf2ff",
          color: "#1261e8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #eef0f4",
          fontWeight: "700",
          fontSize: "17px",
        }}
      >
        {title}
      </div>

      {children}
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                style={{
                  textAlign: "left",
                  padding: "15px 20px",
                  backgroundColor: "#f8fafc",
                  color: "#64748b",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    padding: "15px 20px",
                    borderTop: "1px solid #eef0f4",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cellIndex === row.length - 2 ? (
                    <StatusBadge value={cell} />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ value }) {
  let backgroundColor = "#dcfce7";
  let color = "#15803d";

  if (
    value === "Pending" ||
    value === "Processing" ||
    value === "Medium"
  ) {
    backgroundColor = "#fef3c7";
    color = "#b45309";
  }

  if (value === "Overdue" || value === "Cancelled" || value === "High") {
    backgroundColor = "#fee2e2";
    color = "#b91c1c";
  }

  if (value === "Low") {
    backgroundColor = "#dbeafe";
    color = "#1d4ed8";
  }

  if (value === "Inactive") {
    backgroundColor = "#e5e7eb";
    color = "#4b5563";
  }

  return (
    <span
      style={{
        backgroundColor,
        color,
        padding: "5px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
      }}
    >
      {value}
    </span>
  );
}

function StatusRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #eef0f4",
        padding: "5px 0",
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProgressRow({ label, value, width }) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div
        style={{
          height: "8px",
          backgroundColor: "#e5e7eb",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width,
            height: "100%",
            backgroundColor: "#1261e8",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
}

function SettingField({ label, value }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label
        style={{
          display: "block",
          fontSize: "13px",
          color: "#64748b",
          marginBottom: "7px",
        }}
      >
        {label}
      </label>

      <input
        value={value}
        readOnly
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
          border: "1px solid #d1d5db",
          borderRadius: "7px",
          backgroundColor: "#f8fafc",
        }}
      />
    </div>
  );
}

function getIcon(item) {
  const icons = {
    Dashboard: "⌂",
    Billing: "▣",
    "STO Management": "▤",
    Transactions: "↔",
    Reports: "▥",
    Users: "♙",
    Settings: "⚙",
  };

  return icons[item] || "•";
}

export default App;