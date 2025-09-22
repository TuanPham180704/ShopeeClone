import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from '../src/contexts/app.contexts'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from '../src/components/ErrorBoundary'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color|bc)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <HelmetProvider>
              <ErrorBoundary>
                <Story />
              </ErrorBoundary>
            </HelmetProvider>
          </AppProvider>
        </QueryClientProvider>
      </BrowserRouter>
    )
  ]
}

export default preview
