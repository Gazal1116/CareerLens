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


class Solution {
    public int climbStairs(int n) {
        if(n<=2) {
            return n;
        }
        int prev1=2;
        int prev2=1;
        for (int i=3; i<=n; i++) {
            int curr= prev1+prev2;
             prev2=prev1;
            prev1=curr;
        }
        return prev1;
    }
}