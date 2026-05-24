import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from './constants/routes';
import { useEffect, ReactNode } from 'react';

import Layout from './components/Layout';
import Renovation from './pages/Renovation';
import { UNDER_RENOVATION } from './constants/renovation';

import LenisProvider from './components/LenisProvider';

import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';

import Archive from './pages/Archive';

import { Caveman, Logo, Agora } from './works';
import { Cheso, InfinityBox, Paintbox, Paperfold, SaoPaulo, LightPainting, EchoingNature, DigitalGarden, MachinaAnima, LucidLiquids } from './archive';

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
  if (pathname === ROUTES.ARCHIVE.STUDIO.ROOT || pathname === ROUTES.ARCHIVE.EXPERIMENTS.ROOT) {
    return ROUTES.ARCHIVE.ROOT;
  }
  return pathname;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => {
      window.dispatchEvent(new Event('route-exit-complete'));
    }}>
        <Routes location={location} key={archiveRouteKey(location.pathname)}>
            <Route path={ROUTES.HOME} element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path={ROUTES.ABOUT} element={<AnimatedPage><About /></AnimatedPage>} />
            
            <Route path={ROUTES.WORKS.ROOT} element={<AnimatedPage><Works /></AnimatedPage>} />
            
            <Route path={ROUTES.WORKS.CAVEMAN} element={<AnimatedPage><Caveman /></AnimatedPage>} />
            <Route path={ROUTES.WORKS.LOGO} element={<AnimatedPage><Logo /></AnimatedPage>} />
            <Route path={ROUTES.WORKS.AGORA} element={<AnimatedPage><Agora /></AnimatedPage>} />
            
            {/* Archive listing – default to studio */}
            <Route path={ROUTES.ARCHIVE.ROOT} element={<Navigate to={ROUTES.ARCHIVE.STUDIO.ROOT} replace />} />
            {/* Archive Studio */}
            <Route path={ROUTES.ARCHIVE.STUDIO.ROOT} element={<AnimatedPage><Archive /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.CHESO} element={<AnimatedPage><Cheso /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.INFINITYBOX} element={<AnimatedPage><InfinityBox /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.PAINTBOX} element={<AnimatedPage><Paintbox /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.PAPERFOLD} element={<AnimatedPage><Paperfold /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.SAOPAULO} element={<AnimatedPage><SaoPaulo /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.LIGHTPAINTING} element={<AnimatedPage><LightPainting /></AnimatedPage>} />

            {/* Archive Experiments */}
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.ROOT} element={<AnimatedPage><Archive /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.DIGITALGARDEN} element={<AnimatedPage><DigitalGarden /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.ECHOINGNATURE} element={<AnimatedPage><EchoingNature /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.MACHINAANIMA} element={<AnimatedPage><MachinaAnima /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.LUCIDLIQUIDS} element={<AnimatedPage><LucidLiquids /></AnimatedPage>} />

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
