import { useState, useEffect } from 'react';
import { Layout } from './layouts/Layout';
import { Dashboard } from './pages/Dashboard';
import { ApplyLeave } from './pages/ApplyLeave';
import { LeaveStatus } from './pages/LeaveStatus';
import { Reports } from './pages/Reports';
import { Welcome } from './pages/Welcome';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  useEffect(() => {
    // Notify Telegram Web App that the app is ready
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome': return <Welcome onStart={() => setCurrentPage('dashboard')} />;
      case 'dashboard': return <Dashboard />;
      case 'apply': return <ApplyLeave />;
      case 'status': return <LeaveStatus />;
      case 'reports': return <Reports />;
      default: return <Dashboard />;
    }
  };

  if (currentPage === 'welcome') {
    return renderPage();
  }

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
