// Dopamine Reset - Habit Tracker
// A comprehensive habit tracking application with analytics and insights

class DopamineReset {
    constructor() {
        this.habits = [];
        this.logs = [];
        this.currentStreak = 0;
        this.bestStreak = 0;
        this.progressChart = null;
        this.currentCalendarMonth = new Date();
        this.isDarkMode = false;
        this.achievements = [];
        this.habitTemplates = [];
        this.init();
    }

    init() {
        // Only initialize if user is authenticated
        if (window.authSystem && window.authSystem.isUserAuthenticated()) {
            this.loadData();
            this.loadHabitTemplates();
            this.loadAchievements();
            this.setupEventListeners();
            this.renderHabits();
            this.updateStats();
            this.updateChart();
            this.generateInsights();
            this.checkDailyReminders();
        }
    }

    // Data Management
    loadData() {
        // Check if user is authenticated
        if (!window.authSystem || !window.authSystem.isUserAuthenticated()) {
            return;
        }

        const currentUser = window.authSystem.getCurrentUser();
        const userId = currentUser.id;

        const savedHabits = localStorage.getItem(`dopamineReset_habits_${userId}`);
        const savedLogs = localStorage.getItem(`dopamineReset_logs_${userId}`);
        const savedStats = localStorage.getItem(`dopamineReset_stats_${userId}`);

        if (savedHabits) {
            this.habits = JSON.parse(savedHabits);
        } else {
            // Load sample habits for demonstration
            this.loadSampleHabits();
        }

        if (savedLogs) {
            this.logs = JSON.parse(savedLogs);
        }

        if (savedStats) {
            const stats = JSON.parse(savedStats);
            this.currentStreak = stats.currentStreak || 0;
            this.bestStreak = stats.bestStreak || 0;
        }
    }

    saveData() {
        if (!window.authSystem || !window.authSystem.isUserAuthenticated()) {
            return;
        }

        const currentUser = window.authSystem.getCurrentUser();
        const userId = currentUser.id;

        localStorage.setItem(`dopamineReset_habits_${userId}`, JSON.stringify(this.habits));
        localStorage.setItem(`dopamineReset_logs_${userId}`, JSON.stringify(this.logs));
        localStorage.setItem(`dopamineReset_stats_${userId}`, JSON.stringify({
            currentStreak: this.currentStreak,
            bestStreak: this.bestStreak
        }));
    }

    // Load user-specific data
    loadUserData() {
        this.loadData();
        this.renderHabits();
        this.updateStats();
        this.updateChart();
        this.generateInsights();
    }

