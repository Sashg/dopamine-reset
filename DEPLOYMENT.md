# 🚀 Deployment Guide - Vercel + Supabase

This guide will help you deploy the Dopamine Reset habit tracker with a full backend using Vercel and Supabase.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Supabase account (free)

## 🗄️ Step 1: Set Up Supabase Backend

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Choose your organization
6. Enter project details:
   - **Name**: `dopamine-reset`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
7. Click "Create new project"

### 1.2 Set Up Database Schema

Run these SQL commands in the Supabase SQL Editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create habits table
CREATE TABLE habits (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  frequency VARCHAR(50) NOT NULL,
  reminder TIME,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  streak INTEGER DEFAULT 0,
  total_completions INTEGER DEFAULT 0,
  success_rate DECIMAL(5,2) DEFAULT 0
);

-- Create habit_logs table
CREATE TABLE habit_logs (
  id BIGSERIAL PRIMARY KEY,
  habit_id BIGINT REFERENCES habits(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status VARCHAR(50) NOT NULL,
  notes TEXT,
  difficulty INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE achievements (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_stats table
CREATE TABLE user_stats (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  total_habits INTEGER DEFAULT 0,
  total_logs INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own habits" ON habits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habits" ON habits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habits" ON habits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own habits" ON habits
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own logs" ON habit_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" ON habit_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own logs" ON habit_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own logs" ON habit_logs
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own achievements" ON achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats" ON user_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_habits_user_id ON habits(user_id);
CREATE INDEX idx_habit_logs_habit_id ON habit_logs(habit_id);
CREATE INDEX idx_habit_logs_user_id ON habit_logs(user_id);
CREATE INDEX idx_habit_logs_date ON habit_logs(date);
CREATE INDEX idx_achievements_user_id ON achievements(user_id);
CREATE INDEX idx_user_stats_user_id ON user_stats(user_id);
```

### 1.3 Configure Authentication
1. Go to **Authentication > Settings**
2. Configure your site URL (you'll get this from Vercel)
3. Add redirect URLs for your domain
4. Enable email confirmations (optional)

### 1.4 Get API Keys
1. Go to **Settings > API**
2. Copy your **Project URL** and **anon public key**
3. Save these for the frontend configuration

## 🌐 Step 2: Deploy to Vercel

### 2.1 Prepare for Deployment
1. Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
6. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click "Deploy"

### 2.3 Configure Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update Supabase redirect URLs

## 🔧 Step 3: Convert to Next.js (Optional)

For better performance and features, consider converting to Next.js:

### 3.1 Create Next.js Project
```bash
npx create-next-app@latest dopamine-reset-next --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd dopamine-reset-next
```

### 3.2 Install Dependencies
```bash
npm install @supabase/supabase-js chart.js react-chartjs-2
```

### 3.3 Migrate Code
1. Copy your HTML/CSS/JS to Next.js components
2. Convert vanilla JS to React hooks
3. Use Supabase client for data operations
4. Implement proper authentication flow

## 📱 Step 4: Environment Configuration

### 4.1 Frontend Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4.2 Supabase Client Setup
```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## 🔒 Step 5: Security & Performance

### 5.1 Security Headers
Add to `next.config.js`:
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

### 5.2 Performance Optimization
- Enable Vercel Edge Functions for API routes
- Use Supabase Edge Functions for serverless backend
- Implement proper caching strategies
- Optimize images and assets

## 🚀 Step 6: Go Live!

### 6.1 Test Your Deployment
1. Visit your Vercel URL
2. Test user registration/login
3. Create and log habits
4. Verify data persistence
5. Test all features

### 6.2 Monitor Performance
1. Set up Vercel Analytics
2. Monitor Supabase usage
3. Set up error tracking (Sentry)
4. Configure uptime monitoring

## 🔄 Step 7: Continuous Deployment

### 7.1 GitHub Integration
- Push changes to main branch
- Vercel auto-deploys
- Supabase migrations run automatically

### 7.2 Database Migrations
Use Supabase CLI for schema changes:
```bash
supabase db push
```

## 📊 Step 8: Analytics & Monitoring

### 8.1 Vercel Analytics
- Enable in project settings
- Track page views and performance
- Monitor user behavior

### 8.2 Supabase Monitoring
- Monitor database performance
- Track API usage
- Set up alerts for limits

## 🎯 Success Checklist

- [ ] Supabase project created and configured
- [ ] Database schema deployed
- [ ] Authentication working
- [ ] Vercel deployment successful
- [ ] Environment variables configured
- [ ] All features tested
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled
- [ ] Error monitoring set up

## 🆘 Troubleshooting

### Common Issues
1. **CORS Errors**: Check Supabase site URL configuration
2. **Authentication Issues**: Verify redirect URLs
3. **Database Errors**: Check RLS policies
4. **Build Failures**: Verify environment variables

### Support Resources
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Your Dopamine Reset app is now live with a full backend! 🎉**
