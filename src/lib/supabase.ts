import { createClient } from "@supabase/supabase-js";

// Variables PUBLIC_* quedan expuestas en el bundle del cliente por diseño
// de Astro/Vite — para Supabase esto es seguro siempre que la tabla tenga
// Row Level Security (RLS) habilitada y una policy explícita de "insert"
// para el formulario de contacto. No pongas aquí la service_role key.
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[supabase] Faltan PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY en el entorno."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
