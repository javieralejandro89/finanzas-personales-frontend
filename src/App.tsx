import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Categories from './pages/Categories/Categories';
import Transactions from './pages/Transactions/Transactions';
import Layout from './components/Layout/Layout';
import { useAuthStore } from './store/authStore';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="w-full max-w-md">
                <div className="card">
                  <div className="card-body">
                    <Login />
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Route
  path="/register"
  element={
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="card-body">
            <Register />
          </div>
        </div>
      </div>
    </div>
  }
/>

        {/* Protected Routes */}        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />  

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> 

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;