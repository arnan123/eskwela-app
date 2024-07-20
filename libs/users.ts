import supabaseClientSide from "@/utils/supabase/client";


export const getUsersByStatus = async () => {
    // Fetch users with status 1 or 2
    const { data: users, error } = await supabaseClientSide
        .from('users')
        .select('*')
        .in('status', [1, 2]);

    if (error) {
        console.error('Error fetching users:', error);
        return { users: null, error };
    }

    return { users, error: null };
};


export const getUserById = async (id: string) => {
    // Fetch users with status 1 or 2
    const { data: user, error } = await supabaseClientSide
        .from('users')
        .select('*')
        .eq('id', id);

    if (error) {
        console.error('Error fetching users:', error);
        return { users: null, error };
    }

    return { user, error: null };
};


export const getUserStatusById = async (id: string) => {
    // Fetch users with status 1 or 2
    const { data: user, error } = await supabaseClientSide
        .from('users')
        .select('*')
        .eq('id', id);
    console.log(user)
    if (error) {
        console.error('Error fetching users:', error);
        return { users: null, error };
    }

    return { user, error: null };
};