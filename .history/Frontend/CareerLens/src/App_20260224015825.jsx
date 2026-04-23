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

import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>

        {/* Default Home Page */}
        <Route path="/" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* If wrong URL → redirect to Home */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;
