// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import Home from "./components/Home";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//             <Route path="/" element={<SignUp />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import Home from "./components/Home";

// function App() {
//   return <Home />;
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/explore" element={<Explore />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* If route not found */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;