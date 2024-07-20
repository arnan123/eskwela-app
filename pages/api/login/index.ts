import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import supabaseClientSide, { supabaseClientSideTest } from '@/utils/supabase/client';
import { getUserById } from '@/libs/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;

    const responseData = await supabaseClientSide.auth.signInWithPassword({
        email,
        password,
    });

    const { user, error: getError } = await getUserById(responseData.data.user?.id as string)


    if (responseData.error || getError) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: responseData.data.user?.id, email: responseData.data.user?.email }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });

    res.status(200).json({ token: responseData.data.session.access_token, user : user[0] });
}
