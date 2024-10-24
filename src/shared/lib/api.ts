import { QueryClient } from '@tanstack/react-query'

import axios from 'axios'
import { linkModel, userModel } from '../models'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 8000,
    headers: {
        Accept: 'application/json',
    },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('social-link-share-access-token')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const signUp = (args: userModel) => {
    return axiosInstance.post('/auth/signup', args)
}

export const signIn = (args: userModel) => {
    return axiosInstance.post('/auth/signin', args)
}

export const getUsers = () => {
    return axiosInstance.get('/users')
}

export const addLinks = (args: linkModel) => {
    return axiosInstance.post('/users/', args)
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
})
