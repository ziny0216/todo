import Home from './pages /Home/Home.tsx';
import Login from './pages /Auth/Login.tsx';
import SignUp from './pages /Auth/SignUp.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import DailyView from './pages /Home/views/DailyView.tsx';
import WeeklyView from './pages /Home/views/WeeklyView.tsx';
import MonthlyView from './pages /Home/views/MonthlyView.tsx';
import NotFound from './pages /NotFound/NotFound.tsx';
import { ProtectedRouteProps } from './types/common.ts';

// 라우트
const routes = [
  { path: '/login', element: <Login /> },
  { path: '/sign-up', element: <SignUp /> },
  {
    path: '/',
    element: <ProtectedRoute element={<Home />} />,
    children: [
      { path: '/', element: <Navigate to="/daily" replace /> },
      { path: '/daily', element: <DailyView /> },
      { path: '/weekly', element: <WeeklyView /> },
      { path: '/monthly', element: <MonthlyView /> },
    ],
  },
  { path: '/*', element: <NotFound /> },
];

// 라우트 등록
const router = createBrowserRouter(routes);

//로그인 상태에 따른 컴포넌트 렌더링
function ProtectedRoute({
  element,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const user_id = localStorage.getItem('user_id');
  return user_id ? element : <Navigate to={redirectTo} replace />;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
