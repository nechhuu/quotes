const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuoteBtn');

// API configuration
const API_URL = 'https://api.api-ninjas.com/v2/randomquotes';
const API_KEY = 'c2D7ZuSEaNV/6SMFNlbpWA==sAJVuUACwLt8rLQn';

async function getRandomQuote() {
    try {

        newQuoteBtn.disabled = true;
        quoteElement.classList.add('loading');
        authorElement.classList.add('loading');

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'X-Api-Key': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }

        const data = await response.json();

        // API Ninjas returns an array of quotes, get the first one
        const quote = Array.isArray(data) ? data[0] : data;

        // Update the quote and author
        quoteElement.textContent = quote.quote;
        authorElement.textContent = `-${quote.author}`;

        // Remove loading state
        quoteElement.classList.remove('loading');
        authorElement.classList.remove('loading');
        newQuoteBtn.disabled = false;

    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = 'Failed to load quote. Please try again.';
        authorElement.textContent = '';
        quoteElement.classList.remove('loading');
        authorElement.classList.remove('loading');
        newQuoteBtn.disabled = false;
    }
}

// Add click event listener to the button
newQuoteBtn.addEventListener('click', getRandomQuote);

// Load a quote when the page loads
window.addEventListener('DOMContentLoaded', getRandomQuote);
