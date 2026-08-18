import { useEffect, useState } from "react";

const API_URL = "";

const API_ENDPOINTS = {
  login: "/api/auth/login",
  dashboard: "/api/dashboard",
  billing: "/api/billing",
  stos: "/api/stos",
  transactions: "/api/transactions",
  reports: "/api/reports",
  users: "/api/users",
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [dashboard, setDashboard] = useState(null);
  const [billing, setBilling] = useState(null);
  const [stos, setStos] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [reports, setReports] = useState(null);
  const [users, setUsers] = useState(null);

  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [pageError, setPageError] = useState("");
  const [loading, setLoading] = useState(false);

  const menuItems = [
    "Dashboard",
    "Billing",
    "STO Management",
    "Transactions",
    "Reports",
    "Users",
    "Settings",
  ];

  useEffect(() => {
    if (!loggedIn) return;
    loadPageData(activePage);
  }, [loggedIn, activePage]);

  const fetchJson = async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  };

  const loadPageData = async (page) => {
    if (page === "Settings") return;

    setLoading(true);
    setPageError("");

    try {
      switch (page) {
        case "Dashboard":
          setDashboard(await fetchJson(API_ENDPOINTS.dashboard));
          break;
        case "Billing":
          setBilling(await fetchJson(API_ENDPOINTS.billing));
          break;
        case "STO Management":
          setStos(await fetchJson(API_ENDPOINTS.stos));
          break;
        case "Transactions":
          setTransactions(await fetchJson(API_ENDPOINTS.transactions));
          break;
        case "Reports":
          setReports(await fetchJson(API_ENDPOINTS.reports));
          break;
        case "Users":
          setUsers(await fetchJson(API_ENDPOINTS.users));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`${page} API Error:`, error);
      setPageError(`Unable to load ${page.toLowerCase()} data.`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError("");

    if (!email || !password) {
      setLoginError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Invalid email or password.");
      }

      setLoggedIn(true);
      setActivePage("Dashboard");
      setPassword("");
    } catch (error) {
      console.error("Login API Error:", error);
      setLoginError(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setPassword("");
    setActivePage("Dashboard");
    setLoginError("");
  };

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
          <h1 style={{ fontSize: "52px", margin: "0 0 15px" }}>EDABIP</h1>

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
            {["Analytics", "Billing", "Operations"].map((item) => (
              <div
                key={item}
                style={{
                  padding: "15px 20px",
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderRadius: "10px",
                }}
              >
                {item}
              </div>
            ))}
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
            style={{ width: "100%", maxWidth: "360px" }}
          >
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
              Welcome Back
            </h1>

            <p style={{ color: "#6b7280", marginBottom: "35px" }}>
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

            {loginError && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#b91c1c",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  fontSize: "14px",
                }}
              >
                {loginError}
              </div>
            )}

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

              <span style={{ color: "#1261e8", cursor: "pointer" }}>
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#1261e8",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing in..." : "Login"}
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

      {loading && <LoadingMessage />}
      {pageError && <ErrorMessage message={pageError} />}

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
        <MetricCard title="Revenue" value="₹1,25,000" icon="📈" />
      </div>

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
          <div style={{ padding: "20px", lineHeight: "2.3" }}>
            <StatusRow label="Delivered" value="120" />
            <StatusRow label="Processing" value="70" />
            <StatusRow label="Pending" value="40" />
            <StatusRow label="Cancelled" value="20" />
          </div>
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

      {loading && <LoadingMessage />}
      {pageError && <ErrorMessage message={pageError} />}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <MetricCard
          title="Total Billed"
          value={billing ? `₹${billing.total_billed}` : "Loading..."}
          icon="₹"
        />
        <MetricCard
          title="Paid Amount"
          value={billing ? `₹${billing.paid_amount}` : "Loading..."}
          icon="✓"
        />
        <MetricCard
          title="Pending Amount"
          value={billing ? `₹${billing.pending_amount}` : "Loading..."}
          icon="⏳"
        />
        <MetricCard
          title="Invoices"
          value={billing ? billing.invoices.length : "Loading..."}
          icon="📄"
        />
      </div>

      <Card title="Invoice List">
        {billing ? (
          <Table
            headers={["Invoice ID", "Customer", "Amount", "Status"]}
            rows={billing.invoices.map((invoice) => [
              invoice.invoice_id,
              invoice.customer,
              `₹${invoice.amount}`,
              invoice.status,
            ])}
          />
        ) : (
          <EmptyMessage message="Loading billing data..." />
        )}
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

      {loading && <LoadingMessage />}
      {pageError && <ErrorMessage message={pageError} />}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <MetricCard
          title="Total STOs"
          value={stos ? stos.total_stos : "Loading..."}
          icon="📦"
        />
        <MetricCard
          title="Active STOs"
          value={stos ? stos.active_stos : "Loading..."}
          icon="↗"
        />
        <MetricCard
          title="Completed STOs"
          value={stos ? stos.completed_stos : "Loading..."}
          icon="✓"
        />
      </div>

      <Card title="STO List">
        {stos ? (
          <Table
            headers={[
              "STO ID",
              "Source",
              "Destination",
              "Quantity",
              "Status",
            ]}
            rows={stos.stos.map((sto) => [
              sto.sto_id,
              sto.source,
              sto.destination,
              sto.quantity,
              sto.status,
            ])}
          />
        ) : (
          <EmptyMessage message="Loading STO data..." />
        )}
      </Card>
    </>
  );

  const renderTransactions = () => (
    <>
      <PageHeader
        title="Transactions"
        subtitle="View and manage business transactions"
      />

      {loading && <LoadingMessage />}
      {pageError && <ErrorMessage message={pageError} />}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <MetricCard
          title="Total Transactions"
          value={transactions ? transactions.total_transactions : "Loading..."}
          icon="↔"
        />
        <MetricCard
          title="Successful"
          value={
            transactions ? transactions.successful_transactions : "Loading..."
          }
          icon="✓"
        />
        <MetricCard
          title="Failed"
          value={transactions ? transactions.failed_transactions : "Loading..."}
          icon="!"
        />
        <MetricCard
          title="Transaction Value"
          value={
            transactions
              ? `₹${transactions.total_transaction_value}`
              : "Loading..."
          }
          icon="₹"
        />
      </div>

      <Card title="Transaction History">
        {transactions ? (
          <Table
            headers={[
              "Transaction ID",
              "Type",
              "Customer",
              "Amount",
              "Status",
            ]}
            rows={transactions.transactions.map((transaction) => [
              transaction.transaction_id,
              transaction.type,
              transaction.customer,
              `₹${transaction.amount}`,
              transaction.status,
            ])}
          />
        ) : (
          <EmptyMessage message="Loading transaction data..." />
        )}
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

      {loading && <LoadingMessage />}
      {pageError && <ErrorMessage message={pageError} />}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <MetricCard
          title="Total Revenue"
          value={reports ? `₹${reports.sales_report.total_sales}` : "Loading..."}
          icon="₹"
        />
        <MetricCard
          title="Total Orders"
          value={reports ? reports.orders_report.total_orders : "Loading..."}
          icon="🛒"
        />
        <MetricCard
          title="Active Users"
          value={reports ? reports.user_report.active_users : "Loading..."}
          icon="👤"
        />
        <MetricCard
          title="Sales Growth"
          value={reports ? reports.summary.sales_growth : "Loading..."}
          icon="📊"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <Card title="Monthly Sales">
          {reports ? (
            <Table
              headers={["Month", "Sales"]}
              rows={reports.sales_report.monthly_sales.map((item) => [
                item.month,
                `₹${item.sales}`,
              ])}
            />
          ) : (
            <EmptyMessage message="Loading report data..." />
          )}
        </Card>

        <Card title="Order Summary">
          {reports ? (
            <div style={{ padding: "20px", lineHeight: "2.5" }}>
              <StatusRow
                label="Completed"
                value={reports.orders_report.completed_orders}
              />
              <StatusRow
                label="Pending"
                value={reports.orders_report.pending_orders}
              />
              <StatusRow
                label="Cancelled"
                value={reports.orders_report.cancelled_orders}
              />
              <StatusRow
                label="Order Growth"
                value={reports.summary.order_growth}
              />
            </div>
          ) : (
            <EmptyMessage message="Loading report data..." />
          )}
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

      {loading && <LoadingMessage />}
      {pageError && <ErrorMessage message={pageError} />}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <MetricCard
          title="Total Users"
          value={users ? users.total_users : "Loading..."}
          icon="👥"
        />
        <MetricCard
          title="Active Users"
          value={users ? users.active_users : "Loading..."}
          icon="✓"
        />
        <MetricCard
          title="Inactive Users"
          value={users ? users.inactive_users : "Loading..."}
          icon="!"
        />
      </div>

      <Card title="User Management">
        {users ? (
          <Table
            headers={["User ID", "Name", "Email", "Role", "Status"]}
            rows={users.users.map((user) => [
              user.user_id,
              user.name,
              user.email,
              user.role,
              user.status,
            ])}
          />
        ) : (
          <EmptyMessage message="Loading user data..." />
        )}
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
            <SettingField label="Email" value={email} />
            <SettingField label="Role" value="Administrator" />
            <SettingField label="Department" value="IT Operations" />
          </div>
        </Card>

        <Card title="Account Summary">
          <div style={{ padding: "20px", lineHeight: "2.5" }}>
            <p>
              <strong>Username:</strong> {email}
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
          onClick={handleLogout}
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
                {email}
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
        <h1 style={{ margin: 0, fontSize: "30px" }}>{title}</h1>
        <p style={{ marginTop: "8px", color: "#6b7280" }}>{subtitle}</p>
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
        <div style={{ fontSize: "25px", fontWeight: "700" }}>{value}</div>
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
        marginBottom: "20px",
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
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                  {cellIndex === row.length - 1 ? (
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

  if (
    value === "Overdue" ||
    value === "Cancelled" ||
    value === "High" ||
    value === "Failed"
  ) {
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

function LoadingMessage() {
  return (
    <div
      style={{
        backgroundColor: "#eff6ff",
        color: "#1d4ed8",
        padding: "12px 15px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      Loading data...
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <div
      style={{
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        padding: "12px 15px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      {message}
    </div>
  );
}

function EmptyMessage({ message }) {
  return <div style={{ padding: "20px", color: "#6b7280" }}>{message}</div>;
}

function getIcon(item) {
  const icons = {
    Dashboard: "⌂",
    Billing: "▣",
    "STO Management": "◈",
    Transactions: "↔",
    Reports: "▥",
    Users: "♙",
    Settings: "⚙",
  };

  return icons[item] || "•";
}

export default App;