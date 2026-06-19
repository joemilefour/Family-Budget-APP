# Family Budget Shared App Setup

## What is already prepared

- Android-installable PWA shell
- App icon and manifest
- Offline service worker
- Household PIN screen
- Supabase REST sync placeholders
- Supabase table setup SQL

## What I need from you

1. Run `supabase-setup.sql` in the Supabase SQL editor.
2. Deploy the app to a secure shared link.
3. Open the link on both phones and install it from Chrome.

## Recommended security

Use a 6-8 digit PIN, not a 4 digit PIN. The app stores a SHA-256 hash of the PIN, not the PIN itself.

The current Supabase SQL is intentionally simple for a private shared household link. For stronger security, the next upgrade is a Supabase Edge Function that validates the PIN server-side before reading or writing the budget.

## Configured household

- Supabase API URL: `https://wactmtglpqqtnwjcroxs.supabase.co`
- Household ID: `family-budget-4bbbfefc6aa0`

## Android install flow after hosting

1. Open the private app link in Chrome on each Android phone.
2. Tap the menu.
3. Tap "Add to Home screen" or "Install app."
4. Enter the household PIN.
5. Allow calendar reminders when importing bill alerts.
