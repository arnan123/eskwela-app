// lib/announcements.ts
import { Announcement } from '@/types/announcement';
import supabaseClientSide from '@/utils/supabase/client';

export const getAnnouncements = async (): Promise<Announcement[]> => {
    const { data, error } = await supabaseClientSide.from('announcements').select('*');
    if (error) throw error;
    return data;
};

export const createAnnouncement = async (announcement: Omit<Announcement, 'id' | 'created_at'>): Promise<void> => {
    const { error } = await supabaseClientSide.from('announcements').insert(announcement);
    if (error) throw error;
};

export const updateAnnouncement = async (id: string, announcement: Partial<Announcement>): Promise<void> => {
    const { error } = await supabaseClientSide.from('announcements').update(announcement).eq('id', id);
    if (error) throw error;
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
    const { error } = await supabaseClientSide.from('announcements').delete().eq('id', id);
    if (error) throw error;
};
