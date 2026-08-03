import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from './constants/routes';
import { ROUTE_EXIT_COMPLETE_EVENT } from './constants/events';
import { useEffect, ReactNode } from 'react';

import Layout from './components/Layout';
import Renovation from './pages/Renovation';
import { UNDER_RENOVATION } from './constants/renovation';

import LenisProvider from './components/LenisProvider';

import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';

import Archive from './pages/Archive';

import { Caveman, Logo, Agora, Stamps } from './works';
// Studio archive imports are temporarily disabled while the studio section is hidden.
// To restore: uncomment the lines below (plus `Footer`) and the studio routes in <AppRoutes /> below.
// import { Cheso, InfinityBox, Paintbox, Paperfold, SaoPaulo, LightPainting } from './archive';
// import Footer from './components/Footer';

const dissolve = {
  duration: 0.5,
  ease: [0.45, 0, 0.2, 1] as const,
};

function AnimatedPage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={dissolve}
    >
      {children}
    </motion.div>
  );
}

function archiveRouteKey(pathname: string) {
  if (
    pathname === ROUTES.ARCHIVE.MOTION.ROOT ||
    pathname === ROUTES.ARCHIVE.RENDERINGS.ROOT
  ) {
    return ROUTES.ARCHIVE.ROOT;
  }
  return pathname;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => {
      window.dispatchEvent(new Event(ROUTE_EXIT_COMPLETE_EVENT));
    }}>
        <Routes location={location} key={archiveRouteKey(location.pathname)}>
            <Route path={ROUTES.HOME} element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path={ROUTES.ABOUT} element={<AnimatedPage><About /></AnimatedPage>} />
            
            <Route path={ROUTES.WORKS.ROOT} element={<AnimatedPage><Works /></AnimatedPage>} />
            
            <Route path={ROUTES.WORKS.CAVEMAN} element={<AnimatedPage><Caveman /></AnimatedPage>} />
            <Route path={ROUTES.WORKS.LOGO} element={<AnimatedPage><Logo /></AnimatedPage>} />
            <Route path={ROUTES.WORKS.AGORA} element={<AnimatedPage><Agora /></AnimatedPage>} />
            <Route path={ROUTES.WORKS.STAMPS} element={<AnimatedPage><Stamps /></AnimatedPage>} />
            
            {/* Archive listing – studio is temporarily hidden; default to motion */}
            <Route path={ROUTES.ARCHIVE.ROOT} element={<Navigate to={ROUTES.ARCHIVE.MOTION.ROOT} replace />} />
            {/* Archive Studio is temporarily hidden — all studio routes redirect to motion.
                To restore, re-enable the imports at the top of this file and swap the catch-all
                redirect below for the per-project routes:
                  <Route path={ROUTES.ARCHIVE.STUDIO.ROOT} element={<AnimatedPage><Archive /></AnimatedPage>} />
                  <Route path={ROUTES.ARCHIVE.STUDIO.CHESO} element={<AnimatedPage><Cheso /><Footer theme="light" /></AnimatedPage>} />
                  <Route path={ROUTES.ARCHIVE.STUDIO.INFINITYBOX} element={<AnimatedPage><InfinityBox /><Footer theme="light" /></AnimatedPage>} />
                  <Route path={ROUTES.ARCHIVE.STUDIO.PAINTBOX} element={<AnimatedPage><Paintbox /><Footer theme="light" /></AnimatedPage>} />
                  <Route path={ROUTES.ARCHIVE.STUDIO.PAPERFOLD} element={<AnimatedPage><Paperfold /><Footer theme="light" /></AnimatedPage>} />
                  <Route path={ROUTES.ARCHIVE.STUDIO.SAOPAULO} element={<AnimatedPage><SaoPaulo /><Footer theme="light" /></AnimatedPage>} />
                  <Route path={ROUTES.ARCHIVE.STUDIO.LIGHTPAINTING} element={<AnimatedPage><LightPainting /><Footer theme="light" /></AnimatedPage>} />
                Also restore the studio filter in src/pages/Archive.tsx. */}
            <Route path="/archive/studio/*" element={<Navigate to={ROUTES.ARCHIVE.MOTION.ROOT} replace />} />

            {/* Archive Motion + Renderings */}
            <Route path={ROUTES.ARCHIVE.MOTION.ROOT} element={<AnimatedPage><Archive /></AnimatedPage>} />
            <Route path="/archive/motion/*" element={<Navigate to={ROUTES.ARCHIVE.MOTION.ROOT} replace />} />
            <Route path={ROUTES.ARCHIVE.RENDERINGS.ROOT} element={<AnimatedPage><Archive /></AnimatedPage>} />
            <Route path="/archive/renderings/*" element={<Navigate to={ROUTES.ARCHIVE.RENDERINGS.ROOT} replace />} />

            {/* Legacy URLs → motion */}
            <Route path="/archive/systems" element={<Navigate to={ROUTES.ARCHIVE.MOTION.ROOT} replace />} />
            <Route path="/archive/systems/*" element={<Navigate to={ROUTES.ARCHIVE.MOTION.ROOT} replace />} />
            <Route path="/archive/experiments" element={<Navigate to={ROUTES.ARCHIVE.MOTION.ROOT} replace />} />
            <Route path="/archive/experiments/*" element={<Navigate to={ROUTES.ARCHIVE.MOTION.ROOT} replace />} />

            <Route path="*" element={
              <AnimatedPage>
                <div className="flex flex-col items-center justify-center h-svh bg-[#ffffff] text-black gap-4">
                  <h1 className="text-6xl font-bold">404</h1>
                  <p className="text-lg text-gray-500">Page not found</p>
                  <Link to={ROUTES.HOME} className="mt-4 text-base underline underline-offset-4 hover:opacity-70 transition-opacity">
                    Back to Home
                  </Link>
                </div>
              </AnimatedPage>
            } />
            </Routes>
      </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  if (UNDER_RENOVATION) return <Renovation />;

  return (
    <Router>
      <LenisProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </LenisProvider>
    </Router>
  );
}

export default App;
