import supabaseClientSide from '@/utils/supabase/client';

export const getSubjectsWithUsers = async () => {
    // Fetch subjects sorted by grade_level
    const { data: subjects, error: subjectsError } = await supabaseClientSide
        .from('subjects')
        .select('*')
        .order('grade_level', { ascending: true });

    if (subjectsError) {
        console.error('Error fetching subjects:', subjectsError);
        return { subjects: null, error: subjectsError };
    }

    // Extract unique user_ids
    const userIds = [...new Set(subjects.flatMap(subject => subject.teachers_id_assigned)) as any];

    // Fetch users
    const { data: users, error: usersError } = await supabaseClientSide
        .from('users')
        .select('*')
        .in('id', userIds);


    if (usersError) {
        console.error('Error fetching users:', usersError);
        return { subjects: null, error: usersError };
    }

    // Map users to a dictionary for easy lookup
    const usersMap = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
    }, {});

    // Attach user details to each subject
    const subjectsWithUsers = subjects.map(subject => ({
        ...subject,
        users: subject.teachers_id_assigned.map((userId: any) => usersMap[userId])
    }));


    return { subjects: subjectsWithUsers, error: null };
};