    loadSampleHabits() {
        this.habits = [
            {
                id: 1,
                name: "Morning Exercise",
                category: "health",
                description: "30 minutes of cardio or strength training to start the day energized",
                frequency: "daily",
                reminder: "07:00",
                createdAt: new Date().toISOString(),
                streak: 5,
                totalCompletions: 25,
                successRate: 83
            },
            {
                id: 2,
                name: "Read 30 Minutes",
                category: "learning",
                description: "Read a book or educational content to expand knowledge",
                frequency: "daily",
                reminder: "20:00",
                createdAt: new Date().toISOString(),
                streak: 3,
                totalCompletions: 18,
                successRate: 60
            },
            {
                id: 3,
                name: "Meditation",
                category: "mindfulness",
                description: "10 minutes of mindfulness meditation for mental clarity",
                frequency: "daily",
                reminder: "06:30",
                createdAt: new Date().toISOString(),
                streak: 7,
                totalCompletions: 30,
                successRate: 90
            },
            {
                id: 4,
                name: "Track Expenses",
                category: "finance",
                description: "Log all daily expenses to maintain financial awareness",
                frequency: "daily",
                reminder: "21:00",
                createdAt: new Date().toISOString(),
                streak: 2,
                totalCompletions: 12,
                successRate: 40
            }
        ];

        // Add sample logs for the last 7 days
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            this.habits.forEach(habit => {
                const random = Math.random();
                let status = 'missed';
                if (random > 0.3) status = 'completed';
                else if (random > 0.1) status = 'partial';

                this.logs.push({
                    id: Date.now() + Math.random(),
                    habitId: habit.id,
                    date: dateStr,
                    status: status,
                    notes: status === 'completed' ? 'Feeling great today!' : 'Will try better tomorrow.',
                    difficulty: Math.floor(Math.random() * 5) + 1
                });
            });
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Add habit form
        const addHabitForm = document.getElementById('addHabitForm');
        if (addHabitForm) {
            addHabitForm.addEventListener('submit', (e) => this.handleAddHabit(e));
        }

        // Edit habit form
        const editHabitForm = document.getElementById('editHabitForm');
        if (editHabitForm) {
            editHabitForm.addEventListener('submit', (e) => this.handleEditHabit(e));
        }

        // Log entry form
        const logEntryForm = document.getElementById('logEntryForm');
        if (logEntryForm) {
            logEntryForm.addEventListener('submit', (e) => this.handleLogEntry(e));
        }

        // Modal close events
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        // Add click event listeners for all close buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            }
        });
    }

    // Habit Management
    handleAddHabit(e) {
        e.preventDefault();
        
        // Get form values directly
        const name = document.getElementById('habitName').value;
        const category = document.getElementById('habitCategory').value;
        const description = document.getElementById('habitDescription').value;
        const frequency = document.getElementById('habitFrequency').value;

        // Validation
        if (!name || !category || !frequency) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        const newHabit = {
            id: Date.now(),
            name: name,
            category: category,
            description: description,
            frequency: frequency,
            reminder: null,
            createdAt: new Date().toISOString(),
            streak: 0,
            totalCompletions: 0,
            successRate: 0
        };

        this.habits.push(newHabit);
        this.saveData();
        this.renderHabits();
        this.updateStats();
        this.closeModal('add-habit');
        this.showNotification('Habit added successfully!', 'success');
        e.target.reset();
    }

    handleEditHabit(e) {
        e.preventDefault();
        const habitId = parseInt(document.getElementById('editHabitId').value);
        const habit = this.habits.find(h => h.id === habitId);
        
        if (!habit) return;

        habit.name = document.getElementById('editHabitName').value;
        habit.category = document.getElementById('editHabitCategory').value;
        habit.description = document.getElementById('editHabitDescription').value;
        habit.frequency = document.getElementById('editHabitFrequency').value;
        habit.reminder = null;

        this.saveData();
        this.renderHabits();
        this.closeModal('edit-habit');
        this.showNotification('Habit updated successfully!', 'success');
    }

    handleLogEntry(e) {
        e.preventDefault();
        const habitId = parseInt(document.getElementById('logHabitId').value);
        const status = document.getElementById('logStatus').value;
        const notes = document.getElementById('logNotes').value;
        const difficulty = parseInt(document.getElementById('logDifficulty').value);

        const logEntry = {
            id: Date.now(),
            habitId: habitId,
            date: new Date().toISOString().split('T')[0],
            status: status,
            notes: notes,
            difficulty: difficulty
        };

        this.logs.push(logEntry);
        this.updateHabitStats(habitId, status);
        this.saveData();
        this.renderHabits();
        this.updateStats();
        this.updateChart();
        this.generateInsights();
        this.closeModal('log-entry');
        this.showNotification('Progress logged successfully!', 'success');
        e.target.reset();
    }

    updateHabitStats(habitId, status) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        // Update completion count
        if (status === 'completed') {
            habit.totalCompletions++;
        }

        // Calculate success rate
        const habitLogs = this.logs.filter(log => log.habitId === habitId);
        const completedLogs = habitLogs.filter(log => log.status === 'completed');
        habit.successRate = Math.round((completedLogs.length / habitLogs.length) * 100) || 0;

        // Update streak
        this.updateStreak(habitId);
    }

    updateStreak(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        const today = new Date().toISOString().split('T')[0];
        const habitLogs = this.logs
            .filter(log => log.habitId === habitId)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        let streak = 0;
        let currentDate = new Date(today);

        for (let i = 0; i < 30; i++) { // Check last 30 days
            const dateStr = currentDate.toISOString().split('T')[0];
            const dayLog = habitLogs.find(log => log.date === dateStr);
            
            if (dayLog && dayLog.status === 'completed') {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        habit.streak = streak;
    }

    deleteHabit(habitId) {
        if (confirm('Are you sure you want to delete this habit? This action cannot be undone.')) {
            this.habits = this.habits.filter(h => h.id !== habitId);
            this.logs = this.logs.filter(log => log.habitId !== habitId);
            this.saveData();
            this.renderHabits();
            this.updateStats();
            this.showNotification('Habit deleted successfully!', 'success');
        }
    }

    // Rendering
    renderHabits() {
        const grid = document.getElementById('habitsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        if (this.habits.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-plus-circle"></i>
                    <h3>No habits yet</h3>
                    <p>Start building better habits by adding your first one!</p>
                </div>
            `;
            return;
        }

        this.habits.forEach(habit => {
            const card = this.createHabitCard(habit);
            grid.appendChild(card);
        });

        // Add fade-in animation
        setTimeout(() => {
            const cards = grid.querySelectorAll('.habit-card');
            cards.forEach((card, index) => {
                setTimeout(() => card.classList.add('fade-in'), index * 100);
            });
        }, 100);
    }

    createHabitCard(habit) {
        const card = document.createElement('div');
        card.className = 'habit-card';
        
        const todayLog = this.logs.find(log => 
            log.habitId === habit.id && 
            log.date === new Date().toISOString().split('T')[0]
        );

        const statusIcon = todayLog ? 
            (todayLog.status === 'completed' ? '✅' : 
             todayLog.status === 'partial' ? '🔄' : '❌') : '⏰';

        card.innerHTML = `
            <div class="habit-header">
                <div>
                    <h3 class="habit-title">${habit.name}</h3>
                    <span class="habit-category">${this.getCategoryName(habit.category)}</span>
                </div>
                <div style="font-size: 24px;">${statusIcon}</div>
            </div>
            <p class="habit-description">${habit.description}</p>
            <div class="habit-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${habit.successRate}%"></div>
                </div>
                <div class="progress-text">
                    <span>Success Rate: ${habit.successRate}%</span>
                    <span>Streak: ${habit.streak} days</span>
                </div>
            </div>
            <div class="habit-actions">
                <button class="btn btn-small btn-success" onclick="dopamineReset.logHabit(${habit.id})">
                    <i class="fas fa-check"></i> Log Progress
                </button>
                <button class="btn btn-small btn-secondary" onclick="dopamineReset.editHabit(${habit.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-small btn-danger" onclick="dopamineReset.deleteHabit(${habit.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        return card;
    }

    getCategoryName(category) {
        const categories = {
            health: 'Health & Fitness',
            productivity: 'Productivity',
            learning: 'Learning',
            mindfulness: 'Mindfulness',
            social: 'Social',
            finance: 'Finance',
            creativity: 'Creativity',
            other: 'Other'
        };
        return categories[category] || 'Other';
    }

    // Stats and Analytics
    updateStats() {
        const today = new Date().toISOString().split('T')[0];
        const todayLogs = this.logs.filter(log => log.date === today);
        const completedToday = todayLogs.filter(log => log.status === 'completed').length;
        
        // Calculate overall success rate
        const totalLogs = this.logs.length;
        const totalCompleted = this.logs.filter(log => log.status === 'completed').length;
        const successRate = totalLogs > 0 ? Math.round((totalCompleted / totalLogs) * 100) : 0;

        // Update streak
        this.calculateCurrentStreak();

        // Update DOM
        document.getElementById('totalHabits').textContent = this.habits.length;
        document.getElementById('completedToday').textContent = completedToday;
        document.getElementById('successRate').textContent = successRate + '%';
        document.getElementById('currentStreak').textContent = this.currentStreak;
        document.getElementById('bestStreak').textContent = this.bestStreak;
    }

    calculateCurrentStreak() {
        const today = new Date().toISOString().split('T')[0];
        let streak = 0;
        let currentDate = new Date(today);

        for (let i = 0; i < 30; i++) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const dayLogs = this.logs.filter(log => log.date === dateStr);
            
            if (dayLogs.length > 0 && dayLogs.some(log => log.status === 'completed')) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        this.currentStreak = streak;
        if (streak > this.bestStreak) {
            this.bestStreak = streak;
        }
    }

    updateChart() {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.progressChart) {
            this.progressChart.destroy();
        }

        // Get last 7 days data
        const labels = [];
        const data = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
            
            const dayLogs = this.logs.filter(log => log.date === dateStr);
            const completedLogs = dayLogs.filter(log => log.status === 'completed');
            const completionRate = dayLogs.length > 0 ? (completedLogs.length / dayLogs.length) * 100 : 0;
            data.push(Math.round(completionRate));
        }

        this.progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Completion Rate (%)',
                    data: data,
                    borderColor: '#2e75cc',
                    backgroundColor: 'rgba(46, 117, 204, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // AI Insights
    generateInsights() {
        const insights = [];
        const insightsList = document.getElementById('insightsList');
        if (!insightsList) return;

        // Analyze patterns
        const totalLogs = this.logs.length;
        const completedLogs = this.logs.filter(log => log.status === 'completed');
        const completionRate = totalLogs > 0 ? (completedLogs.length / totalLogs) * 100 : 0;

        // Streak insight
        if (this.currentStreak > 0) {
            insights.push({
                title: '🔥 Great Streak!',
                text: `You're on a ${this.currentStreak}-day streak! Keep up the momentum.`
            });
        }

        // Success rate insight
        if (completionRate >= 80) {
            insights.push({
                title: '🎯 High Performer',
                text: `Your ${Math.round(completionRate)}% success rate shows excellent consistency!`
            });
        } else if (completionRate >= 60) {
            insights.push({
                title: '📈 Good Progress',
                text: `Your ${Math.round(completionRate)}% success rate is solid. Small improvements add up!`
            });
        } else {
            insights.push({
                title: '💪 Room for Growth',
                text: `Your ${Math.round(completionRate)}% success rate. Consider adjusting habit difficulty or timing.`
            });
        }

        // Category analysis
        const categoryStats = {};
        this.habits.forEach(habit => {
            const habitLogs = this.logs.filter(log => log.habitId === habit.id);
            const completedHabitLogs = habitLogs.filter(log => log.status === 'completed');
            const habitRate = habitLogs.length > 0 ? (completedHabitLogs.length / habitLogs.length) * 100 : 0;
            
            if (!categoryStats[habit.category]) {
                categoryStats[habit.category] = { total: 0, completed: 0 };
            }
            categoryStats[habit.category].total += habitLogs.length;
            categoryStats[habit.category].completed += completedHabitLogs.length;
        });

        // Find best and worst categories
        let bestCategory = null;
        let worstCategory = null;
        let bestRate = 0;
        let worstRate = 100;

        Object.entries(categoryStats).forEach(([category, stats]) => {
            const rate = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;
            if (rate > bestRate) {
                bestRate = rate;
                bestCategory = category;
            }
            if (rate < worstRate) {
                worstRate = rate;
                worstCategory = category;
            }
        });

        if (bestCategory && bestRate > 70) {
            insights.push({
                title: '⭐ Strong Category',
                text: `You excel in ${this.getCategoryName(bestCategory)} (${Math.round(bestRate)}% success).`
            });
        }

        if (worstCategory && worstRate < 50) {
            insights.push({
                title: '🎯 Focus Area',
                text: `Consider adjusting your ${this.getCategoryName(worstCategory)} habits (${Math.round(worstRate)}% success).`
            });
        }

        // Render insights
        insightsList.innerHTML = '';
        insights.slice(0, 4).forEach(insight => {
            const li = document.createElement('li');
            li.className = 'insight-item';
            li.innerHTML = `
                <div class="insight-title">${insight.title}</div>
                <div class="insight-text">${insight.text}</div>
            `;
            insightsList.appendChild(li);
        });
    }

    // Modal Management
    openModal(type) {
        this.closeAllModals();
        const modal = document.getElementById(type + 'Modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeModal(type) {
        const modal = document.getElementById(type + 'Modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.style.display = 'none');
    }

    // Action Handlers
    logHabit(habitId) {
        document.getElementById('logHabitId').value = habitId;
        this.openModal('log-entry');
    }

    editHabit(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;

        document.getElementById('editHabitId').value = habit.id;
        document.getElementById('editHabitName').value = habit.name;
        document.getElementById('editHabitCategory').value = habit.category;
        document.getElementById('editHabitDescription').value = habit.description;
        document.getElementById('editHabitFrequency').value = habit.frequency;
        document.getElementById('editHabitReminder').value = habit.reminder || '';

        this.openModal('edit-habit');
    }

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#2196f3'};
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Daily Reminders
    checkDailyReminders() {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        
        this.habits.forEach(habit => {
            if (habit.reminder && habit.reminder === currentTime) {
                this.showNotification(`Time for: ${habit.name}`, 'info');
            }
        });
    }

    // Habit Templates
    loadHabitTemplates() {
        this.habitTemplates = [
            {
                id: 1,
                name: "Morning Exercise",
                category: "health",
                description: "30 minutes of cardio or strength training to boost energy",
                frequency: "daily",
                reminder: "07:00"
            },
            {
                id: 2,
                name: "Daily Reading",
                category: "learning",
                description: "Read for 30 minutes to expand knowledge and vocabulary",
                frequency: "daily",
                reminder: "20:00"
            },
            {
                id: 3,
                name: "Meditation",
                category: "mindfulness",
                description: "10 minutes of mindfulness meditation for mental clarity",
                frequency: "daily",
                reminder: "06:30"
            },
            {
                id: 4,
                name: "Drink Water",
                category: "health",
                description: "Drink 8 glasses of water throughout the day",
                frequency: "daily",
                reminder: "09:00"
            },
            {
                id: 5,
                name: "Practice Gratitude",
                category: "mindfulness",
                description: "Write down 3 things you're grateful for each day",
                frequency: "daily",
                reminder: "21:30"
            },
            {
                id: 6,
                name: "Learn New Language",
                category: "learning",
                description: "Practice a new language for 15 minutes daily",
                frequency: "daily",
                reminder: "19:00"
            },
            {
                id: 7,
                name: "Weekly Budget Review",
                category: "finance",
                description: "Review and plan your weekly budget and expenses",
                frequency: "weekly",
                reminder: "09:00"
            },
            {
                id: 8,
                name: "Creative Writing",
                category: "creativity",
                description: "Write in a journal or work on creative projects",
                frequency: "daily",
                reminder: "18:00"
            }
        ];
    }

    showHabitTemplates() {
        const grid = document.getElementById('templatesGrid');
        if (!grid) return;

        grid.innerHTML = '';
        this.habitTemplates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.onclick = () => this.useTemplate(template);
            card.innerHTML = `
                <div class="template-title">${template.name}</div>
                <div class="template-description">${template.description}</div>
                <div class="template-category">${this.getCategoryName(template.category)}</div>
            `;
            grid.appendChild(card);
        });
    }

    useTemplate(template) {
        // Pre-fill the add habit form with template data
        document.getElementById('habitName').value = template.name;
        document.getElementById('habitCategory').value = template.category;
        document.getElementById('habitDescription').value = template.description;
        document.getElementById('habitFrequency').value = template.frequency;
        document.getElementById('habitReminder').value = template.reminder;
        
        this.closeModal('habit-templates');
        this.openModal('add-habit');
    }

    // Achievements System
    loadAchievements() {
        this.achievements = [
            {
                id: 1,
                title: "First Step",
                description: "Complete your first habit",
                icon: "🎯",
                condition: (habits, logs) => logs.filter(log => log.status === 'completed').length >= 1,
                unlocked: false
            },
            {
                id: 2,
                title: "Week Warrior",
                description: "Maintain a 7-day streak",
                icon: "🔥",
                condition: (habits, logs) => this.currentStreak >= 7,
                unlocked: false
            },
            {
                id: 3,
                title: "Habit Master",
                description: "Create 5 different habits",
                icon: "🏆",
                condition: (habits, logs) => habits.length >= 5,
                unlocked: false
            },
            {
                id: 4,
                title: "Consistency King",
                description: "Achieve 80% success rate",
                icon: "👑",
                condition: (habits, logs) => {
                    const totalLogs = logs.length;
                    const completedLogs = logs.filter(log => log.status === 'completed').length;
                    return totalLogs > 0 && (completedLogs / totalLogs) >= 0.8;
                },
                unlocked: false
            },
            {
                id: 5,
                title: "Month Champion",
                description: "Maintain a 30-day streak",
                icon: "🏅",
                condition: (habits, logs) => this.currentStreak >= 30,
                unlocked: false
            },
            {
                id: 6,
                title: "Habit Collector",
                description: "Complete 100 habits total",
                icon: "💎",
                condition: (habits, logs) => logs.filter(log => log.status === 'completed').length >= 100,
                unlocked: false
            }
        ];
    }

    checkAchievements() {
        let newAchievements = 0;
        this.achievements.forEach(achievement => {
            const wasUnlocked = achievement.unlocked;
            achievement.unlocked = achievement.condition(this.habits, this.logs);
            if (achievement.unlocked && !wasUnlocked) {
                newAchievements++;
                this.showNotification(`Achievement unlocked: ${achievement.title}! ${achievement.icon}`, 'success');
            }
        });
        return newAchievements;
    }

    showAchievements() {
        const grid = document.getElementById('achievementsGrid');
        if (!grid) return;

        grid.innerHTML = '';
        this.achievements.forEach(achievement => {
            const card = document.createElement('div');
            card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : ''}`;
            card.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
            `;
            grid.appendChild(card);
        });
    }

    // Calendar View
    showCalendar() {
        this.updateCalendarHeader();
        this.renderCalendar();
    }

    updateCalendarHeader() {
        const monthElement = document.getElementById('calendarMonth');
        if (monthElement) {
            const monthName = this.currentCalendarMonth.toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
            });
            monthElement.textContent = monthName;
        }
    }

    changeMonth(direction) {
        this.currentCalendarMonth.setMonth(this.currentCalendarMonth.getMonth() + direction);
        this.showCalendar();
    }

    renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        if (!grid) return;

        grid.innerHTML = '';

        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = day;
            grid.appendChild(header);
        });

        // Get first day of month and number of days
        const year = this.currentCalendarMonth.getFullYear();
        const month = this.currentCalendarMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Add empty cells for days before the first day of month
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            grid.appendChild(emptyDay);
        }

        // Add days of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            const currentDate = new Date(year, month, day);
            const dateString = currentDate.toISOString().split('T')[0];
            
            dayElement.className = 'calendar-day';
            if (currentDate.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }

            const dayNumber = document.createElement('div');
            dayNumber.className = 'calendar-day-number';
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);

            // Add habit indicators
            const habitsContainer = document.createElement('div');
            habitsContainer.className = 'calendar-habits';
            
            const dayLogs = this.logs.filter(log => log.date === dateString);
            dayLogs.forEach(log => {
                const dot = document.createElement('div');
                dot.className = `calendar-habit-dot ${log.status}`;
                habitsContainer.appendChild(dot);
            });

            dayElement.appendChild(habitsContainer);
            grid.appendChild(dayElement);
        }
    }

    // Dark Mode
    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        document.body.classList.toggle('dark-mode', this.isDarkMode);
        
        // Save preference
        if (window.authSystem && window.authSystem.isUserAuthenticated()) {
            const currentUser = window.authSystem.getCurrentUser();
            currentUser.preferences.theme = this.isDarkMode ? 'dark' : 'light';
            localStorage.setItem('dopamineReset_user', JSON.stringify(currentUser));
        }

        this.showNotification(`Switched to ${this.isDarkMode ? 'dark' : 'light'} mode`, 'info');
    }

    // Data Export
    exportData(format) {
        if (format === 'csv') {
            this.exportCSV();
        } else if (format === 'pdf') {
            this.exportPDF();
        }
    }

    exportCSV() {
        const csvContent = this.generateCSV();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'dopamine-reset-habits.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('CSV exported successfully!', 'success');
        this.closeModal('export');
    }

    generateCSV() {
        let csv = 'Date,Habit,Category,Status,Notes,Difficulty\n';
        
        this.logs.forEach(log => {
            const habit = this.habits.find(h => h.id === log.habitId);
            if (habit) {
                const row = [
                    log.date,
                    `"${habit.name}"`,
                    habit.category,
                    log.status,
                    `"${log.notes || ''}"`,
                    log.difficulty || ''
                ].join(',');
                csv += row + '\n';
            }
        });
        
        return csv;
    }

    exportPDF() {
        // For demo purposes, we'll show a message
        // In a real app, you'd use a library like jsPDF
        this.showNotification('PDF export feature coming soon!', 'info');
        this.closeModal('export');
    }

    // Enhanced Modal Management
    openModal(type) {
        this.closeAllModals();
        let modalId = type;
        
        // Handle different modal types
        switch(type) {
            case 'habit-templates':
                modalId = 'habitTemplatesModal';
                this.showHabitTemplates();
                break;
            case 'calendar':
                modalId = 'calendarModal';
                this.showCalendar();
                break;
            case 'achievements':
                modalId = 'achievementsModal';
                this.showAchievements();
                break;
            case 'export':
                modalId = 'exportModal';
                break;
            case 'add-habit':
                modalId = 'addHabitModal';
                break;
            case 'edit-habit':
                modalId = 'editHabitModal';
                break;
            case 'log-entry':
                modalId = 'logEntryModal';
                break;
        }
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeModal(type) {
        let modalId = type;
        
        // Handle different modal types
        switch(type) {
            case 'habit-templates':
                modalId = 'habitTemplatesModal';
                break;
            case 'calendar':
                modalId = 'calendarModal';
                break;
            case 'achievements':
                modalId = 'achievementsModal';
                break;
            case 'export':
                modalId = 'exportModal';
                break;
            case 'add-habit':
                modalId = 'addHabitModal';
                break;
            case 'edit-habit':
                modalId = 'editHabitModal';
                break;
            case 'log-entry':
                modalId = 'logEntryModal';
                break;
        }
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Enhanced habit logging with achievements check
    handleLogEntry(e) {
        e.preventDefault();
        const habitId = parseInt(document.getElementById('logHabitId').value);
        const status = document.getElementById('logStatus').value;
        const notes = document.getElementById('logNotes').value;
        const difficulty = parseInt(document.getElementById('logDifficulty').value);

        const logEntry = {
            id: Date.now(),
            habitId: habitId,
            date: new Date().toISOString().split('T')[0],
            status: status,
            notes: notes,
            difficulty: difficulty
        };

        this.logs.push(logEntry);
        this.updateHabitStats(habitId, status);
        this.checkAchievements(); // Check for new achievements
        this.saveData();
        this.renderHabits();
        this.updateStats();
        this.updateChart();
        this.generateInsights();
        this.closeModal('log-entry');
        this.showNotification('Progress logged successfully!', 'success');
        e.target.reset();
    }

    // Utility Functions
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

// Global functions for backward compatibility
function openModal(type) {
    console.log('openModal called with type:', type);
    if (window.dopamineReset) {
        console.log('dopamineReset exists, calling openModal');
        dopamineReset.openModal(type);
    } else {
        console.error('dopamineReset not found');
        // Fallback: try to open modal directly
        let modalId = type + 'Modal';
        if (type === 'add-habit') modalId = 'addHabitModal';
        if (type === 'edit-habit') modalId = 'editHabitModal';
        if (type === 'log-entry') modalId = 'logEntryModal';
        if (type === 'habit-templates') modalId = 'habitTemplatesModal';
        if (type === 'calendar') modalId = 'calendarModal';
        if (type === 'achievements') modalId = 'achievementsModal';
        if (type === 'export') modalId = 'exportModal';
        
        const modal = document.getElementById(modalId);
        if (modal) {
            console.log('Opening modal directly:', modalId);
            modal.style.display = 'block';
        } else {
            console.error('Modal not found:', modalId);
        }
    }
}

function closeModal(type) {
    console.log('closeModal called with type:', type);
    if (window.dopamineReset) {
        dopamineReset.closeModal(type);
    } else {
        // Fallback: close modal directly
        let modalId = type + 'Modal';
        if (type === 'add-habit') modalId = 'addHabitModal';
        if (type === 'edit-habit') modalId = 'editHabitModal';
        if (type === 'log-entry') modalId = 'logEntryModal';
        if (type === 'habit-templates') modalId = 'habitTemplatesModal';
        if (type === 'calendar') modalId = 'calendarModal';
        if (type === 'achievements') modalId = 'achievementsModal';
        if (type === 'export') modalId = 'exportModal';
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Initialize the application
let dopamineReset;
document.addEventListener('DOMContentLoaded', function() {
    // Wait for auth system to initialize
    setTimeout(() => {
        dopamineReset = new DopamineReset();
        window.dopamineReset = dopamineReset; // Make globally accessible
        
        // Check for reminders every minute
        setInterval(() => {
            if (dopamineReset) {
                dopamineReset.checkDailyReminders();
            }
        }, 60000);
    }, 100);
});
