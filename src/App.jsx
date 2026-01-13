import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from './constants/routes';
import { useEffect } from 'react';

import Layout from './components/Layout';

import SmoothScroll from './components/SmoothScroll';

// Static imports for main pages (always needed)
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Studio from './pages/Studio';
import Experiments from './pages/Experiments';

// Lazy load individual project pages (code splitting)
const Caveman = lazy(() => import('./works/Caveman'));
const Logo = lazy(() => import('./works/Logo'));

const Cheso = lazy(() => import('./archive/studio/Cheso'));
const InfinityBox = lazy(() => import('./archive/studio/InfinityBox'));
const Paintbox = lazy(() => import('./archive/studio/Paintbox'));
const Paperfold = lazy(() => import('./archive/studio/Paperfold'));
const SaoPaulo = lazy(() => import('./archive/studio/SaoPaulo'));
const LightPainting = lazy(() => import('./archive/studio/LightPainting'));

const Agora = lazy(() => import('./archive/experiments/Agora'));
const EchoingNature = lazy(() => import('./archive/experiments/EchoingNature'));
const DigitalGarden = lazy(() => import('./archive/experiments/DigitalGarden'));
const MachinaAnima = lazy(() => import('./archive/experiments/MachinaAnima'));
const LucidLiquids = lazy(() => import('./archive/experiments/LucidLiquids'));

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
            <Route path={ROUTES.HOME} element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path={ROUTES.ABOUT} element={<AnimatedPage><About /></AnimatedPage>} />
            
            <Route path={ROUTES.WORKS.ROOT} element={<AnimatedPage><Works /></AnimatedPage>} />
            
            <Route path={ROUTES.WORKS.CAVEMAN} element={<AnimatedPage><Caveman /></AnimatedPage>} />
            <Route path={ROUTES.WORKS.LOGO} element={<AnimatedPage><Logo /></AnimatedPage>} />
            
            {/* Archive Studio */}
            <Route path={ROUTES.ARCHIVE.STUDIO.ROOT} element={<AnimatedPage><Studio /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.CHESO} element={<AnimatedPage><Cheso /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.INFINITYBOX} element={<AnimatedPage><InfinityBox /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.PAINTBOX} element={<AnimatedPage><Paintbox /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.PAPERFOLD} element={<AnimatedPage><Paperfold /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.SAOPAULO} element={<AnimatedPage><SaoPaulo /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.STUDIO.LIGHTPAINTING} element={<AnimatedPage><LightPainting /></AnimatedPage>} />

            {/* Archive Experiments */}
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.ROOT} element={<AnimatedPage><Experiments /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.AGORA} element={<AnimatedPage><Agora /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.DIGITALGARDEN} element={<AnimatedPage><DigitalGarden /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.ECHOINGNATURE} element={<AnimatedPage><EchoingNature /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.MACHINAANIMA} element={<AnimatedPage><MachinaAnima /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.EXPERIMENTS.LUCIDLIQUIDS} element={<AnimatedPage><LucidLiquids /></AnimatedPage>} />
            </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Disable browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <Router>
      <Layout>
        <SmoothScroll>
          <AppRoutes />
        </SmoothScroll>
      </Layout>
    </Router>
  );
}

export default App;
