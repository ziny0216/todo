import { Navigate, Route, Routes } from 'react-router';
import NotFound from './pages /NotFound/NotFound.tsx';
import Home from './pages /Home/Home.tsx';
import DailyView from './pages /Home/views/DailyView.tsx';
import WeeklyView from './pages /Home/views/WeeklyView.tsx';
import MonthlyView from './pages /Home/views/MonthlyView.tsx';
import Login from './pages /Auth/Login.tsx';
import SignUp from './pages /Auth/SignUp.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate to="daily" />} />
          <Route path="/daily" element={<DailyView />} />
          <Route path="/weekly" element={<WeeklyView />} />
          <Route path="/monthly" element={<MonthlyView />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
