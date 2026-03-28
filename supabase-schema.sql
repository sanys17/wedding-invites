-- Run this in: supabase.com → your project → SQL Editor

create table if not exists invites (
  id                text primary key,          -- short nanoid, used in the URL
  partner1          text not null,
  partner2          text not null,
  date              text not null,
  time              text,
  venue             text not null,
  location          text not null,
  message           text,
  rsvp_email        text not null,
  template          text not null default 'elegant-minimal',
  plan              text not null default 'standard',
  customer_email    text,
  paid              boolean not null default false,
  stripe_session_id text,
  created_at        timestamptz not null default now()
);

-- Only the service role (your API) can read/write.
-- Public users can read paid invites (needed to show the invite page).
alter table invites enable row level security;

-- Migration for existing databases:
-- ALTER TABLE invites ADD COLUMN IF NOT EXISTS plan text NOT NULL DEFAULT 'standard';

create policy "Public can read paid invites"
  on invites for select
  using (paid = true);

create policy "Service role has full access"
  on invites for all
  using (auth.role() = 'service_role');
