import { AliasOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'node:path'

const root = path.resolve(__dirname, 'src')
const styleRoot = path.resolve(__dirname, 'styles')
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': root,
            '@styles': styleRoot,
        } as AliasOptions,
    },
})
