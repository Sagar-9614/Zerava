// Nexari Language System - A Constructed Language (Conlang)
// Designed for simplicity and AI-inspired aesthetics

class NexariLanguage {
    constructor() {
        this.currentDirection = 'nexari-to-english'; // Default direction
        
        // Core vocabulary - Nexari (Zerava Script) to English mappings
        this.vocabulary = {
            // Pronouns
            '𐔀𐔋': 'I',
            '𐔎𐔂': 'you', 
            '𐔋𐔄𐔑': 'he/she/it',
            '𐔑𐔑𐔂': 'we',
            '𐔒𐔓𐔑': 'you (plural)',
            '𐔓𐔒𐔑': 'they',
            
            // Basic verbs (present tense forms)
            '𐔍𐔉': 'am/is/are',
            '𐔏𐔂': 'see',
            '𐔍𐔂': 'go',
            '𐔑𐔄': 'come',
            '𐔏𐔒': 'love',
            '𐔍𐔒': 'want',
            '𐔒𐔉𐔂': 'have',
            '𐔐𐔂𐔑': 'give',
            '𐔎𐔉': 'speak',
            '𐔓𐔏𐔂': 'know',
            '𐔔𐔂𐔎': 'do/make',
            '𐔍𐔉': 'eat',
            '𐔊𐔃': 'drink',
            '𐔀𐔉𐔂': 'sleep',
            '𐔎𐔉𐔂': 'wake',
            '𐔀𐔒': 'feel',
            '𐔔𐔏𐔂': 'think',
            
            // Nouns  
            '𐔐𐔑𐔏': 'world',
            '𐔀𐔑𐔃': 'time',
            '𐔎𐔂𐔓': 'light',
            '𐔊𐔃': 'water',
            '𐔆𐔃𐔐': 'fire',
            '𐔔𐔃': 'air',
            '𐔏𐔄': 'earth',
            '𐔒𐔉𐔂': 'life',
            '𐔔𐔒': 'death',
            '𐔏𐔒': 'love',
            '𐔔𐔎𐔃': 'nothing',
            '𐔀𐔐𐔀': 'everything',
            '𐔀𐔑': 'friend',
            '𐔍𐔓': 'enemy',
            '𐔄𐔑': 'home',
            '𐔒𐔒': 'peace',
            '𐔓𐔒': 'war',
            '𐔀𐔒': 'happiness',
            '𐔑𐔃': 'sea',
            '𐔋𐔄': 'sky',
            '𐔆𐔃𐔐': 'sun',
            '𐔀𐔄': 'moon',
            '𐔎𐔄': 'star',
            '𐔍𐔃': 'tree',
            '𐔎𐔃': 'flower',
            '𐔏𐔓𐔑': 'bird',
            '𐔀𐔑': 'animal',
            '𐔔𐔉': 'human',
            '𐔔𐔏𐔂': 'mind',
            '𐔒𐔓𐔒': 'soul',
            '𐔔𐔉': 'body',
            '𐔏𐔂': 'eye',
            '𐔓𐔂𐔋': 'hand',
            '𐔍𐔓𐔉': 'foot',
            '𐔎𐔉': 'voice',
            '𐔏𐔂𐔓': 'sound',
            
            // Colors
            '𐔑𐔄': 'red',
            '𐔎𐔄': 'blue', 
            '𐔀𐔄': 'green',
            '𐔒𐔄': 'yellow',
            '𐔔𐔄': 'black',
            '𐔓𐔄': 'white',
            '𐔒𐔄𐔂': 'orange',
            '𐔓𐔄𐔂': 'pink',
            '𐔋𐔄': 'purple',
            
            // Numbers
            '𐔃𐔁': 'zero',
            '𐔀𐔀': 'one',
            '𐔁𐔀': 'two', 
            '𐔂𐔀': 'three',
            '𐔃𐔀': 'four',
            '𐔄𐔀': 'five',
            '𐔅𐔀': 'six',
            '𐔆𐔀': 'seven',
            '𐔇𐔀': 'eight',
            '𐔈𐔀': 'nine',
            '𐔉𐔀': 'ten',
            
            // Adjectives
            '𐔀𐔔𐔃': 'good',
            '𐔎𐔔𐔃': 'bad',
            '𐔋𐔔𐔃': 'big',
            '𐔍𐔔𐔃': 'small',
            '𐔓𐔔𐔃': 'new',
            '𐔔𐔔𐔃': 'old',
            '𐔏𐔔𐔃': 'fast',
            '𐔐𐔔𐔃': 'slow',
            '𐔑𐔔𐔃': 'hot',
            '𐔒𐔔𐔃': 'cold',
            '𐔎𐔂𐔓': 'bright',
            '𐔓𐔓𐔒': 'dark',
            '𐔏𐔀𐔃': 'high',
            '𐔐𐔀𐔃': 'low',
            '𐔑𐔀𐔃': 'long',
            '𐔒𐔀𐔃': 'short',
            
            // Connecting words
            '𐔀𐔎𐔃': 'and',
            '𐔎𐔎𐔃': 'or',
            '𐔋𐔎𐔃': 'but',
            '𐔍𐔎𐔃': 'if',
            '𐔏𐔎𐔃': 'the',
            '𐔐𐔎𐔃': 'a',
            '𐔑𐔎𐔃': 'in',
            '𐔒𐔎𐔃': 'on',
            '𐔓𐔎𐔃': 'at',
            '𐔔𐔎𐔃': 'to',
            '𐔀𐔋𐔃': 'of',
            '𐔎𐔋𐔃': 'for',
            '𐔋𐔋𐔃': 'with',
            '𐔍𐔋𐔃': 'by',
            
            // Question words
            '𐔑𐔂𐔋': 'what',
            '𐔒𐔂𐔋': 'who', 
            '𐔓𐔂𐔋': 'when',
            '𐔔𐔂𐔋': 'why',
            '𐔀𐔓': 'how',
            '𐔓𐔀𐔃': 'where',
            
            // Common phrases
            '𐔀𐔑𐔉': 'hello',
            '𐔎𐔓𐔉': 'goodbye',
            '𐔀𐔀𐔃': 'yes',
            '𐔎𐔀𐔃': 'no',
            '𐔋𐔀𐔃': 'please',
            '𐔍𐔀𐔃': 'thank you',
            '𐔏𐔀𐔃': 'sorry'
        };
        
        // Create reverse mapping for English to Nexari
        this.englishToNexari = {};
        this.createReverseMappings();
        
        // Grammar rules for tense formation
        this.tenseMarkers = {
            present: '', // No marker for present tense
            past: '→ed', // Past tense marker
            future: '→wil', // Future tense marker (prefix)
            continuous: '→ing', // Continuous marker
            perfect: '→hav' // Perfect tense marker (prefix)
        };
        
        // Sentence structure patterns
        this.patterns = {
            simple: ['subject', 'verb', 'object'],
            question: ['question_word', 'verb', 'subject', 'object'],
            negative: ['subject', 'not', 'verb', 'object']
        };
        
        this.initializeExamples();
    }
    
