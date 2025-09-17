// UI Manager for Zerava Language Translator
class ZeravaUI {
    constructor() {
        this.vocabularyData = [];
        this.filteredVocabulary = [];
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.currentFilter = '';
        this.currentSearch = '';
        this.init();
    }

    init() {
        this.loadVocabularyData();
        this.bindVocabularyEvents();
        this.setupKeyboardShortcuts();
        this.initializeTooltips();
        this.displayVocabulary();
    }

    loadVocabularyData() {
        // Convert vocabulary object to array for easier manipulation
        this.vocabularyData = Object.keys(zeravaVocabulary).map(zerava => ({
            zerava,
            bengali: zeravaVocabulary[zerava].bengali,
            english: zeravaVocabulary[zerava].english,
            category: zeravaVocabulary[zerava].category
        }));
        
        this.filteredVocabulary = [...this.vocabularyData];
    }

    bindVocabularyEvents() {
        // Search functionality
        const vocabSearch = document.getElementById('vocabSearch');
        vocabSearch.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.filterVocabulary();
        });

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
            this.filterVocabulary();
        });

        // Pagination
        document.getElementById('vocabPrevBtn').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.displayVocabulary();
            }
        });

        document.getElementById('vocabNextBtn').addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredVocabulary.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.displayVocabulary();
            }
        });
    }

    filterVocabulary() {
        this.filteredVocabulary = this.vocabularyData.filter(item => {
            const matchesSearch = !this.currentSearch || 
                item.zerava.toLowerCase().includes(this.currentSearch) ||
                item.bengali.toLowerCase().includes(this.currentSearch) ||
                item.english.toLowerCase().includes(this.currentSearch);
            
            const matchesCategory = !this.currentFilter || 
                item.category === this.currentFilter;
            
            return matchesSearch && matchesCategory;
        });
        
        this.currentPage = 1; // Reset to first page
        this.displayVocabulary();
    }

    displayVocabulary() {
        const vocabularyList = document.getElementById('vocabularyList');
        vocabularyList.innerHTML = '';
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageItems = this.filteredVocabulary.slice(startIndex, endIndex);
        
        if (pageItems.length === 0) {
            vocabularyList.innerHTML = '<div style="padding: 2rem; text-align: center; color: #6b7280;">No vocabulary items found</div>';
            this.updatePagination();
            return;
        }
        
        pageItems.forEach(item => {
            const vocabItem = document.createElement('div');
            vocabItem.className = 'vocab-item';
            vocabItem.innerHTML = `
                <div>
                    <span class="vocab-zerava">${item.zerava}</span>
                    <span class="vocab-category">${this.formatCategory(item.category)}</span>
                </div>
                <div class="vocab-bengali">${item.bengali}</div>
            `;
            
            // Click to use in translator
            vocabItem.addEventListener('click', () => {
                this.useVocabularyItem(item);
            });
            
            // Add hover effect for better UX
            vocabItem.addEventListener('mouseenter', () => {
                this.showVocabularyPreview(item);
            });
            
            vocabularyList.appendChild(vocabItem);
        });
        
        this.updatePagination();
    }

    formatCategory(category) {
        const categoryNames = {
            'pronouns': 'Pronouns',
            'verbs': 'Verbs',
            'nouns': 'Nouns',
            'colors': 'Colors',
            'numbers': 'Numbers',
            'animals': 'Animals',
            'feelings': 'Feelings',
            'time': 'Time',
            'environment': 'Environment',
            'miscellaneous': 'Misc'
        };
        return categoryNames[category] || category;
    }

    updatePagination() {
        const totalPages = Math.ceil(this.filteredVocabulary.length / this.itemsPerPage);
        const pageInfo = document.getElementById('vocabPageInfo');
        const prevBtn = document.getElementById('vocabPrevBtn');
        const nextBtn = document.getElementById('vocabNextBtn');
        
        pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
        
        prevBtn.disabled = this.currentPage <= 1;
        nextBtn.disabled = this.currentPage >= totalPages;
        
        // Update pagination button states
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
        } else {
            prevBtn.style.opacity = '1';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
        } else {
            nextBtn.style.opacity = '1';
        }
    }

    useVocabularyItem(item) {
        const inputText = document.getElementById('inputText');
        const currentMode = window.translator.currentMode;
        
        // Insert the appropriate text based on current mode
        if (currentMode === 'toNormal') {
            inputText.value = item.zerava;
        } else {
            inputText.value = item.bengali;
        }
        
        // Trigger translation
        window.translator.translateText();
        
        // Show feedback
        this.showToast(`Added "${item.zerava}" to translator`, 'success');
        
        // Scroll to translator
        document.querySelector('.translation-container').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    showVocabularyPreview(item) {
        // Create or update tooltip with additional information
        const tooltip = this.getOrCreateTooltip();
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <div class="tooltip-zerava">${item.zerava}</div>
                <div class="tooltip-bengali">${item.bengali}</div>
                <div class="tooltip-english">${item.english}</div>
                <div class="tooltip-category">${this.formatCategory(item.category)}</div>
            </div>
        `;
        
        // Position tooltip (simplified positioning)
        tooltip.style.display = 'block';
    }

    getOrCreateTooltip() {
        let tooltip = document.getElementById('vocabulary-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'vocabulary-tooltip';
            tooltip.className = 'vocabulary-tooltip';
            document.body.appendChild(tooltip);
        }
        return tooltip;
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('vocabSearch').focus();
            }
            
            // Ctrl/Cmd + Enter to translate
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                window.translator.translateText();
            }
            
            // Ctrl/Cmd + L to clear
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                window.translator.clearText();
            }
            
            // Ctrl/Cmd + S to swap languages
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                window.translator.swapLanguages();
            }
            
            // Escape to clear search
            if (e.key === 'Escape') {
                const vocabSearch = document.getElementById('vocabSearch');
                if (document.activeElement === vocabSearch) {
                    vocabSearch.value = '';
                    this.currentSearch = '';
                    this.filterVocabulary();
                }
            }
        });
    }

    initializeTooltips() {
        // Add keyboard shortcut hints
        const shortcuts = [
            { element: '#vocabSearch', hint: 'Ctrl+K to focus' },
            { element: '#inputText', hint: 'Ctrl+Enter to translate' },
            { element: '#clearBtn', hint: 'Ctrl+L to clear' },
            { element: '#swapBtn', hint: 'Ctrl+S to swap' }
        ];
        
        shortcuts.forEach(shortcut => {
            const element = document.querySelector(shortcut.element);
            if (element) {
                element.title = shortcut.hint;
            }
        });
    }

    showToast(message, type = 'success') {
        // Use the translator's toast method if available
        if (window.translator && window.translator.showToast) {
            window.translator.showToast(message, type);
        } else {
            // Fallback toast implementation
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    // Advanced UI features
    exportVocabulary() {
        const data = {
            vocabulary: this.vocabularyData,
            totalWords: this.vocabularyData.length,
            categories: this.getCategories(),
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'zerava-vocabulary.json';
        a.click();
        
        URL.revokeObjectURL(url);
        this.showToast('Vocabulary exported!', 'success');
    }

    getCategories() {
        const categories = {};
        this.vocabularyData.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = 0;
            }
            categories[item.category]++;
        });
        return categories;
    }

    getVocabularyStats() {
        return {
            total: this.vocabularyData.length,
            categories: this.getCategories(),
            filtered: this.filteredVocabulary.length
        };
    }

    // Search and filter helpers
    searchByCategory(category) {
        document.getElementById('categoryFilter').value = category;
        this.currentFilter = category;
        this.filterVocabulary();
    }

    clearFilters() {
        document.getElementById('vocabSearch').value = '';
        document.getElementById('categoryFilter').value = '';
        this.currentSearch = '';
        this.currentFilter = '';
        this.filterVocabulary();
    }

    // Responsive design helpers
    updateResponsiveLayout() {
        const isMobile = window.innerWidth <= 768;
        const translatorMain = document.querySelector('.translator-main');
        
        if (isMobile) {
            translatorMain.style.gridTemplateColumns = '1fr';
        } else {
            translatorMain.style.gridTemplateColumns = '2fr 1fr';
        }
    }

    // Animation and visual feedback
    highlightVocabularyItem(zerava) {
        const vocabItems = document.querySelectorAll('.vocab-item');
        vocabItems.forEach(item => {
            const zeravaSpan = item.querySelector('.vocab-zerava');
            if (zeravaSpan && zeravaSpan.textContent === zerava) {
                item.style.backgroundColor = '#e0e7ff';
                setTimeout(() => {
                    item.style.backgroundColor = '';
                }, 2000);
            }
        });
    }

    // Accessibility helpers
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Additional CSS for tooltip (injected via JavaScript)
const tooltipStyles = `
.vocabulary-tooltip {
    position: absolute;
    background: #374151;
    color: white;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.875rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 1000;
    display: none;
    pointer-events: none;
    max-width: 200px;
}

.tooltip-zerava {
    font-weight: 600;
    font-size: 1rem;
    color: #fbbf24;
    margin-bottom: 0.25rem;
}

.tooltip-bengali {
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.tooltip-english {
    font-size: 0.8rem;
    opacity: 0.8;
    margin-bottom: 0.25rem;
}

.tooltip-category {
    font-size: 0.75rem;
    background: rgba(79, 70, 229, 0.3);
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    display: inline-block;
}

/* Enhanced focus styles for accessibility */
.vocab-item:focus,
.control-btn:focus,
.mode-btn:focus,
.pagination-btn:focus {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
}

/* Loading states */
.vocab-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    color: #6b7280;
}

.vocab-loading::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid #f3f4f6;
    border-top: 2px solid #4f46e5;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-left: 0.5rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Inject tooltip styles
const style = document.createElement('style');
style.textContent = tooltipStyles;
document.head.appendChild(style);

// Initialize UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.zeravaUI = new ZeravaUI();
    
    // Handle window resize for responsive design
    window.addEventListener('resize', () => {
        window.zeravaUI.updateResponsiveLayout();
    });
    
    // Initialize responsive layout
    window.zeravaUI.updateResponsiveLayout();
});