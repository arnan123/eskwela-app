import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import supabaseClientSide from '@/utils/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { title,id} = req.body;

    const { error } = await supabaseClientSide.from('notes').insert({title,user:id});
   

    if (error) {
        return res.status(401).json({ message: 'Invalid request' });
    }

    res.status(200);
}