    // Create reverse mappings for English to Nexari translation
    createReverseMappings() {
        for (const nexari in this.vocabulary) {
            const english = this.vocabulary[nexari];
            
            // Handle multiple English translations separated by /
            if (english.includes('/')) {
                const englishVariants = english.split('/');
                englishVariants.forEach(variant => {
                    this.englishToNexari[variant.trim().toLowerCase()] = nexari;
                });
            } else {
                this.englishToNexari[english.toLowerCase()] = nexari;
            }
        }
        
        // Add common English variations
        this.addEnglishVariations();
    }
    
    // Add common English word variations
    addEnglishVariations() {
        const variations = {
            'i': '𐔀𐔋',
            'me': '𐔀𐔋',
            'my': '𐔀𐔋',
            'mine': '𐔀𐔋',
            'you': '𐔎𐔂',
            'your': '𐔎𐔂',
            'yours': '𐔎𐔂',
            'he': '𐔋𐔄𐔑',
            'she': '𐔋𐔄𐔑',
            'it': '𐔋𐔄𐔑',
            'his': '𐔋𐔄𐔑',
            'her': '𐔋𐔄𐔑',
            'its': '𐔋𐔄𐔑',
            'we': '𐔑𐔑𐔂',
            'us': '𐔑𐔑𐔂',
            'our': '𐔑𐔑𐔂',
            'ours': '𐔑𐔑𐔂',
            'they': '𐔓𐔒𐔑',
            'them': '𐔓𐔒𐔑',
            'their': '𐔓𐔒𐔑',
            'theirs': '𐔓𐔒𐔑',
            'am': '𐔍𐔉',
            'are': '𐔍𐔉',
            'is': '𐔍𐔉',
            'be': '𐔍𐔉',
            'being': '𐔍𐔉',
            'was': '𐔍𐔉→ed',
            'were': '𐔍𐔉→ed',
            'will': '→wil',
            'shall': '→wil',
            'hello': '𐔀𐔑𐔉',
            'hi': '𐔀𐔑𐔉',
            'goodbye': '𐔎𐔓𐔉',
            'bye': '𐔎𐔓𐔉',
            'thanks': '𐔍𐔀𐔃',
            'thank': '𐔍𐔀𐔃'
        };
        
        Object.assign(this.englishToNexari, variations);
    }
    
