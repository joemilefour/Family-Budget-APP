create table if not exists public.household_budgets (
  household_id text primary key,
  budget_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.household_budgets enable row level security;

drop policy if exists "household budget shared link read" on public.household_budgets;
drop policy if exists "household budget shared link write" on public.household_budgets;

create policy "household budget shared link read"
on public.household_budgets
for select
to anon
using (true);

create policy "household budget shared link write"
on public.household_budgets
for insert
to anon
with check (true);

create policy "household budget shared link update"
on public.household_budgets
for update
to anon
using (true)
with check (true);

insert into public.household_budgets (household_id, budget_data)
values ('family-budget-4bbbfefc6aa0', '{}'::jsonb)
on conflict (household_id) do nothing;
