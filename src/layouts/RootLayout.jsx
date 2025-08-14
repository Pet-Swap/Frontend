import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { AuthProvider } from '../contexts/AuthContext'
import queryClient from '../utils/queryClient'
import Footer from './Footer'
import Header from './Header'

const RootLayout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <div className="w-full max-w-5xl flex flex-col flex-1">
                        <Header />
                        <main className="flex-1">
                            <Outlet />
                        </main>
                        <Footer />
                    </div>
                    <Toaster
                        position="top-right"
                        richColors
                        closeButton
                        expand={false}
                        visibleToasts={4}
                    />
                </div>
                <ReactQueryDevtools initialIsOpen={false} />
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default RootLayout;
