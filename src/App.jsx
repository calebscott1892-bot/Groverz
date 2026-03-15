import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { pageRoutes, redirectRoutes, SiteLayout } from '@/config/routes';
import NotFoundPage from '@/pages/NotFoundPage';

function AppRoutes() {
  return (
    <Routes>
      {pageRoutes.map(({ path, pageKey, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <SiteLayout activePageKey={pageKey}>
              <Component />
            </SiteLayout>
          }
        />
      ))}
      {redirectRoutes.map(({ path, to }) => (
        <Route key={path} path={path} element={<Navigate replace to={to} />} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
