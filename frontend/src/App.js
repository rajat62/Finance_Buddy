import { createBrowserRouter, createRoutesFromElements, Routes, Route, RouterProvider } from 'react-router-dom';
import LoginGuard from "./Guards/LoginGuard"; // Import the LoginGuard component
import Protected from './Guards/Protected';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Online from './pages/Online';
import Cash from './pages/Cash';
import History from './pages/History';
import Stats from './pages/Stats';
import Filtered from './components/Filtered';
import Customize from './pages/Customize';

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Home />} />,
    <Route path="/login" element={<LoginGuard><Login /></LoginGuard>} />,
    <Route path="/signup" element={<LoginGuard><Signup /></LoginGuard>} />,
    <Route path="/dashboard/*" element={<Protected><Dashboard /></Protected>}>
      <Route path="" element={<Stats />} />
      <Route path="income" element={<Income />} />
      <Route path="online" element={<Online />} />
      <Route path="expense" element={<Expense />} />
      <Route path="cash" element={<Cash />} />
      <Route path="history" element={<History />} />
      <Route path="customize" element={<Customize />} />
      <Route path=":id" element={<Filtered/>} />
    </Route>
  ])
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
