// src/services/teacherService.ts

import { Teacher } from "@/interface/TeacherInterface";
import supabaseClientSide from "@/utils/supabase/client";


export const getTeachers = async (): Promise<Teacher[]> => {
    const { data, error } = await supabaseClientSide.from('teachers').select('*');
    if (error) throw error;
    return data;
};

export const getTeacherById = async (id: number): Promise<Teacher | null> => {
    const { data, error } = await supabaseClientSide.from('teachers').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

export const createTeacher = async (teacher: Omit<Teacher, 'id'>): Promise<Teacher> => {
    const { data, error } = await supabaseClientSide.from('teachers').insert(teacher).single();
    if (error) throw error;
    return data;
};

export const updateTeacher = async (id: number, teacher: Partial<Teacher>): Promise<Teacher> => {
    const { data, error } = await supabaseClientSide.from('teachers').update(teacher).eq('id', id).single();
    if (error) throw error;
    return data;
};

export const deleteTeacher = async (id: number): Promise<void> => {
    const { error } = await supabaseClientSide.from('teachers').delete().eq('id', id);
    if (error) throw error;
};
