import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from './constants/routes';

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import SmoothScroll from './components/SmoothScroll';

import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Archive from './pages/Archive';

import { Agora, Caveman, Logo } from './works/index.js';
import { Cheso, InfinityBox, Paintbox, Paperfold, SaoPaulo, LightPainting } from './archive/index.js';

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          // Reset scroll to top on route change
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }}
      >
          <Routes location={location} key={location.pathname}>
            <Route path={ROUTES.HOME} element={<AnimatedPage><Home /></AnimatedPage>} />
            <Route path={ROUTES.ABOUT} element={<AnimatedPage><About /></AnimatedPage>} />
            
            <Route path={ROUTES.WORKS.ROOT} element={<AnimatedPage><Works /></AnimatedPage>} />
            <Route path={ROUTES.WORKS.AGORA} element={<AnimatedPage><Agora /></AnimatedPage>} />
            <Route path={ROUTES.WORKS.CAVEMAN} element={<AnimatedPage><Caveman /></AnimatedPage>} />
            <Route path={ROUTES.WORKS.LOGO} element={<AnimatedPage><Logo /></AnimatedPage>} />

            <Route path={ROUTES.ARCHIVE.ROOT} element={<AnimatedPage><Archive /></AnimatedPage>} />
            
            {/* Archive Others */}
            <Route path={ROUTES.ARCHIVE.OTHERS.CHESO} element={<AnimatedPage><Cheso /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.OTHERS.INFINITYBOX} element={<AnimatedPage><InfinityBox /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.OTHERS.PAINTBOX} element={<AnimatedPage><Paintbox /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.OTHERS.PAPERFOLD} element={<AnimatedPage><Paperfold /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.OTHERS.SAOPAULO} element={<AnimatedPage><SaoPaulo /></AnimatedPage>} />
            <Route path={ROUTES.ARCHIVE.OTHERS.LIGHTPAINTING} element={<AnimatedPage><LightPainting /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <SmoothScroll>
        <AppRoutes />
        <Analytics />
        <SpeedInsights />
      </SmoothScroll>
    </Router>
  );
}

export default App;
