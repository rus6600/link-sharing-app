import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { queryClient } from './shared/lib/api'
import { QueryClientProvider } from '@tanstack/react-query'
import { rootStore, RootStoreContext } from './store'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RootStoreContext.Provider value={rootStore}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </RootStoreContext.Provider>
    </StrictMode>
)
