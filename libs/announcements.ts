// lib/announcements.ts
import { Announcement } from '@/types/announcement';
import supabaseClientSide from '@/utils/supabase/client';
import { useSession } from '@supabase/auth-helpers-react';
import { useCookies } from 'react-cookie';

export const getAnnouncements = async (): Promise<Announcement[]> => {
    const { data, error } = await supabaseClientSide.from('notes').select('*');
    if (error) throw error;
    return data;
};

export const createAnnouncement = async (announcement: any): Promise<void> => {
    const session = useSession();
    const { error } = await supabaseClientSide.from('notes').insert({...announcement,user:session?.user.id});
    if (error) throw error;
};

export const updateAnnouncement = async (id: string, announcement: any): Promise<void> => {
    const { error } = await supabaseClientSide.from('announcements').update(announcement).eq('id', id);
    if (error) throw error;
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
    const { error } = await supabaseClientSide.from('notes').delete().eq('id', id);
    if (error) throw error;
};
