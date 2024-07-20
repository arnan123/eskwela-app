// src/services/studentService.ts

import supabaseClientSide from "@/utils/supabase/client";

export interface Student {
    id?: number;
    email: string;
    schedule: number;
    grades: Record<string, number>;
}

export const getStudents = async (): Promise<Student[]> => {
    const { data, error } = await supabaseClientSide.from('students').select('*');
    if (error) throw error;
    return data;
};

export const getStudentById = async (id: number): Promise<Student | null> => {
    const { data, error } = await supabaseClientSide.from('students').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

export const createStudent = async (student: Omit<Student, 'id'>): Promise<Student> => {
    const { data, error } = await supabaseClientSide.from('students').insert(student).single();
    if (error) throw error;
    return data;
};

export const updateStudent = async (id: number, student: Partial<Student>): Promise<Student> => {
    const { data, error } = await supabaseClientSide.from('students').update(student).eq('id', id).single();
    if (error) throw error;
    return data;
};

export const deleteStudent = async (id: number): Promise<void> => {
    const { error } = await supabaseClientSide.from('students').delete().eq('id', id);
    if (error) throw error;
};
