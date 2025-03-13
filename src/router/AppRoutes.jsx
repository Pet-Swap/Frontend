// AppRoutes.js
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Swipe from '../pages/Swipe';
import Chat from '../pages/Chat';
import About from '../pages/About';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/swipe",
    element: <Swipe />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
