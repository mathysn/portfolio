import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Competence1 from './pages/Competence1';
import Competence2 from './pages/Competence2';
import Competence6 from './pages/Competence6';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="competence1" element={<Competence1 />} />
          <Route path="competence2" element={<Competence2 />} />
          <Route path="competence6" element={<Competence6 />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
