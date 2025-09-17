// Nexari Translator - Main Application Logic
class NexariTranslator {
    constructor() {
        this.isTranslating = false;
        this.translationTimeout = null;
        this.currentDirection = 'nexari-to-english'; // Default direction
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupInputRestrictions();
        this.loadExamples();
        this.setupNavigation();
    }

    bindEvents() {
        // Translation functionality
        const translateBtn = document.getElementById('translateBtn');
        const inputText = document.getElementById('inputText');
        const clearBtn = document.getElementById('clearBtn');
        const copyBtn = document.getElementById('copyBtn');
        const speakBtn = document.getElementById('speakBtn');

        translateBtn.addEventListener('click', () => this.translateText());
        clearBtn.addEventListener('click', () => this.clearText());
        copyBtn.addEventListener('click', () => this.copyTranslation());
        speakBtn.addEventListener('click', () => this.speakTranslation());

        // Language switching
        const switchBtn = document.getElementById('switchBtn');
        switchBtn.addEventListener('click', () => this.switchLanguages());

        // Auto-translate on input (with debounce)
        inputText.addEventListener('input', () => {
            this.updateCharacterCount();
            this.debouncedTranslate();
        });

        // Enter key to translate
        inputText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.translateText();
            }
        });

        // Initialize language direction
        this.updateLanguageLabels();
        this.updateInputRestrictions();
    }

    setupInputRestrictions() {
        const inputText = document.getElementById('inputText');
        
        // Dynamic restrictions based on translation direction
        const checkRestrictions = (e) => {
            // Only apply restrictions when translating FROM Nexari
            if (this.currentDirection === 'nexari-to-english') {
                // Disable copy (Ctrl+C)
                if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                    e.preventDefault();
                    this.showToast('Copying Nexari text is disabled', 'error');
                    return false;
                }
                
                // Disable paste (Ctrl+V) 
                if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
                    e.preventDefault();
                    this.showToast('Pasting into Nexari input is disabled', 'error');
                    return false;
                }
                
                // Disable cut (Ctrl+X)
                if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
                    e.preventDefault();
                    this.showToast('Cutting Nexari text is disabled', 'error');
                    return false;
                }
                
                // Disable select all (Ctrl+A)
                if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
                    e.preventDefault();
                    return false;
                }
            }
        };

        // Bind keyboard events
        inputText.addEventListener('keydown', checkRestrictions);
        
        // Dynamic context menu restrictions
        inputText.addEventListener('contextmenu', (e) => {
            if (this.currentDirection === 'nexari-to-english') {
                e.preventDefault();
                this.showToast('Right-click menu is disabled for Nexari input', 'error');
                return false;
            }
        });

        // Dynamic selection restrictions
        inputText.addEventListener('mousedown', (e) => {
            if (this.currentDirection === 'nexari-to-english') {
                // Allow focus but prevent selection for Nexari input
                setTimeout(() => {
                    if (inputText.selectionStart !== inputText.selectionEnd) {
                        inputText.setSelectionRange(inputText.value.length, inputText.value.length);
                    }
                }, 1);
            }
        });
        
        // Update CSS classes based on direction
        this.updateInputRestrictions();
    }
    
    updateInputRestrictions() {
        const inputText = document.getElementById('inputText');
        
        if (this.currentDirection === 'nexari-to-english') {
            inputText.classList.add('restricted-input');
        } else {
            inputText.classList.remove('restricted-input');
        }
    }

    switchLanguages() {
        // Toggle direction
        this.currentDirection = this.currentDirection === 'nexari-to-english' 
            ? 'english-to-nexari' 
            : 'nexari-to-english';
        
        // Update the language system
        window.nexariLanguage.setDirection(this.currentDirection);
        
        // Update UI labels
        this.updateLanguageLabels();
        
        // Update input restrictions
        this.updateInputRestrictions();
        
        // Clear current text and retranslate if there's content
        const inputText = document.getElementById('inputText');
        if (inputText.value.trim()) {
            this.translateText();
        }
        
        // Update examples
        this.loadExamples();
        
        this.showToast(`Switched to ${this.getDirectionLabel()}`, 'success');
    }

    updateLanguageLabels() {
        const inputFlag = document.getElementById('inputFlag');
        const inputLabel = document.getElementById('inputLangLabel');
        const outputFlag = document.getElementById('outputFlag');
        const outputLabel = document.getElementById('outputLangLabel');
        const inputText = document.getElementById('inputText');
        
        if (this.currentDirection === 'nexari-to-english') {
            inputFlag.textContent = '𐔓𐔂𐔋';
            inputLabel.textContent = 'Zerava Script (Nexari)';
            outputFlag.textContent = '🇺🇸';
            outputLabel.textContent = 'English Translation';
            inputText.placeholder = 'Enter Zerava text here... (e.g., 𐔀𐔋 𐔏𐔒 𐔎𐔂)';
        } else {
            inputFlag.textContent = '🇺🇸';
            inputLabel.textContent = 'English Language';
            outputFlag.textContent = '𐔓𐔂𐔋';
            outputLabel.textContent = 'Zerava Script Translation';
            inputText.placeholder = 'Enter English text here... (e.g., I love you)';
        }
    }

    getDirectionLabel() {
        return this.currentDirection === 'nexari-to-english' 
            ? 'Nexari → English' 
            : 'English → Nexari';
    }

    debouncedTranslate() {
        // Clear existing timeout
        if (this.translationTimeout) {
            clearTimeout(this.translationTimeout);
        }
        
        // Set new timeout for auto-translation
        this.translationTimeout = setTimeout(() => {
            this.translateText();
        }, 500); // Wait 500ms after user stops typing
    }

    async translateText() {
        const inputText = document.getElementById('inputText');
        const outputText = document.getElementById('outputText');
        const translateBtn = document.getElementById('translateBtn');
        const processingIndicator = document.getElementById('processingIndicator');
        const translationInfo = document.getElementById('translationInfo');

        const nexariText = inputText.value.trim();
        
        // Clear output if input is empty
        if (!nexariText) {
            outputText.textContent = 'Your English translation will appear here...';
            translationInfo.textContent = 'Ready to translate';
            return;
        }

        // Check if already translating
        if (this.isTranslating) {
            return;
        }

        this.isTranslating = true;
        
        // Show processing state
        translateBtn.classList.add('processing');
        translateBtn.style.pointerEvents = 'none';
        processingIndicator.classList.add('active');
        translationInfo.textContent = 'Processing...';

        try {
            // Simulate AI processing delay for better UX
            await this.simulateProcessingDelay();
            
            // Perform translation
            const translation = window.nexariLanguage.translate(nexariText);
            
            if (translation) {
                outputText.textContent = translation;
                
                // Update translation info
                const wordCount = nexariText.split(/\s+/).filter(w => w.length > 0).length;
                const isValid = window.nexariLanguage.isValidNexari(nexariText);
                
                if (isValid) {
                    translationInfo.textContent = `Translated ${wordCount} word${wordCount !== 1 ? 's' : ''} successfully`;
                } else {
                    translationInfo.textContent = `Translated ${wordCount} word${wordCount !== 1 ? 's' : ''} (some words may not be recognized)`;
                }
            } else {
                outputText.textContent = 'Unable to translate. Please check your Nexari text.';
                translationInfo.textContent = 'Translation failed';
            }
            
        } catch (error) {
            console.error('Translation error:', error);
            outputText.textContent = 'An error occurred during translation.';
            translationInfo.textContent = 'Translation error';
        } finally {
            // Reset processing state
            this.isTranslating = false;
            translateBtn.classList.remove('processing');
            translateBtn.style.pointerEvents = 'auto';
            processingIndicator.classList.remove('active');
        }
    }

    simulateProcessingDelay() {
        // Simulate AI processing time (100-800ms for realism)
        const delay = Math.random() * 700 + 100;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    clearText() {
        const inputText = document.getElementById('inputText');
        const outputText = document.getElementById('outputText');
        const translationInfo = document.getElementById('translationInfo');
        const charCount = document.getElementById('charCount');

        inputText.value = '';
        outputText.textContent = 'Your English translation will appear here...';
        translationInfo.textContent = 'Ready to translate';
        charCount.textContent = '0';
        
        // Clear any pending translation
        if (this.translationTimeout) {
            clearTimeout(this.translationTimeout);
        }
        
        // Focus back to input
        inputText.focus();
        
        this.showToast('Text cleared', 'success');
    }

    copyTranslation() {
        const outputText = document.getElementById('outputText');
        const text = outputText.textContent;
        
        if (!text || text === 'Your English translation will appear here...') {
            this.showToast('No translation to copy', 'error');
            return;
        }

        // Copy to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Translation copied to clipboard', 'success');
            }).catch(() => {
                this.fallbackCopy(text);
            });
        } else {
            this.fallbackCopy(text);
        }
    }

    fallbackCopy(text) {
        // Fallback copy method for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const result = document.execCommand('copy');
            if (result) {
                this.showToast('Translation copied to clipboard', 'success');
            } else {
                this.showToast('Copy failed', 'error');
            }
        } catch (err) {
            this.showToast('Copy not supported', 'error');
        }
        
        document.body.removeChild(textArea);
    }

    speakTranslation() {
        const outputText = document.getElementById('outputText');
        const text = outputText.textContent;
        
        if (!text || text === 'Your English translation will appear here...') {
            this.showToast('No translation to speak', 'error');
            return;
        }

        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;
            
            // Try to use English voice
            const voices = speechSynthesis.getVoices();
            const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
            if (englishVoice) {
                utterance.voice = englishVoice;
            }
            
            utterance.onstart = () => {
                this.showToast('Speaking translation...', 'success');
            };
            
            utterance.onerror = () => {
                this.showToast('Speech synthesis failed', 'error');
            };
            
            speechSynthesis.speak(utterance);
        } else {
            this.showToast('Speech synthesis not supported', 'error');
        }
    }

    updateCharacterCount() {
        const inputText = document.getElementById('inputText');
        const charCount = document.getElementById('charCount');
        const count = inputText.value.length;
        
        charCount.textContent = count;
        
        // Change color based on length
        if (count > 500) {
            charCount.style.color = '#ef4444';
        } else if (count > 300) {
            charCount.style.color = '#f59e0b';
        } else {
            charCount.style.color = '#64748b';
        }
    }

    loadExamples() {
        const examplesGrid = document.getElementById('examplesGrid');
        const examples = window.nexariLanguage.getAllExamples();
        
        examplesGrid.innerHTML = '';
        
        examples.forEach(example => {
            const exampleItem = document.createElement('div');
            exampleItem.className = 'example-item';
            
            // Show examples based on current direction
            if (this.currentDirection === 'nexari-to-english') {
                exampleItem.innerHTML = `
                    <div class="example-nexari">${example.nexari}</div>
                    <div class="example-english">${example.english}</div>
                `;
            } else {
                exampleItem.innerHTML = `
                    <div class="example-nexari">${example.english}</div>
                    <div class="example-english">${example.nexari}</div>
                `;
            }
            
            // Click to load example
            exampleItem.addEventListener('click', () => {
                const inputText = document.getElementById('inputText');
                
                if (this.currentDirection === 'nexari-to-english') {
                    inputText.value = example.nexari;
                } else {
                    inputText.value = example.english;
                }
                
                this.updateCharacterCount();
                this.translateText();
                
                // Scroll to translator
                document.querySelector('.translator-container').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
            
            examplesGrid.appendChild(exampleItem);
        });
    }

    setupNavigation() {
        const homeBtn = document.getElementById('homeBtn');
        const languageBtn = document.getElementById('languageBtn');
        
        homeBtn.addEventListener('click', () => {
            // Already on home page, maybe scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        languageBtn.addEventListener('click', () => {
            // Navigate to language documentation page
            window.location.href = 'language.html';
        });
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');
        
        // Set message
        toastMessage.textContent = message;
        
        // Set icon based on type
        if (type === 'error') {
            toastIcon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>';
            toast.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        } else {
            toastIcon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
            toast.style.borderColor = 'rgba(34, 197, 94, 0.3)';
        }
        
        // Show toast
        toast.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Utility methods
    getTranslationStats() {
        const stats = window.nexariLanguage.getVocabularyStats();
        return {
            totalVocabulary: stats.total,
            supportedTenses: stats.tenses,
            categories: Object.keys(stats.categories).length
        };
    }
}

// Initialize translator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.nexariTranslator = new NexariTranslator();
    
    // Load voices for speech synthesis
    if ('speechSynthesis' in window) {
        speechSynthesis.getVoices();
        // Handle voice loading
        speechSynthesis.addEventListener('voiceschanged', () => {
            speechSynthesis.getVoices();
        });
    }
});