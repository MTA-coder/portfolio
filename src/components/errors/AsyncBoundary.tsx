import React, { Suspense } from 'react'

interface AsyncBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: (error: Error) => React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode
    errorFallback?: (error: Error) => React.ReactNode
  },
  State
> {
  state: State = { hasError: false, error: null }
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Async boundary error', error, info)
  }
  reset = () => this.setState({ hasError: false, error: null })
  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.errorFallback ? (
        this.props.errorFallback(this.state.error)
      ) : (
        <div className="p-6 text-sm text-red-500">Failed to load content.</div>
      )
    }
    return this.props.children
  }
}

export const AsyncBoundary: React.FC<AsyncBoundaryProps> = ({
  children,
  fallback = (
    <div className="p-4 text-muted-foreground text-sm">Loading...</div>
  ),
  errorFallback,
}) => (
  <ErrorBoundary errorFallback={errorFallback}>
    <Suspense fallback={fallback}>{children}</Suspense>
  </ErrorBoundary>
)
