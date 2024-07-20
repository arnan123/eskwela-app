// src/services/scheduleService.ts

import supabaseClientSide from "@/utils/supabase/client";


export interface Schedule {
    id?: number;
    grade_level: number;
    section_name: string;
    subject_with_time: Record<string, string>;
}

export const getSchedules = async (): Promise<Schedule[]> => {
    const { data, error } = await supabaseClientSide.from('schedules').select('*');
    if (error) throw error;
    return data;
};

export const getScheduleById = async (id: number): Promise<Schedule | null> => {
    const { data, error } = await supabaseClientSide.from('schedules').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

export const createSchedule = async (schedule: Omit<Schedule, 'id'>): Promise<Schedule> => {
    const { data, error } = await supabaseClientSide.from('schedules').insert(schedule).single();
    if (error) throw error;
    return data;
};

export const updateSchedule = async (id: number, schedule: Partial<Schedule>): Promise<Schedule> => {
    const { data, error } = await supabaseClientSide.from('schedules').update(schedule).eq('id', id).single();
    if (error) throw error;
    return data;
};

export const deleteSchedule = async (id: number): Promise<void> => {
    const { error } = await supabaseClientSide.from('schedules').delete().eq('id', id);
    if (error) throw error;
};
