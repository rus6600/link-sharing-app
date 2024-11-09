import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'

import { App } from './App.tsx'
import { queryClient } from './shared/lib/api'
import { rootStore, RootStoreContext } from './store'
import { WithAuth } from './components/Auth'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RootStoreContext.Provider value={rootStore}>
                <WithAuth>
                    <App />
                </WithAuth>
            </RootStoreContext.Provider>
        </QueryClientProvider>
    </StrictMode>
)
