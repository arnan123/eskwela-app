import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export const createClientSide = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

const supabaseClientSide = createClientSide();

export default supabaseClientSide


export function createClientTest() { 
    const supabase = createBrowserClient(         
        process.env.NEXT_PUBLIC_SUPABASE_URL!,     
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    return supabase 
}

export const supabaseClientSideTest = createClientTest();
