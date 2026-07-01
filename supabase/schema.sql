-- Ejecutar en el SQL editor de Supabase.
-- Tabla para el formulario de contacto de la landing.

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

-- Permite que cualquiera (rol anon, usado por el sitio público) inserte
-- mensajes, pero nadie puede leer/editar/borrar desde el cliente.
create policy "Cualquiera puede enviar un mensaje de contacto"
  on contact_messages
  for insert
  to anon
  with check (true);
