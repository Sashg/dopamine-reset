// Enhanced JavaScript for AI Content Marketplace

class AIContentMarketplace {
    constructor() {
        this.contentData = [];
        this.currentUser = null;
        this.cart = [];
        this.notifications = [];
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderContent();
        this.setupSearchSuggestions();
        this.initializeAI();
    }

    loadSampleData() {
        this.contentData = [
            {
                id: 1,
                title: "AI-Powered Marketing Strategies",
                description: "Comprehensive guide to implementing AI in modern marketing campaigns with real-world examples and case studies.",
                category: "article",
                price: 29.99,
                rating: 4.8,
                aiScore: 95,
                image: "📊",
                tags: ["marketing", "AI", "strategy"],
                author: "AI Content Creator",
                downloads: 1247,
                createdAt: "2024-01-15"
            },
            {
                id: 2,
                title: "Neural Network Visualization",
                description: "Beautiful infographic showing the inner workings of neural networks with interactive elements.",
                category: "image",
                price: 15.99,
                rating: 4.6,
                aiScore: 88,
                image: "🧠",
                tags: ["neural networks", "visualization", "AI"],
                author: "DataViz Pro",
                downloads: 892,
                createdAt: "2024-01-10"
            },
            {
                id: 3,
                title: "Machine Learning Tutorial Series",
                description: "Complete video series covering machine learning fundamentals from beginner to advanced concepts.",
                category: "video",
                price: 49.99,
                rating: 4.9,
                aiScore: 92,
                image: "🎥",
                tags: ["machine learning", "tutorial", "education"],
                author: "ML Academy",
                downloads: 2156,
                createdAt: "2024-01-05"
            },
            {
                id: 4,
                title: "AI Chatbot Framework",
                description: "Open-source framework for building intelligent chatbots with natural language processing capabilities.",
                category: "code",
                price: 0,
                rating: 4.7,
                aiScore: 91,
                image: "🤖",
                tags: ["chatbot", "NLP", "framework"],
                author: "OpenAI Community",
                downloads: 3421,
                createdAt: "2024-01-12"
            },
            {
                id: 5,
                title: "Data Science Podcast",
                description: "Weekly podcast covering the latest trends in data science and artificial intelligence.",
                category: "audio",
                price: 9.99,
                rating: 4.5,
                aiScore: 87,
                image: "🎧",
                tags: ["podcast", "data science", "AI trends"],
                author: "DataCast Network",
                downloads: 567,
                createdAt: "2024-01-08"
            },
            {
                id: 6,
                title: "Computer Vision API",
                description: "RESTful API for image recognition and computer vision tasks with pre-trained models.",
                category: "code",
                price: 39.99,
                rating: 4.8,
                aiScore: 94,
                image: "👁️",
                tags: ["computer vision", "API", "image recognition"],
                author: "VisionTech",
                downloads: 1789,
                createdAt: "2024-01-20"
            }
        ];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
        }