    // Set translation direction
    setDirection(direction) {
        this.currentDirection = direction;
    }
    
    // Get current direction
    getDirection() {
        return this.currentDirection;
    }
    
    // Initialize example phrases for the UI
    initializeExamples() {
        this.examples = [
            { nexari: '𐔀𐔋 𐔏𐔒 𐔎𐔂', english: 'I love you' },
            { nexari: '𐔎𐔂 𐔏𐔂 𐔎𐔂𐔓', english: 'You see light' },
            { nexari: '𐔋𐔄𐔑 𐔍𐔉 𐔀𐔔𐔃', english: 'He/she is good' },
            { nexari: '𐔑𐔑𐔂 𐔍𐔂 𐔄𐔑', english: 'We go home' },
            { nexari: '𐔊𐔃 𐔍𐔉 𐔎𐔄', english: 'Water is blue' },
            { nexari: '𐔆𐔃𐔐 𐔎𐔂𐔓 𐔐𐔑𐔏', english: 'Sun lights world' },
            { nexari: '𐔀𐔋 𐔒𐔉𐔂 𐔒𐔒', english: 'I have peace' },
            { nexari: '𐔎𐔂 𐔍𐔒 𐔏𐔒', english: 'You want love' },
            { nexari: '𐔎𐔃 𐔀𐔔𐔃 𐔍𐔃', english: 'Good flower tree' },
            { nexari: '𐔀𐔄 𐔎𐔄 𐔋𐔄', english: 'Moon star sky' }
        ];
    }
    
    // Main translation function - supports bidirectional translation
    translate(inputText) {
        if (!inputText || inputText.trim() === '') {
            return '';
        }
        
        // Determine direction and translate accordingly
        if (this.currentDirection === 'english-to-nexari') {
            return this.translateEnglishToNexari(inputText);
        } else {
            return this.translateNexariToEnglish(inputText);
        }
    }
    
    // Translate from Nexari to English
    translateNexariToEnglish(nexariText) {
        const cleanText = nexariText.toLowerCase().trim();
        const words = cleanText.split(/\s+/);
        const translatedWords = [];
        
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const translation = this.translateNexariWord(word, i, words);
            if (translation) {
                translatedWords.push(translation);
            }
        }
        
