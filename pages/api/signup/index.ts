import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import supabaseClientSide from '@/utils/supabase/client';
import { ACCOUNT_STATUS } from '@/constants/account_status';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { email, password } = req.body;

    const { data, error } = await supabaseClientSide.auth.signUp({
        email,
        password,
    });

    const { error: insertError } = await supabaseClientSide.from('users').insert({ id: data.user?.id, username: data.user?.email, status: ACCOUNT_STATUS.ADMIN });


    if (error || insertError) {
        return res.status(401).json({ message: 'Error signing up' });
    }

    const token = jwt.sign({ id: data.user?.id, email: data.user?.email }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });

    res.status(200).json({ token });
}
