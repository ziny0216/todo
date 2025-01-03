import { Route, Routes } from 'react-router';
import NotFound from './pages /NotFound/NotFound.tsx';
import Home from './pages /Home/Home.tsx';
import Header from './components/Header/Header.tsx';

function App() {
  return (
    <>
      <Header title={new Date().toLocaleDateString()} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