        // Filter functionality
        const filterElements = ['categoryFilter', 'priceFilter', 'aiScoreFilter'];
        filterElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => this.applyFilters());
            }
        });

        // Form submissions
        const uploadForm = document.getElementById('uploadForm');
        if (uploadForm) {
            uploadForm.addEventListener('submit', (e) => this.handleUpload(e));
        }

        const aiGeneratorForm = document.getElementById('aiGeneratorForm');
        if (aiGeneratorForm) {
            aiGeneratorForm.addEventListener('submit', (e) => this.handleAIGeneration(e));
        }

        // Modal close events
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });
    }

    renderContent(data = this.contentData) {
        const grid = document.getElementById('contentGrid');
        if (!grid) return;

        grid.innerHTML = '';
        
        data.forEach(item => {
            const card = this.createContentCard(item);
            grid.appendChild(card);
        });

        // Add fade-in animation
        setTimeout(() => {
            const cards = grid.querySelectorAll('.content-card');
            cards.forEach((card, index) => {
                setTimeout(() => card.classList.add('fade-in'), index * 100);
            });
        }, 100);
    }

    createContentCard(item) {
        const card = document.createElement('div');
        card.className = 'content-card hover-lift';
        card.innerHTML = `
            <div class="ai-score-badge">AI: ${item.aiScore}%</div>
            <div class="content-image">${item.image}</div>
            <div class="category-tag ${item.category}">${item.category}</div>
            <h3 class="content-title">${item.title}</h3>
            <p class="content-description">${item.description}</p>
            <div class="content-meta">
                <div class="content-price">${item.price === 0 ? 'Free' : '$' + item.price}</div>
                <div class="content-rating">
                    <i class="fas fa-star"></i>
                    <span>${item.rating}</span>
                </div>
            </div>
            <div class="content-actions">
                <button class="btn btn-primary" onclick="marketplace.purchaseContent(${item.id})">
                    ${item.price === 0 ? 'Download' : 'Purchase'}
                </button>
                <button class="btn btn-secondary" onclick="marketplace.viewDetails(${item.id})">
                    Details
                </button>
            </div>
        `;
        return card;
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.hideSearchSuggestions();
            return;
        }

        const suggestions = this.getSearchSuggestions(query);
        this.showSearchSuggestions(suggestions);
    }

    getSearchSuggestions(query) {
        const suggestions = [];
        const queryLower = query.toLowerCase();

        // Search in titles, descriptions, and tags
        this.contentData.forEach(item => {
            if (item.title.toLowerCase().includes(queryLower) ||
                item.description.toLowerCase().includes(queryLower) ||
                item.tags.some(tag => tag.toLowerCase().includes(queryLower))) {
                suggestions.push({
                    text: item.title,
                    category: item.category,
                    id: item.id
                });
            }
        });

        return suggestions.slice(0, 5); // Limit to 5 suggestions
    }

    showSearchSuggestions(suggestions) {
        let suggestionsContainer = document.querySelector('.search-suggestions');
        if (!suggestionsContainer) {
            suggestionsContainer = document.createElement('div');
            suggestionsContainer.className = 'search-suggestions';
            document.querySelector('.search-bar').appendChild(suggestionsContainer);
        }

        suggestionsContainer.innerHTML = '';
        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = `
                <div style="font-weight: 500;">${suggestion.text}</div>
                <div style="font-size: 12px; color: #666;">${suggestion.category}</div>
            `;
            item.addEventListener('click', () => {
                document.getElementById('searchInput').value = suggestion.text;
                this.hideSearchSuggestions();
                this.performSearch();
            });
            suggestionsContainer.appendChild(item);
        });
    }

    hideSearchSuggestions() {
        const suggestionsContainer = document.querySelector('.search-suggestions');
        if (suggestionsContainer) {
            suggestionsContainer.remove();
        }
    }

    performSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const filtered = this.contentData.filter(item => 
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        this.renderContent(filtered);
        this.showNotification(`Found ${filtered.length} results for "${searchTerm}"`, 'info');
    }

    applyFilters() {
        const category = document.getElementById('categoryFilter').value;
        const price = document.getElementById('priceFilter').value;
        const aiScore = document.getElementById('aiScoreFilter').value;

        let filtered = this.contentData;

        if (category) {
            filtered = filtered.filter(item => item.category === category);
        }

        if (price === 'free') {
            filtered = filtered.filter(item => item.price === 0);
        } else if (price === 'paid') {
            filtered = filtered.filter(item => item.price > 0);
        }

        if (aiScore === 'high') {
            filtered = filtered.filter(item => item.aiScore >= 90);
        } else if (aiScore === 'medium') {
            filtered = filtered.filter(item => item.aiScore >= 70 && item.aiScore < 90);
        } else if (aiScore === 'low') {
            filtered = filtered.filter(item => item.aiScore < 70);
        }

        this.renderContent(filtered);
        this.showNotification(`Showing ${filtered.length} filtered results`, 'info');
    }

    purchaseContent(id) {
        const item = this.contentData.find(item => item.id === id);
        if (!item) return;

        if (item.price === 0) {
            this.downloadContent(item);
        } else {
            this.processPurchase(item);
        }
    }

    downloadContent(item) {
        this.showNotification(`Downloading "${item.title}"...`, 'success');
        // Simulate download process
        setTimeout(() => {
            this.showNotification(`"${item.title}" downloaded successfully!`, 'success');
            item.downloads++;
        }, 1500);
    }

    processPurchase(item) {
        this.showNotification(`Processing purchase for "${item.title}" - $${item.price}`, 'info');
        // Simulate payment process
        setTimeout(() => {
            this.showNotification(`Purchase successful! "${item.title}" is now available for download.`, 'success');
            item.downloads++;
        }, 2000);
    }

    viewDetails(id) {
        const item = this.contentData.find(item => item.id === id);
        if (!item) return;

        const details = `
            <h3>${item.title}</h3>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>AI Quality Score:</strong> ${item.aiScore}%</p>
            <p><strong>Rating:</strong> ${item.rating}/5 ⭐</p>
            <p><strong>Price:</strong> ${item.price === 0 ? 'Free' : '$' + item.price}</p>
            <p><strong>Downloads:</strong> ${item.downloads}</p>
            <p><strong>Author:</strong> ${item.author}</p>
            <p><strong>Created:</strong> ${item.createdAt}</p>
            <p><strong>Tags:</strong> ${item.tags.join(', ')}</p>
            <p><strong>Description:</strong> ${item.description}</p>
        `;

        this.showModal('Content Details', details);
    }

    handleUpload(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        this.showNotification('Uploading content...', 'info');
        
        // Simulate upload process
        setTimeout(() => {
            const newContent = {
                id: this.contentData.length + 1,
                title: formData.get('title') || 'Untitled Content',
                description: formData.get('description') || 'No description provided',
                category: formData.get('category') || 'article',
                price: parseFloat(formData.get('price')) || 0,
                rating: 0,
                aiScore: Math.floor(Math.random() * 30) + 70, // Random AI score between 70-100
                image: this.getCategoryIcon(formData.get('category')),
                tags: [],
                author: 'You',
                downloads: 0,
                createdAt: new Date().toISOString().split('T')[0]
            };

            this.contentData.unshift(newContent);
            this.renderContent();
            this.closeModal('upload');
            this.showNotification('Content uploaded successfully! It will be reviewed by our AI system.', 'success');
            e.target.reset();
        }, 2000);
    }

    handleAIGeneration(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const prompt = formData.get('prompt');
        const type = formData.get('type');
        const style = formData.get('style');

        this.showNotification(`Generating ${type} content with AI...`, 'info');
        this.showAIGenerationProgress();

        // Simulate AI generation process
        setTimeout(() => {
            this.hideAIGenerationProgress();
            this.showNotification(`AI content generated successfully!`, 'success');
            this.closeModal('ai-generator');
            e.target.reset();
        }, 3000);
    }

    showAIGenerationProgress() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'ai-progress';
        progressContainer.innerHTML = `
            <h4>AI Generation in Progress...</h4>
            <div class="progress-bar">
                <div class="progress-fill" id="aiProgressFill"></div>
            </div>
            <p>Analyzing prompt and generating content...</p>
        `;

        const modalContent = document.querySelector('#aiGeneratorModal .modal-content');
        modalContent.appendChild(progressContainer);

        // Animate progress bar
        let progress = 0;
        const progressFill = document.getElementById('aiProgressFill');
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            progressFill.style.width = progress + '%';
        }, 200);
    }

    hideAIGenerationProgress() {
        const progressContainer = document.querySelector('.ai-progress');
        if (progressContainer) {
            progressContainer.remove();
        }
    }

    getCategoryIcon(category) {
        const icons = {
            article: '📄',
            image: '🖼️',
            video: '🎥',
            audio: '🎧',
            code: '💻'
        };
        return icons[category] || '📄';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div style="line-height: 1.6;">
                    ${content}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
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

    setupSearchSuggestions() {
        // Add click outside listener to hide suggestions
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-bar')) {
                this.hideSearchSuggestions();
            }
        });
    }

    initializeAI() {
        // Initialize AI features
        console.log('AI Content Marketplace initialized with advanced features');
    }
}

// Global functions for backward compatibility
function openModal(type) {
    marketplace.closeAllModals();
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(type) {
    marketplace.closeModal(type);
}

function searchContent() {
    marketplace.performSearch();
}

function applyFilters() {
    marketplace.applyFilters();
}

function purchaseContent(id) {
    marketplace.purchaseContent(id);
}

function viewDetails(id) {
    marketplace.viewDetails(id);
}

function showProfile() {
    marketplace.showNotification('Profile page would open here with user dashboard, earnings, and content management.', 'info');
}

// Initialize the marketplace when DOM is loaded
let marketplace;
document.addEventListener('DOMContentLoaded', function() {
    marketplace = new AIContentMarketplace();
});
