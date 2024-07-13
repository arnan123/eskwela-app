import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import supabaseClientSide from '@/utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const {
        data: { user },
    } = await supabaseClientSide.auth.getUser()



    res.status(200).json({ user });
}
