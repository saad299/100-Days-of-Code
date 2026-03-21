import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

const [currentView, setCurrentView] = useState("login"); // "login" | "register" | "dashboard"
const [token, setToken] = useState(null);
const [loggedInUser, setLoggedInUser] = useState(null);
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
const [form, setForm] = useState({ name: "", email: "", password: "" });
const [loading, setLoading] = useState(false);
const [status, setStatus] = useState(null);

// interface Form {
//   name: string,
//   email: string,
//   password: string,
// }

const handleLogin = () => {};

const App = () => {
  return (
    <>
      <div>
        {currentView === "login" && <Login />}
        {currentView === "register" && <Register />}
        {currentView === "dashboard" && <Dashboard />}
      </div>
      <Login
        form={form}
        setForm={setForm}
        onLogin={handleLogin}
        loading={loading}
        status={status}
        switchToRegister={() => setCurrentView("register")}
      />
      <Register />
    </>
  );
};

export default App;
