import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';

import ProductDetails from './pages/ProductDetails';
import Placeholder from './pages/Placeholder';

function App() {
  return (
    <div className="w-full min-h-screen bg-slate-50 relative overflow-x-hidden">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop/*" element={<Shop />} />
          <Route path="/emi-dues" element={<Placeholder title="EMI Dues" />} />
          <Route path="/limit" element={<Placeholder title="Limit" />} />
          <Route path="/profile" element={<Placeholder title="Profile" />} />
        </Route>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
