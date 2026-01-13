
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SavedPosts from './pages/SavedPosts';
import PostDetail from './pages/PostDetail';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosts from './pages/admin/AdminPosts';
import AdminPostForm from './pages/admin/AdminPostForm';
import AdminSubscribers from './pages/admin/AdminSubscribers';
import AdminLogin from './pages/admin/AdminLogin';
import { useThemeController } from './controllers/useThemeController';

const App: React.FC = () => {
  const { mode, toggleTheme } = useThemeController();

  return (
    <Router>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
            <Header themeMode={mode} onToggleTheme={toggleTheme} />
            <main className="flex-grow w-full">
              <Home />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/yazi/:id" element={
          <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
            <Header themeMode={mode} onToggleTheme={toggleTheme} />
            <main className="flex-grow w-full">
              <PostDetail />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/saved" element={
          <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
            <Header themeMode={mode} onToggleTheme={toggleTheme} />
            <main className="flex-grow w-full">
              <SavedPosts />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/about" element={
          <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
            <Header themeMode={mode} onToggleTheme={toggleTheme} />
            <main className="flex-grow w-full max-w-screen-md mx-auto px-6">
              <About />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/contact" element={
          <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
            <Header themeMode={mode} onToggleTheme={toggleTheme} />
            <main className="flex-grow w-full max-w-screen-md mx-auto px-6">
              <Contact />
            </main>
            <Footer />
          </div>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/yazilar" element={<AdminLayout><AdminPosts /></AdminLayout>} />
        <Route path="/admin/yeni" element={<AdminLayout><AdminPostForm /></AdminLayout>} />
        <Route path="/admin/duzenle/:id" element={<AdminLayout><AdminPostForm /></AdminLayout>} />
        <Route path="/admin/aboneler" element={<AdminLayout><AdminSubscribers /></AdminLayout>} />
      </Routes>
    </Router>
  );
};

export default App;
