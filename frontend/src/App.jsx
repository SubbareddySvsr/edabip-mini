import { useEffect, useState } from "react";

const API_URL = "http://edabip-alb-97943372.ap-south-1.elb.amazonaws.com";

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
    if (loggedIn) {
      loadPageData(activePage);
    }
  }, [loggedIn, activePage]);

  async function getJson(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`);

    const text = await response.text();

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${text}`
      );
    }

    if (!text) {
      return {};
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new Error("Backend returned invalid JSON.");
    }
  }

  async function loadPageData(page) {
    if (page === "Settings") {
      return;
    }

    setLoading(true);
    setPageError("");

    try {
      if (page === "Dashboard") {
        setDashboard(await getJson("/api/dashboard"));
      }

      if (page === "Billing") {
        setBilling(await getJson("/api/billing"));
      }

      if (page === "STO Management") {
        setStos(await getJson("/api/stos"));
      }

      if (page === "Transactions") {
        setTransactions(await getJson("/api/transactions"));
      }

      if (page === "Reports") {
        setReports(await getJson("/api/reports"));
      }

      if (page === "Users") {
        setUsers(await getJson("/api/users"));
      }
    } catch (error) {
      console.error(error);
      setPageError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();

    setLoginError("");

    if (!email || !password) {
      setLoginError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const text = await response.text();

      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Login API returned invalid JSON.");
        }
      }

      if (!response.ok) {
        let message = "Login failed.";

        if (typeof data.detail === "string") {
          message = data.detail;
        } else if (Array.isArray(data.detail)) {
          message = data.detail
            .map((item) => item.msg)
            .join(", ");
        }

        throw new Error(message);
      }

      if (data.success === false) {
        throw new Error(data.message || "Invalid email or password.");
      }

      console.log("Login successful:", data);

      setLoggedIn(true);
      setActivePage("Dashboard");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    setActivePage("Dashboard");
    setPassword("");
  }

  if (!loggedIn) {
    return (
      <div style={loginPage}>
        <div style={loginLeft}>
          <h1 style={{ fontSize: "52px", margin: "0 0 15px" }}>
            EDABIP
          </h1>

          <h2 style={{ fontSize: "26px", fontWeight: "500" }}>
            Enterprise Data Analytics & Business Intelligence Platform
          </h2>

          <p style={loginDescription}>
            Manage business data, transactions, billing, analytics and
            operational activities from one centralized platform.
          </p>

          <div style={featureContainer}>
            <div style={featureBox}>Analytics</div>
            <div style={featureBox}>Billing</div>
            <div style={featureBox}>Operations</div>
          </div>
        </div>

        <div style={loginRight}>
          <form onSubmit={handleLogin} style={{ width: "100%", maxWidth: "360px" }}>
            <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>
              Welcome Back
            </h1>

            <p style={{ color: "#6b7280", marginBottom: "35px" }}>
              Login to your EDABIP account
            </p>

            <label style={labelStyle}>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={inputStyle}
            />

            <label style={labelStyle}>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={inputStyle}
            />

            {loginError && (
              <div style={errorBox}>
                {loginError}
              </div>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "25px",
                fontSize: "14px",
              }}
            >
              <label>
                <input type="checkbox" /> Remember Me
              </label>

              <span style={{ color: "#1261e8" }}>
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={loginButton}
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <p
              style={{
                textAlign: "center",
                marginTop: "25px",
                color: "#6b7280",
              }}
            >
              Don't have an account? Contact Admin
            </p>
          </form>
        </div>
      </div>
    );
  }

  function renderDashboard() {
    return (
      <>
        <PageHeader
          title="Dashboard"
          subtitle="Enterprise Data Analytics and Business Intelligence Platform"
        />

        {loading && <LoadingMessage />}
        {pageError && <ErrorMessage message={pageError} />}

        <div style={cardGrid}>
          <MetricCard
            title="Total Sales"
            value={
              dashboard
                ? `â‚¹${dashboard.total_sales}`
                : "Loading..."
            }
            icon="â‚¹"
          />

          <MetricCard
            title="Total Orders"
            value={
              dashboard
                ? dashboard.total_orders
                : "Loading..."
            }
            icon="ðŸ›’"
          />

          <MetricCard
            title="Active Users"
            value={
              dashboard
                ? dashboard.active_users
                : "Loading..."
            }
            icon="ðŸ‘¥"
          />

          <MetricCard
            title="Revenue"
            value="â‚¹1,25,000"
            icon="ðŸ“ˆ"
          />
        </div>

        <div style={twoColumnGrid}>
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
                    }}
                  />
                )
              )}
            </div>
          </Card>

          <Card title="Order Status">
            <div style={{ padding: "20px" }}>
              <StatusRow label="Delivered" value="120" />
              <StatusRow label="Processing" value="70" />
              <StatusRow label="Pending" value="40" />
              <StatusRow label="Cancelled" value="20" />
            </div>
          </Card>
        </div>
      </>
    );
  }

  function renderBilling() {
    return (
      <>
        <PageHeader
          title="Billing"
          subtitle="Manage invoices, payments and billing operations"
        />

        {loading && <LoadingMessage />}
        {pageError && <ErrorMessage message={pageError} />}

        <div style={cardGrid}>
          <MetricCard
            title="Total Billed"
            value={
              billing
                ? `â‚¹${billing.total_billed}`
                : "Loading..."
            }
            icon="â‚¹"
          />

          <MetricCard
            title="Paid Amount"
            value={
              billing
                ? `â‚¹${billing.paid_amount}`
                : "Loading..."
            }
            icon="âœ“"
          />

          <MetricCard
            title="Pending Amount"
            value={
              billing
                ? `â‚¹${billing.pending_amount}`
                : "Loading..."
            }
            icon="â³"
          />

          <MetricCard
            title="Invoices"
            value={
              billing
                ? billing.invoices.length
                : "Loading..."
            }
            icon="ðŸ“„"
          />
        </div>

        <Card title="Invoice List">
          {billing ? (
            <Table
              headers={[
                "Invoice ID",
                "Customer",
                "Amount",
                "Status",
              ]}
              rows={billing.invoices.map((invoice) => [
                invoice.invoice_id,
                invoice.customer,
                `â‚¹${invoice.amount}`,
                invoice.status,
              ])}
            />
          ) : (
            <EmptyMessage message="Loading billing data..." />
          )}
        </Card>
      </>
    );
  }

  function renderSTO() {
    return (
      <>
        <PageHeader
          title="STO Management"
          subtitle="Manage Stock Transfer Orders"
        />

        {loading && <LoadingMessage />}
        {pageError && <ErrorMessage message={pageError} />}

        <div style={threeColumnGrid}>
          <MetricCard
            title="Total STOs"
            value={
              stos
                ? stos.total_stos
                : "Loading..."
            }
            icon="ðŸ“¦"
          />

          <MetricCard
            title="Active STOs"
            value={
              stos
                ? stos.active_stos
                : "Loading..."
            }
            icon="â†—"
          />

          <MetricCard
            title="Completed STOs"
            value={
              stos
                ? stos.completed_stos
                : "Loading..."
            }
            icon="âœ“"
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
  }

  function renderTransactions() {
    return (
      <>
        <PageHeader
          title="Transactions"
          subtitle="View and manage business transactions"
        />

        {loading && <LoadingMessage />}
        {pageError && <ErrorMessage message={pageError} />}

        <div style={cardGrid}>
          <MetricCard
            title="Total Transactions"
            value={
              transactions
                ? transactions.total_transactions
                : "Loading..."
            }
            icon="â†”"
          />

          <MetricCard
            title="Successful"
            value={
              transactions
                ? transactions.successful_transactions
                : "Loading..."
            }
            icon="âœ“"
          />

          <MetricCard
            title="Failed"
            value={
              transactions
                ? transactions.failed_transactions
                : "Loading..."
            }
            icon="!"
          />

          <MetricCard
            title="Transaction Value"
            value={
              transactions
                ? `â‚¹${transactions.total_transaction_value}`
                : "Loading..."
            }
            icon="â‚¹"
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
                `â‚¹${transaction.amount}`,
                transaction.status,
              ])}
            />
          ) : (
            <EmptyMessage message="Loading transaction data..." />
          )}
        </Card>
      </>
    );
  }

  function renderReports() {
    return (
      <>
        <PageHeader
          title="Reports & Analytics"
          subtitle="Business performance and analytics"
        />

        {loading && <LoadingMessage />}
        {pageError && <ErrorMessage message={pageError} />}

        <div style={cardGrid}>
          <MetricCard
            title="Total Revenue"
            value={
              reports
                ? `â‚¹${reports.sales_report.total_sales}`
                : "Loading..."
            }
            icon="â‚¹"
          />

          <MetricCard
            title="Total Orders"
            value={
              reports
                ? reports.orders_report.total_orders
                : "Loading..."
            }
            icon="ðŸ›’"
          />

          <MetricCard
            title="Active Users"
            value={
              reports
                ? reports.user_report.active_users
                : "Loading..."
            }
            icon="ðŸ‘¤"
          />

          <MetricCard
            title="Sales Growth"
            value={
              reports
                ? reports.summary.sales_growth
                : "Loading..."
            }
            icon="ðŸ“Š"
          />
        </div>

        <div style={twoColumnGrid}>
          <Card title="Monthly Sales">
            {reports ? (
              <Table
                headers={["Month", "Sales"]}
                rows={reports.sales_report.monthly_sales.map(
                  (item) => [
                    item.month,
                    `â‚¹${item.sales}`,
                  ]
                )}
              />
            ) : (
              <EmptyMessage message="Loading report data..." />
            )}
          </Card>

          <Card title="Order Summary">
            {reports ? (
              <div style={{ padding: "20px" }}>
                <StatusRow
                  label="Completed"
                  value={
                    reports.orders_report.completed_orders
                  }
                />

                <StatusRow
                  label="Pending"
                  value={
                    reports.orders_report.pending_orders
                  }
                />

                <StatusRow
                  label="Cancelled"
                  value={
                    reports.orders_report.cancelled_orders
                  }
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
  }

  function renderUsers() {
    return (
      <>
        <PageHeader
          title="Users"
          subtitle="Manage EDABIP users and access"
        />

        {loading && <LoadingMessage />}
        {pageError && <ErrorMessage message={pageError} />}

        <div style={threeColumnGrid}>
          <MetricCard
            title="Total Users"
            value={
              users
                ? users.total_users
                : "Loading..."
            }
            icon="ðŸ‘¥"
          />

          <MetricCard
            title="Active Users"
            value={
              users
                ? users.active_users
                : "Loading..."
            }
            icon="âœ“"
          />

          <MetricCard
            title="Inactive Users"
            value={
              users
                ? users.inactive_users
                : "Loading..."
            }
            icon="!"
          />
        </div>

        <Card title="User Management">
          {users ? (
            <Table
              headers={[
                "User ID",
                "Name",
                "Email",
                "Role",
                "Status",
              ]}
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
  }

  function renderSettings() {
    return (
      <>
        <PageHeader
          title="Profile & Settings"
          subtitle="Manage your account settings"
        />

        <div style={twoColumnGrid}>
          <Card title="Profile">
            <div style={{ padding: "20px" }}>
              <SettingField
                label="Full Name"
                value="Admin User"
              />

              <SettingField
                label="Email"
                value={email}
              />

              <SettingField
                label="Role"
                value="Administrator"
              />

              <SettingField
                label="Department"
                value="IT Operations"
              />
            </div>
          </Card>

          <Card title="Account Summary">
            <div style={{ padding: "20px" }}>
              <p>
                <strong>Username:</strong> {email}
              </p>

              <p>
                <strong>Account Type:</strong> Administrator
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span style={{ color: "#16a34a" }}>
                  Active
                </span>
              </p>
            </div>
          </Card>
        </div>
      </>
    );
  }

  function renderPage() {
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
  }

  return (
    <div style={appContainer}>
      <aside style={sidebar}>
        <div style={logo}>
          â—‰ EDABIP
        </div>

        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActivePage(item)}
            style={{
              ...menuButton,
              backgroundColor:
                activePage === item
                  ? "#1261e8"
                  : "transparent",
            }}
          >
            {getIcon(item)} {item}
          </button>
        ))}

        <button
          onClick={handleLogout}
          style={logoutButton}
        >
          â‡¥ Logout
        </button>
      </aside>

      <main style={mainContent}>
        <header style={header}>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            {activePage}
          </div>

          <div style={profileArea}>
            <span>ðŸ””</span>

            <div style={profileIcon}>
              ðŸ‘¤
            </div>

            <div>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>
                Admin User
              </div>

              <div
                style={{
                  color: "#6b7280",
                  fontSize: "12px",
                }}
              >
                {email}
              </div>
            </div>
          </div>
        </header>

        <section style={content}>
          {renderPage()}
        </section>
      </main>
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <h1 style={{ margin: 0, fontSize: "30px" }}>
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
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div style={metricCard}>
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

      <div style={metricIcon}>
        {icon}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={card}>
      <div style={cardTitle}>
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
                style={tableHeader}
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
                  style={tableCell}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #eef0f4",
        padding: "10px 0",
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
  return (
    <div
      style={{
        padding: "20px",
        color: "#6b7280",
      }}
    >
      {message}
    </div>
  );
}

function getIcon(item) {
  const icons = {
    Dashboard: "âŒ‚",
    Billing: "â–£",
    "STO Management": "â—ˆ",
    Transactions: "â†”",
    Reports: "â–¥",
    Users: "â™™",
    Settings: "âš™",
  };

  return icons[item] || "â€¢";
}

const loginPage = {
  minHeight: "100vh",
  display: "flex",
  backgroundColor: "#f4f7ff",
  fontFamily: "Arial, sans-serif",
};

const loginLeft = {
  flex: 1,
  background:
    "linear-gradient(135deg, #06245c 0%, #0757d5 60%, #1f78ff 100%)",
  color: "white",
  padding: "70px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const loginRight = {
  width: "460px",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
};

const loginDescription = {
  fontSize: "17px",
  lineHeight: "1.7",
  maxWidth: "500px",
  opacity: 0.9,
};

const featureContainer = {
  marginTop: "40px",
  display: "flex",
  gap: "15px",
};

const featureBox = {
  padding: "14px 20px",
  backgroundColor: "rgba(255,255,255,0.12)",
  borderRadius: "10px",
};

const labelStyle = {
  display: "block",
  fontWeight: "600",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  marginBottom: "20px",
  fontSize: "15px",
};

const loginButton = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#1261e8",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

const errorBox = {
  backgroundColor: "#fee2e2",
  color: "#b91c1c",
  padding: "12px",
  borderRadius: "8px",
  marginBottom: "15px",
  fontSize: "14px",
};

const appContainer = {
  minHeight: "100vh",
  backgroundColor: "#f5f7fb",
  fontFamily: "Arial, sans-serif",
  display: "flex",
};

const sidebar = {
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
};

const logo = {
  fontSize: "25px",
  fontWeight: "bold",
  padding: "5px 15px 30px",
};

const menuButton = {
  width: "100%",
  border: "none",
  color: "white",
  textAlign: "left",
  padding: "13px 15px",
  marginBottom: "7px",
  borderRadius: "7px",
  cursor: "pointer",
  fontSize: "14px",
};

const logoutButton = {
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
};

const mainContent = {
  marginLeft: "235px",
  width: "calc(100% - 235px)",
  minHeight: "100vh",
};

const header = {
  height: "70px",
  backgroundColor: "white",
  borderBottom: "1px solid #e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 30px",
  boxSizing: "border-box",
};

const profileArea = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const profileIcon = {
  width: "38px",
  height: "38px",
  borderRadius: "50%",
  backgroundColor: "#dbeafe",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const content = {
  padding: "30px",
  boxSizing: "border-box",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  marginBottom: "25px",
};

const threeColumnGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  marginBottom: "25px",
};

const twoColumnGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const metricCard = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const metricIcon = {
  width: "45px",
  height: "45px",
  borderRadius: "10px",
  backgroundColor: "#eaf2ff",
  color: "#1261e8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
};

const card = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  overflow: "hidden",
  marginBottom: "20px",
};

const cardTitle = {
  padding: "20px",
  borderBottom: "1px solid #eef0f4",
  fontWeight: "700",
  fontSize: "17px",
};

const tableHeader = {
  textAlign: "left",
  padding: "15px 20px",
  backgroundColor: "#f8fafc",
  color: "#64748b",
  fontSize: "13px",
  whiteSpace: "nowrap",
};

const tableCell = {
  padding: "15px 20px",
  borderTop: "1px solid #eef0f4",
  fontSize: "14px",
  whiteSpace: "nowrap",
};

export default App;
