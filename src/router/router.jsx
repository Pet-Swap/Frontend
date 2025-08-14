import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import RootLayout from '../layouts/RootLayout'
import About from '../pages/About'
import Bookings from '../pages/Bookings'
import Chat from '../pages/Chat'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Listings from '../pages/Listings'
import Matches from '../pages/Matches'
import Messages from '../pages/Messages'
import Pets from '../pages/Pets'
import Profile from '../pages/Profile'
import Reviews from '../pages/Reviews'
import Swipe from '../pages/Swipe'

// Root route with layout
const rootRoute = createRootRoute({
    component: RootLayout,
})

// Define all routes
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
})

const swipeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/swipe',
    component: Swipe,
})

const chatRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/chat',
    component: Chat,
})

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
})

const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/profile',
    component: Profile,
})

const petsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/pets',
    component: Pets,
})

const listingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/listings',
    component: Listings,
})

const matchesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/matches',
    component: Matches,
})

const messagesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/messages',
    component: Messages,
})

const bookingsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/bookings',
    component: Bookings,
})

const reviewsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/reviews',
    component: Reviews,
})

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
})

// Create the route tree
const routeTree = rootRoute.addChildren([
    indexRoute,
    swipeRoute,
    chatRoute,
    aboutRoute,
    profileRoute,
    petsRoute,
    listingsRoute,
    matchesRoute,
    messagesRoute,
    bookingsRoute,
    reviewsRoute,
    dashboardRoute,
])

// Create and export the router
export const router = createRouter({ routeTree })
