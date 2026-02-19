Smart Bookmark App

This is a simple real-time bookmark manager built using Next.js (App Router), Supabase (Authentication, Database, Realtime), and Tailwind CSS. The goal was to build a secure, production-ready app with Google login, user-level data isolation, and live updates.

Features

Google OAuth authentication (no email/password)

Bookmarks are private to each user

Real-time updates across multiple tabs

Add and delete bookmarks

Deployed on Vercel

Tech Stack

Next.js (App Router)

Supabase (Auth + PostgreSQL + Realtime)

Tailwind CSS

Vercel

Challenges Faced

OAuth Redirect Mismatch
While setting up Google authentication, I encountered a redirect_uri_mismatch error. The issue was caused by an incorrect redirect configuration in Google Cloud. I resolved it by ensuring Google redirects to Supabase’s callback endpoint (https://PROJECT_ID.supabase.co/auth/v1/callback) rather than directly to the frontend.

Row Level Security
Configuring Row Level Security correctly was important to ensure that users can only access their own bookmarks. I enabled RLS on the bookmarks table and created policies using auth.uid() = user_id to enforce proper data isolation.

Real-time Updates
After inserting a bookmark, the UI was not updating immediately. I implemented a Supabase realtime subscription along with a manual refetch after insert/delete to ensure consistent updates across tabs.

Deployment Issues
During deployment on Vercel, I faced build errors due to incorrect environment variables and misconfiguration of NODE_ENV. After correcting the Supabase project URL and properly setting environment variables in Vercel, the application deployed successfully.