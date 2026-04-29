import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;