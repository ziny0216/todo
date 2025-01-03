import { Route, Routes } from 'react-router';
import NotFound from './pages /NotFound/NotFound.tsx';
import Home from './pages /Home/Home.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
