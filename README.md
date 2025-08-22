# 🧠 Dopamine Reset - Habit Tracker

A beautiful, modern habit tracking application inspired by Playground's design aesthetic. Track your habits, build better routines, and understand what works for you.

## ✨ Features

### 🎯 Core Functionality
- **Habit Management**: Add, edit, and delete habits with categories
- **Daily Logging**: Log your progress with status, notes, and difficulty
- **Progress Tracking**: Visual progress bars and success rates
- **Streak Counter**: Track your current and best streaks
- **Analytics**: Weekly progress charts and insights

### 🎨 Design Features
- **Playground-Inspired**: Clean, modern UI with beautiful gradients
- **Custom Modals**: Beautifully styled forms and dialogs
- **Responsive Design**: Works perfectly on desktop and mobile
- **Dark Mode Ready**: Theme switching capability
- **Smooth Animations**: Delightful micro-interactions

### 🚀 Advanced Features
- **User Authentication**: Sign up, login, and user management
- **Habit Templates**: Pre-built habit suggestions
- **Calendar View**: Monthly habit tracking calendar
- **Achievements**: Gamified progress with badges
- **Data Export**: Export your data as CSV or PDF
- **Real-time Sync**: Data persists across sessions

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript ES6+** - Vanilla JS with modern features
- **Chart.js** - Beautiful data visualization
- **Font Awesome** - Icon library

### Backend (Planned)
- **Next.js** - React framework
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Vercel** - Deployment platform

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs in the browser!

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/dopamine-reset.git
   cd dopamine-reset
   ```

2. Open `index1.html` in your browser:
   ```bash
   open index1.html
   ```

3. Create an account and start tracking your habits!

## 📱 Usage

### Creating Habits
1. Click "Add Habit" button
2. Fill in habit name, category, description, and frequency
3. Click "Add Habit" to save

### Logging Progress
1. Click "Log Progress" on any habit card
2. Select your status (Completed, Partially Done, Missed)
3. Add optional notes and difficulty level
4. Click "Log Entry" to save

### Viewing Analytics
- **Dashboard**: See your overall stats and current streak
- **Charts**: Weekly progress visualization
- **Insights**: AI-generated recommendations
- **Calendar**: Monthly habit tracking view

## 🎨 Design Philosophy

Inspired by [Playground](https://playground.com/), this app features:
- **Clean Typography**: Bold headings with tight letter spacing
- **Vibrant Gradients**: Coral to teal color transitions
- **Generous Spacing**: 8px grid system throughout
- **Modern Shadows**: Subtle elevation and depth
- **Smooth Animations**: 0.3s transitions for interactions
- **Rounded Design**: 16px border radius for friendly feel

## 🔧 Customization

### Colors
The app uses CSS custom properties for easy theming:
```css
:root {
  --primary: #ff6b6b;
  --secondary: #4ecdc4;
  --background: #fafafa;
  --text: #1a1a1a;
}
```

### Adding New Categories
Edit the select options in the HTML to add custom habit categories.

## 📊 Data Structure

### Habit Object
```javascript
{
  id: number,
  name: string,
  category: string,
  description: string,
  frequency: 'daily' | 'weekly' | 'monthly',
  createdAt: string,
  streak: number,
  totalCompletions: number,
  successRate: number
}
```

### Log Entry Object
```javascript
{
  id: number,
  habitId: number,
  date: string,
  status: 'completed' | 'partial' | 'missed',
  notes: string,
  difficulty: number
}
```

## 🚀 Deployment

### Vercel + Supabase (Recommended)
1. **Frontend**: Deploy to Vercel
2. **Backend**: Set up Supabase project
3. **Database**: Configure PostgreSQL tables
4. **Auth**: Enable Supabase Auth

### Manual Deployment
1. Upload files to any web hosting service
2. Configure environment variables
3. Set up database (if using backend)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Playground** for design inspiration
- **Chart.js** for beautiful data visualization
- **Font Awesome** for icons
- **Inter** font family for typography

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Made with ❤️ for better habits and a better life**
