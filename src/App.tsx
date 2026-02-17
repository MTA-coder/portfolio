import { Toaster } from '@/components/ui/toaster'
import Sonner from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@/hooks/useTheme'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import React, { Suspense, useEffect } from 'react'
import { useWebVitals } from '@/hooks/useWebVitals'
import { useRoutePrefetch } from '@/hooks/useRoutePrefetch'
import { useGlobalAnimationControl } from '@/hooks/useGlobalAnimationControl'
import GlobalStructuredData from '@/components/GlobalStructuredData'
import OptimizedBubbleCursor from '@/components/OptimizedBubbleCursor'
import { useOptimizedPerformance } from '@/hooks/useOptimizedPerformance'

// Lazily loaded route pages
const Index = React.lazy(() => import('./pages/Index'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const Projects = React.lazy(() => import('./pages/Projects'))
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'))
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'))
const Terms = React.lazy(() => import('./pages/Terms'))
const Blog = React.lazy(() => import('./pages/Blog'))
const BlogDetail = React.lazy(() => import('./pages/BlogDetail'))

// Tuned React Query defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      gcTime: 1000 * 60 * 30, // cacheTime replacement in v5
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
})

const RouteMetrics = () => {
  useWebVitals()
  useRoutePrefetch()
  useGlobalAnimationControl()
  return null
}

const AppRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

class RouteErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('Route error boundary', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-sm text-red-500">
          Something went wrong loading this section.
        </div>
      )
    }
    return this.props.children
  }
}

const App = () => {
  const { getOptimalSettings } = useOptimizedPerformance()
  const settings = getOptimalSettings

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Helmet>
            <link
              rel="canonical"
              href={
                typeof window !== 'undefined'
                  ? window.location.href
                  : 'https://mta-coder.github.io/portfolio//'
              }
            />
            <meta
              name="robots"
              content="index,follow,max-image-preview:large"
            />
            <meta property="og:image" content="/placeholder.svg" />
          </Helmet>
          <GlobalStructuredData />
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/portfolio">
              {settings.enableHover && <OptimizedBubbleCursor />}
              <RouteMetrics />
              <RouteErrorBoundary>
                <Suspense
                  fallback={
                    <div className="p-8 text-center text-sm text-muted-foreground">
                      Loading...
                    </div>
                  }
                >
                  <AppRoutes />
                </Suspense>
              </RouteErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
