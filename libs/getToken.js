
'use client'
import { useState, useEffect } from 'react'

export default function getToken() {
    const [token, setToken] = useState('');
    useEffect(() => {
        setToken(localStorage.getItem('authorizationToken'))
    }, [])

    return token
}