// pages/api/getUser.js

import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import User from '@/models/userModel';

export const GET = async (request) => {
    try {
        const token = request.cookies.get('authorizationToken')?.value || '';

        if (!token) {
            throw new Error('Unauthorized User');
        }

        const decodedToken = verify(token, process.env.NEXTJS_SECRET);

        if (!decodedToken.userId) {
            throw new Error('Invalid Token');
        }

        const user = await User.findById(decodedToken.userId);

        if (!user) {
            throw new Error('User not found');
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
};
