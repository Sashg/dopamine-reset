// Authentication System for Dopamine Reset
// Handles user signup, login, session management, and data security

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupAuthEventListeners();
    }

    // Check if user is already logged in
    checkAuthStatus() {
        const token = localStorage.getItem('dopamineReset_token');
        const userData = localStorage.getItem('dopamineReset_user');
        
        if (token && userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isAuthenticated = true;
                this.showAuthenticatedUI();
            } catch (error) {
                this.logout();
            }
        } else {
            this.showLoginUI();
        }
    }

    // Setup event listeners for auth forms
    setupAuthEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Forgot password form
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        if (forgotPasswordForm) {
            forgotPasswordForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        }

        // Switch between auth forms
        const switchToSignup = document.getElementById('switchToSignup');
        if (switchToSignup) {
            switchToSignup.addEventListener('click', () => this.switchAuthForm('signup'));
        }

        const switchToLogin = document.getElementById('switchToLogin');
        if (switchToLogin) {
            switchToLogin.addEventListener('click', () => this.switchAuthForm('login'));
        }

        const switchToForgotPassword = document.getElementById('switchToForgotPassword');
        if (switchToForgotPassword) {
            switchToForgotPassword.addEventListener('click', () => this.switchAuthForm('forgot-password'));
        }
    }

    // Handle user signup
    async handleSignup(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get('signupEmail');
        const password = formData.get('signupPassword');
        const confirmPassword = formData.get('signupConfirmPassword');
        const name = formData.get('signupName');

        // Validation
        if (!this.validateSignup(email, password, confirmPassword, name)) {
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        try {
            // Check if user already exists
            const existingUsers = JSON.parse(localStorage.getItem('dopamineReset_users') || '[]');
            const userExists = existingUsers.find(user => user.email === email);
            
            if (userExists) {
                this.showNotification('User with this email already exists', 'error');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                email: email,
                password: await this.hashPassword(password),
                name: name,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                preferences: {
                    theme: 'light',
                    notifications: true,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }
            };

            // Save user to storage
            existingUsers.push(newUser);
            localStorage.setItem('dopamineReset_users', JSON.stringify(existingUsers));

            // Auto-login after signup
            await this.loginUser(newUser);
            
            this.showNotification('Account created successfully! Welcome to Dopamine Reset!', 'success');
            
        } catch (error) {
            this.showNotification('Error creating account. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Handle user login
    async handleLogin(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get('loginEmail');
        const password = formData.get('loginPassword');

        // Validation
        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging In...';
        submitBtn.disabled = true;

        try {
            // Find user
            const users = JSON.parse(localStorage.getItem('dopamineReset_users') || '[]');
            const user = users.find(u => u.email === email);
            
            if (!user) {
                this.showNotification('User not found. Please check your email or sign up.', 'error');
                return;
            }

            // Verify password
            const isValidPassword = await this.verifyPassword(password, user.password);
            if (!isValidPassword) {
                this.showNotification('Invalid password. Please try again.', 'error');
                return;
            }

            // Login user
            await this.loginUser(user);
            
            this.showNotification(`Welcome back, ${user.name}!`, 'success');
            
        } catch (error) {
            this.showNotification('Error logging in. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Handle forgot password
    async handleForgotPassword(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const email = formData.get('forgotPasswordEmail');

        if (!email) {
            this.showNotification('Please enter your email address', 'error');
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending Reset Link...';
        submitBtn.disabled = true;

        try {
            // Check if user exists
            const users = JSON.parse(localStorage.getItem('dopamineReset_users') || '[]');
            const user = users.find(u => u.email === email);
            
            if (!user) {
                this.showNotification('No account found with this email address', 'error');
                return;
            }

            // In a real app, you'd send an email here
            // For demo purposes, we'll just show a success message
            this.showNotification('Password reset link sent to your email!', 'success');
            
            // Switch back to login form
            setTimeout(() => {
                this.switchAuthForm('login');
            }, 2000);
            
        } catch (error) {
            this.showNotification('Error sending reset link. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    // Login user and setup session
    async loginUser(user) {
        // Update last login
        user.lastLogin = new Date().toISOString();
        
        // Update user in storage
        const users = JSON.parse(localStorage.getItem('dopamineReset_users') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex] = user;
            localStorage.setItem('dopamineReset_users', JSON.stringify(users));
        }

        // Create session
        const token = this.generateToken();
        this.currentUser = user;
        this.isAuthenticated = true;

        // Save session data
        localStorage.setItem('dopamineReset_token', token);
        localStorage.setItem('dopamineReset_user', JSON.stringify(user));

        // Show authenticated UI
        this.showAuthenticatedUI();
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        
        // Clear session data
        localStorage.removeItem('dopamineReset_token');
        localStorage.removeItem('dopamineReset_user');
        
        // Show login UI
        this.showLoginUI();
        
        this.showNotification('Logged out successfully', 'info');
    }

    // Switch between auth forms
    switchAuthForm(formType) {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');

        // Hide all forms
        if (loginForm) loginForm.style.display = 'none';
        if (signupForm) signupForm.style.display = 'none';
        if (forgotPasswordForm) forgotPasswordForm.style.display = 'none';

        // Show selected form
        switch (formType) {
            case 'login':
                if (loginForm) loginForm.style.display = 'block';
                break;
            case 'signup':
                if (signupForm) signupForm.style.display = 'block';
                break;
            case 'forgot-password':
                if (forgotPasswordForm) forgotPasswordForm.style.display = 'block';
                break;
        }
    }

    // Show authenticated UI (main app)
    showAuthenticatedUI() {
        const authContainer = document.getElementById('authContainer');
        const mainApp = document.getElementById('mainApp');
        
        if (authContainer) authContainer.style.display = 'none';
        if (mainApp) mainApp.style.display = 'block';

        // Update user info in header
        this.updateUserInfo();
        
        // Initialize main app if not already done
        if (window.dopamineReset) {
            window.dopamineReset.loadUserData();
        }
    }

    // Show login UI
    showLoginUI() {
        const authContainer = document.getElementById('authContainer');
        const mainApp = document.getElementById('mainApp');
        
        if (authContainer) authContainer.style.display = 'block';
        if (mainApp) mainApp.style.display = 'none';

        // Show login form by default
        this.switchAuthForm('login');
    }

    // Update user info in header
    updateUserInfo() {
        const userInfoElement = document.getElementById('userInfo');
        if (userInfoElement && this.currentUser) {
            userInfoElement.innerHTML = `
                <div class="user-profile">
                    <div class="user-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="user-details">
                        <div class="user-name">${this.currentUser.name}</div>
                        <div class="user-email">${this.currentUser.email}</div>
                    </div>
                    <div class="user-actions">
                        <button class="btn btn-secondary btn-small" onclick="authSystem.showUserSettings()">
                            <i class="fas fa-cog"></i>
                        </button>
                        <button class="btn btn-danger btn-small" onclick="authSystem.logout()">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Show user settings
    showUserSettings() {
        const settingsModal = document.getElementById('userSettingsModal');
        if (settingsModal) {
            // Populate settings with current user data
            document.getElementById('settingsUserName').value = this.currentUser.name;
            document.getElementById('settingsUserEmail').value = this.currentUser.email;
            document.getElementById('settingsTheme').value = this.currentUser.preferences.theme;
            document.getElementById('settingsNotifications').checked = this.currentUser.preferences.notifications;
            
            settingsModal.style.display = 'block';
        }
    }

    // Save user settings
    saveUserSettings() {
        const name = document.getElementById('settingsUserName').value;
        const email = document.getElementById('settingsUserEmail').value;
        const theme = document.getElementById('settingsTheme').value;
        const notifications = document.getElementById('settingsNotifications').checked;

        // Update current user
        this.currentUser.name = name;
        this.currentUser.email = email;
        this.currentUser.preferences.theme = theme;
        this.currentUser.preferences.notifications = notifications;

        // Update in storage
        const users = JSON.parse(localStorage.getItem('dopamineReset_users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = this.currentUser;
            localStorage.setItem('dopamineReset_users', JSON.stringify(users));
        }

        // Update session
        localStorage.setItem('dopamineReset_user', JSON.stringify(this.currentUser));

        // Update UI
        this.updateUserInfo();
        this.closeUserSettings();
        this.showNotification('Settings saved successfully!', 'success');
    }

    // Close user settings
    closeUserSettings() {
        const settingsModal = document.getElementById('userSettingsModal');
        if (settingsModal) {
            settingsModal.style.display = 'none';
        }
    }

    // Validation functions
    validateSignup(email, password, confirmPassword, name) {
        if (!email || !password || !confirmPassword || !name) {
            this.showNotification('Please fill in all fields', 'error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }

        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters long', 'error');
            return false;
        }

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return false;
        }

        if (name.length < 2) {
            this.showNotification('Name must be at least 2 characters long', 'error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password hashing (simplified for demo)
    async hashPassword(password) {
        // In a real app, use proper hashing like bcrypt
        // For demo purposes, we'll use a simple hash
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // Password verification
    async verifyPassword(password, hashedPassword) {
        const hashedInput = await this.hashPassword(password);
        return hashedInput === hashedPassword;
    }

    // Generate simple token
    generateToken() {
        return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Check if user is authenticated
    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    // Show notification
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
}

// Global auth system instance
let authSystem;

// Initialize auth system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    authSystem = new AuthSystem();
    window.authSystem = authSystem; // Make globally accessible
});
