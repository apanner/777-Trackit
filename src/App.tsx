import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useFirebaseData } from './hooks/useFirebaseData';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './components/Dashboard';
import { ProjectDashboard } from './components/projects/ProjectDashboard';
import { ProjectDetails } from './components/projects/ProjectDetails';
import { CalendarView } from './components/calendar/CalendarView';
import { TaskListView } from './components/task/TaskListView';
import { MyTasks } from './components/MyTasks';
import { Settings } from './components/Settings';
import { ProfileEdit } from './components/profile/ProfileEdit';
import { Navigation } from './components/layout/Navigation';
import { Header } from './components/layout/Header';
import { Toast } from './components/ui/Toast';
import { useToast } from './hooks/useToast';
import { UserDashboard } from './components/users/UserDashboard';

export default function App() {
  const { isAdmin, currentUser } = useAuthStore();
  const { toast, hideToast } = useToast();
  const { loading } = useFirebaseData();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-gray-200 text-xl">Loading...</div>
      </div>
    );
  }

  // If not logged in, show login page
  if (!currentUser && !isAdmin) {
    return <LoginPage />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#121212]">
        <Header />
        <Navigation />

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={isAdmin ? <Dashboard /> : <Navigate to="/projects" />} />
            <Route path="/projects" element={<ProjectDashboard />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/tasks" element={<TaskListView />} />
            {currentUser && <Route path="/my-tasks" element={<MyTasks />} />}
            {isAdmin && <Route path="/users" element={<UserDashboard />} />}
            {(currentUser || isAdmin) && <Route path="/profile" element={<ProfileEdit />} />}
            {isAdmin && <Route path="/settings" element={<Settings />} />}
          </Routes>
        </main>

        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={hideToast}
          />
        )}
      </div>
    </Router>
  );
}