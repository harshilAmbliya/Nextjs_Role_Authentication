"use client";

import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getOneUser = async () => {
            try {
                const { data, status } = await axios.get('/api/me');
                if (status === 200) {
                    setUser(data);
                }
            } catch (error) {
                console.log("wrror", error)
                toast.error(error.response.data.error || 'An error occurred while fetching user data');
            }
        };

        getOneUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
