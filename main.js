// Language list
const languages = {
    'af': 'Afrikaans', 'sq': 'Albanian', 'am': 'Amharic', 'ar': 'Arabic', 'hy': 'Armenian',
    'az': 'Azerbaijani', 'eu': 'Basque', 'be': 'Belarusian', 'bn': 'Bengali', 'bs': 'Bosnian',
    'bg': 'Bulgarian', 'ca': 'Catalan', 'ceb': 'Cebuano', 'ny': 'Chichewa', 'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)', 'co': 'Corsican', 'hr': 'Croatian', 'cs': 'Czech', 'da': 'Danish',
    'nl': 'Dutch', 'en': 'English', 'eo': 'Esperanto', 'et': 'Estonian', 'tl': 'Filipino', 'fi': 'Finnish',
    'fr': 'French', 'fy': 'Frisian', 'gl': 'Galician', 'ka': 'Georgian', 'de': 'German', 'el': 'Greek',
    'gu': 'Gujarati', 'ht': 'Haitian Creole', 'ha': 'Hausa', 'haw': 'Hawaiian', 'iw': 'Hebrew', 'hi': 'Hindi',
    'hmn': 'Hmong', 'hu': 'Hungarian', 'is': 'Icelandic', 'ig': 'Igbo', 'id': 'Indonesian', 'ga': 'Irish',
    'it': 'Italian', 'ja': 'Japanese', 'jw': 'Javanese', 'kn': 'Kannada', 'kk': 'Kazakh', 'km': 'Khmer',
    'ko': 'Korean', 'ku': 'Kurdish (Kurmanji)', 'ky': 'Kyrgyz', 'lo': 'Lao', 'la': 'Latin', 'lv': 'Latvian',
    'lt': 'Lithuanian', 'lb': 'Luxembourgish', 'mk': 'Macedonian', 'mg': 'Malagasy', 'ms': 'Malay',
    'ml': 'Malayalam', 'mt': 'Maltese', 'mi': 'Maori', 'mr': 'Marathi', 'mn': 'Mongolian', 'my': 'Myanmar (Burmese)',
    'ne': 'Nepali', 'no': 'Norwegian', 'ps': 'Pashto', 'fa': 'Persian', 'pl': 'Polish', 'pt': 'Portuguese',
    'pa': 'Punjabi', 'ro': 'Romanian', 'ru': 'Russian', 'sm': 'Samoan', 'gd': 'Scots Gaelic', 'sr': 'Serbian',
    'st': 'Sesotho', 'sn': 'Shona', 'sd': 'Sindhi', 'si': 'Sinhala', 'sk': 'Slovak', 'sl': 'Slovenian',
    'so': 'Somali', 'es': 'Spanish', 'su': 'Sundanese', 'sw': 'Swahili', 'sv': 'Swedish', 'tg': 'Tajik',
    'ta': 'Tamil', 'te': 'Telugu', 'th': 'Thai', 'tr': 'Turkish', 'uk': 'Ukrainian', 'ur': 'Urdu', 'uz': 'Uzbek',
    'vi': 'Vietnamese', 'cy': 'Welsh', 'xh': 'Xhosa', 'yi': 'Yiddish', 'yo': 'Yoruba', 'zu': 'Zulu'
};

// Populate language dropdowns
function populateLanguageDropdowns() {
    const fromLangSelect = document.getElementById('fromLang');
    const toLangSelect = document.getElementById('toLang');

    for (const [code, name] of Object.entries(languages)) {
        fromLangSelect.options.add(new Option(name, code));
        toLangSelect.options.add(new Option(name, code));
    }

    // Set default languages
    fromLangSelect.value = 'en';
    toLangSelect.value = 'es';
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', populateLanguageDropdowns);

// Select Elements
const textBox = document.querySelector(".input-container textarea");
const outputBox = document.querySelector(".output-container textarea");
const translateButton = document.querySelector(".translate-btn");
const switcher = document.querySelector(".switcher");
const fromLangSelect = document.getElementById('fromLang');
const toLangSelect = document.getElementById('toLang');

// track characters
function trackChars() {
    let textBoxLength = textBox.value.trim().length;
    document.querySelector(".length").textContent = `${textBoxLength}/500`;
}

// translate text
function translateText() {
    const textToTranslate = textBox.value.trim();
    const fromLang = fromLangSelect.value;
    const toLang = toLangSelect.value;

    if (textToTranslate) {
        showLoading(true);
        fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${fromLang}|${toLang}`)
            .then(response => response.json())
            .then(data => {
                const translation = data.responseData.translatedText;
                outputBox.value = translation;
                showLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                outputBox.value = 'Translation failed.';
                showLoading(false);
            });
    } else {
        outputBox.value = 'Please enter text to translate.';
    }
}

// switcher language
function switcherLang() {
    let temp = textBox.value.trim();
    textBox.value = outputBox.value.trim();
    outputBox.value = temp;

    [fromLangSelect.value, toLangSelect.value] = [toLangSelect.value, fromLangSelect.value];
}

// Event Listeners
textBox.addEventListener("input", trackChars);
translateButton.addEventListener("click", translateText);
switcher.addEventListener("click", switcherLang);

// read text
function readOutLoud(content, languageCode) {
    const utterance = new SpeechSynthesisUtterance(content.value.trim());
    utterance.lang = languageCode;
    speechSynthesis.speak(utterance);
}

// copy text
function copyText(content) {
    const textToCopy = content.value.trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
        console.log("Copied to clipboard");
        showCopiedMessage(content);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Show copied message
function showCopiedMessage(element) {
    const message = document.createElement('div');
    message.textContent = 'Copied!';
    message.style.position = 'absolute';
    message.style.backgroundColor = 'var(--primary)';
    message.style.color = 'white';
    message.style.padding = '5px 10px';
    message.style.borderRadius = '5px';
    message.style.fontSize = '12px';
    message.style.opacity = '0';
    message.style.transition = 'opacity 0.3s ease';

    const rect = element.getBoundingClientRect();
    message.style.top = `${rect.bottom + window.scrollY + 5}px`;
    message.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 2000);
}

// Add loading animation
function showLoading(show) {
    const translateBtn = document.querySelector('.translate-btn');
    if (show) {
        translateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Translating...';
        translateBtn.disabled = true;
    } else {
        translateBtn.innerHTML = '<i class="fas fa-language"></i> Translate';
        translateBtn.disabled = false;
    }
}

// Add smooth scrolling to mobile layout
function smoothScrollToOutput() {
    if (window.innerWidth <= 768) {
        const outputContainer = document.querySelector('.output-container');
        outputContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add animations for copy and sound buttons
function animateButton(button) {
    button.classList.add('animate-click');
    setTimeout(() => button.classList.remove('animate-click'), 200);
}

// Event listeners for buttons
document.querySelectorAll('.sound').forEach(button => {
    button.addEventListener('click', function() {
        const isInput = this.closest('.input-container');
        const content = isInput ? textBox : outputBox;
        const langCode = isInput ? fromLangSelect.value : toLangSelect.value;
        readOutLoud(content, langCode);
        animateButton(this);
    });
});

document.querySelectorAll('.copy').forEach(button => {
    button.addEventListener('click', function() {
        const content = this.closest('.input-container') ? textBox : outputBox;
        copyText(content);
        animateButton(this);
    });
});

translateButton.addEventListener('click', function() {
    translateText();
    smoothScrollToOutput();
});

// Initialize
populateLanguageDropdowns();
trackChars();