        return this.improveEnglishGrammar(translatedWords.join(' '));
    }
    
    // Translate from English to Nexari
    translateEnglishToNexari(englishText) {
        const cleanText = englishText.toLowerCase().trim();
        const words = cleanText.split(/\s+/);
        const translatedWords = [];
        
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const translation = this.translateEnglishWord(word, i, words);
            if (translation) {
                translatedWords.push(translation);
            }
        }
        
        return this.improveNexariGrammar(translatedWords.join(' '));
    }
    
    // Translate individual Nexari words to English
    translateNexariWord(word, index, allWords) {
        // Handle punctuation
        const cleanWord = word.replace(/[.,!?;:]/, '');
        const punctuation = word.match(/[.,!?;:]/) ? word.match(/[.,!?;:]/)[0] : '';
        
        // Check for tense markers
        const { baseWord, tenseInfo } = this.parseTense(cleanWord);
        
        // Get base translation
        let translation = this.vocabulary[baseWord];
        
        if (!translation) {
            // Try to find similar Nexari word
            translation = this.findSimilarNexariWord(baseWord);
        }
        
        if (!translation) {
            // If word not found, return as is (might be a proper noun)
            return word;
        }
        
        // Apply tense modifications
        translation = this.applyTense(translation, tenseInfo, baseWord);
        
        return translation + punctuation;
    }
    
    // Find similar Nexari words
    findSimilarNexariWord(word) {
        const keys = Object.keys(this.vocabulary);
        
        // Try partial matches
        for (const key of keys) {
            if (key.includes(word.substring(0, 2)) && word.length >= 2) {
                return this.vocabulary[key];
            }
        }
        
        return null;
    }
    
    // Translate individual English words to Nexari
    translateEnglishWord(word, index, allWords) {
        // Handle punctuation
        const cleanWord = word.replace(/[.,!?;:]/, '');
        const punctuation = word.match(/[.,!?;:]/) ? word.match(/[.,!?;:]/)[0] : '';
        
        // Check for tense markers in English
        const { baseWord, tenseInfo } = this.parseEnglishTense(cleanWord, allWords, index);
        
        // Get base translation from English to Nexari
        let translation = this.englishToNexari[baseWord.toLowerCase()];
        
        if (!translation) {
            // Try to find partial matches or similar words
            translation = this.findSimilarEnglishWord(baseWord);
        }
        
        if (!translation) {
            // If word not found, return as is but in lowercase
            return cleanWord.toLowerCase() + punctuation;
        }
        
        // Apply tense modifications for Nexari
        translation = this.applyNexariTense(translation, tenseInfo, baseWord);
        
        return translation + punctuation;
    }
    
    // Parse English tense information
    parseEnglishTense(word, allWords, index) {
        let baseWord = word;
        let tense = 'present';
        
        // Check for common English past tense endings
        if (word.endsWith('ed') && word.length > 3) {
            baseWord = word.slice(0, -2);
            tense = 'past';
            
            // Handle double consonant (stopped -> stop)
            if (baseWord.length >= 3 && baseWord[baseWord.length-1] === baseWord[baseWord.length-2]) {
                const consonants = 'bcdfghjklmnpqrstvwxyz';
                if (consonants.includes(baseWord[baseWord.length-1])) {
                    baseWord = baseWord.slice(0, -1);
                }
            }
        }
        // Check for -ing endings
        else if (word.endsWith('ing') && word.length > 4) {
            baseWord = word.slice(0, -3);
            tense = 'continuous';
            
            // Handle double consonant
            if (baseWord.length >= 3 && baseWord[baseWord.length-1] === baseWord[baseWord.length-2]) {
                const consonants = 'bcdfghjklmnpqrstvwxyz';
                if (consonants.includes(baseWord[baseWord.length-1])) {
                    baseWord = baseWord.slice(0, -1);
                }
            }
        }
        // Check for future tense with "will"
        else if (index > 0 && (allWords[index-1] === 'will' || allWords[index-1] === 'shall')) {
            tense = 'future';
        }
        // Check for perfect tense with "have/has"
        else if (index > 0 && (allWords[index-1] === 'have' || allWords[index-1] === 'has' || allWords[index-1] === 'had')) {
            tense = 'perfect';
        }
        
        return { baseWord, tenseInfo: tense };
    }
    
    // Apply Nexari tense markers
    applyNexariTense(translation, tense, originalWord) {
        if (tense === 'present') {
            return translation;
        }
        
        switch (tense) {
            case 'past':
                return translation + '→ed';
            case 'future':
                return translation + '→wil';
            case 'continuous':
                return translation + '→ing';
            case 'perfect':
                return translation + '→hav';
            default:
                return translation;
        }
    }
    
    // Find similar English words using basic fuzzy matching
    findSimilarEnglishWord(word) {
        const keys = Object.keys(this.englishToNexari);
        
        // Try exact match first (already done in main function)
        
        // Try without common suffixes
        const suffixes = ['s', 'es', 'ly', 'er', 'est', 'tion', 'ing', 'ed'];
        for (const suffix of suffixes) {
            if (word.endsWith(suffix)) {
                const root = word.slice(0, -suffix.length);
                if (this.englishToNexari[root]) {
                    return this.englishToNexari[root];
                }
            }
        }
        
        // Try partial matches (words that start with the same letters)
        for (const key of keys) {
            if (key.startsWith(word.substring(0, 3)) && word.length >= 3) {
                return this.englishToNexari[key];
            }
        }
        
        return null;
    }
    
    // Parse tense information from word
    parseTense(word) {
        let baseWord = word;
        let tense = 'present';
        
        // Check for future marker
        if (word.includes('→wil')) {
            baseWord = word.replace('→wil', '');
            tense = 'future';
        }
        // Check for perfect marker  
        else if (word.includes('→hav')) {
            baseWord = word.replace('→hav', '');
            tense = 'perfect';
        }
        // Check for past marker
        else if (word.includes('→ed')) {
            baseWord = word.replace('→ed', '');
            tense = 'past';
        }
        // Check for continuous marker
        else if (word.includes('→ing')) {
            baseWord = word.replace('→ing', '');
            tense = 'continuous';
        }
        
        return { baseWord, tenseInfo: tense };
    }
    
    // Apply tense to English translation
    applyTense(translation, tense, originalWord) {
        if (tense === 'present') {
            return translation;
        }
        
        // Simple tense application (could be more sophisticated)
        switch (tense) {
            case 'past':
                if (this.isVerb(originalWord)) {
                    return this.getPastForm(translation);
                }
                return translation;
                
            case 'future':
                if (this.isVerb(originalWord)) {
                    return 'will ' + translation;
                }
                return translation;
                
            case 'continuous':
                if (this.isVerb(originalWord)) {
                    return this.getContinuousForm(translation);
                }
                return translation;
                
            case 'perfect':
                if (this.isVerb(originalWord)) {
                    return 'have ' + this.getPastParticipleForm(translation);
                }
                return translation;
                
            default:
                return translation;
        }
    }
    
    // Check if a word is a verb (simplified)
    isVerb(nexariWord) {
        const verbs = ['𐔍𐔉', '𐔏𐔂', '𐔍𐔂', '𐔑𐔄', '𐔏𐔒', '𐔍𐔒', '𐔒𐔉𐔂', '𐔐𐔂𐔑', '𐔎𐔉', '𐔓𐔏𐔂', '𐔔𐔂𐔎', '𐔍𐔉', '𐔊𐔃', '𐔀𐔉𐔂', '𐔎𐔉𐔂', '𐔀𐔒', '𐔔𐔏𐔂'];
        return verbs.includes(nexariWord);
    }
    
    // Get past form of English verb (simplified)
    getPastForm(verb) {
        const irregularPast = {
            'am': 'was',
            'is': 'was',
            'are': 'were',
            'see': 'saw',
            'go': 'went',
            'come': 'came',
            'have': 'had',
            'give': 'gave',
            'know': 'knew',
            'do': 'did',
            'make': 'made',
            'eat': 'ate',
            'drink': 'drank',
            'sleep': 'slept',
            'wake': 'woke',
            'feel': 'felt',
            'think': 'thought'
        };
        
        return irregularPast[verb] || verb + 'ed';
    }
    
    // Get continuous form (simplified)
    getContinuousForm(verb) {
        const irregularContinuous = {
            'am': 'being',
            'is': 'being',
            'are': 'being',
            'see': 'seeing',
            'go': 'going',
            'come': 'coming',
            'have': 'having',
            'give': 'giving',
            'make': 'making',
            'wake': 'waking'
        };
        
        return irregularContinuous[verb] || verb + 'ing';
    }
    
    // Get past participle form (simplified)
    getPastParticipleForm(verb) {
        const irregularPastParticiple = {
            'see': 'seen',
            'go': 'gone',
            'come': 'come',
            'give': 'given',
            'know': 'known',
            'do': 'done',
            'eat': 'eaten',
            'drink': 'drunk',
            'wake': 'woken',
            'think': 'thought'
        };
        
        return irregularPastParticiple[verb] || this.getPastForm(verb);
    }
    
    // Improve English grammar (basic post-processing)
    improveEnglishGrammar(text) {
        if (!text) return text;
        
        // Capitalize first letter
        text = text.charAt(0).toUpperCase() + text.slice(1);
        
        // Fix common patterns
        text = text.replace(/\bi am are\b/g, 'I am');
        text = text.replace(/\byou am\b/g, 'you are');
        text = text.replace(/\bhe am\b/g, 'he is');
        text = text.replace(/\bshe am\b/g, 'she is');
        text = text.replace(/\bit am\b/g, 'it is');
        text = text.replace(/\bwe am\b/g, 'we are');
        text = text.replace(/\bthey am\b/g, 'they are');
        
        // Fix double spaces
        text = text.replace(/\s+/g, ' ');
        
        return text.trim();
    }
    
    // Improve Nexari grammar (basic post-processing)
    improveNexariGrammar(text) {
        if (!text) return text;
        
        // Fix double spaces
        text = text.replace(/\s+/g, ' ');
        
        // Remove auxiliary verbs that were translated separately
        text = text.replace(/\b→wil\s+→wil/g, '→wil');
        text = text.replace(/\b→hav\s+→hav/g, '→hav');
        
        // Clean up redundant tense markers
        text = text.replace(/(→ed)\s+(→ed)/g, '$1');
        text = text.replace(/(→ing)\s+(→ing)/g, '$1');
        
        return text.trim();
    }
    
    // Get random example for UI
    getRandomExample() {
        return this.examples[Math.floor(Math.random() * this.examples.length)];
    }
    
    // Get all examples for UI
    getAllExamples() {
        return this.examples;
    }
    
    // Validate Nexari text (check if it contains valid Nexari words)
    isValidNexari(text) {
        const words = text.toLowerCase().trim().split(/\s+/);
        let validWordCount = 0;
        
        for (const word of words) {
            const cleanWord = word.replace(/[.,!?;:]/, '');
            const { baseWord } = this.parseTense(cleanWord);
            
            if (this.vocabulary[baseWord]) {
                validWordCount++;
            }
        }
        
        // Consider text valid if at least 50% of words are recognized
        return words.length > 0 && (validWordCount / words.length) >= 0.5;
    }
    
    // Get vocabulary statistics
    getVocabularyStats() {
        const categories = {
            pronouns: ['zeth', 'yul', 'kex', 'zev', 'yus', 'kexu'],
            verbs: ['tem', 'vok', 'nal', 'kam', 'lyx', 'dex', 'rex', 'miv', 'tel', 'kor', 'vex', 'qin', 'zul', 'nox', 'wek', 'fel', 'tox'],
            nouns: ['dal', 'nyx', 'lum', 'vor', 'kil', 'aex', 'sol', 'rex', 'mex', 'vel', 'nul', 'omn', 'ven', 'fex', 'dol', 'pax', 'war', 'joy'],
            numbers: ['zer', 'one', 'two', 'tri', 'qua', 'pen', 'hex', 'sep', 'oct', 'non', 'dek'],
            adjectives: ['gon', 'bad', 'big', 'sma', 'new', 'old', 'fas', 'slo', 'hot', 'col', 'lum', 'dar']
        };
        
        const totalWords = Object.keys(this.vocabulary).length;
        
        return {
            total: totalWords,
            categories: categories,
            tenses: Object.keys(this.tenseMarkers).length
        };
    }
}

// Create global instance
window.nexariLanguage = new NexariLanguage();