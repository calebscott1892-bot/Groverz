import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { pageRoutes, redirectRoutes, SiteLayout } from '@/config/routes';
import NotFoundPage from '@/pages/NotFoundPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
            <p className="mt-2 text-gray-600">Please refresh the page and try again.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-[#b91c1c] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#991b1b]"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <Router>
        <AppRoutes />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
