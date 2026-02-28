// travel_recommendation.js

// JSON Data (simulating external API)
const RECOMMENDATION_DATA = {
    "beaches": [
        {
            "id": 1,
            "name": "Bora Bora, French Polynesia",
            "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
            "description": "Turquoise lagoon, overwater bungalows, and stunning volcanic peaks. Perfect for honeymooners and luxury seekers."
        },
        {
            "id": 2,
            "name": "Whitehaven Beach, Australia",
            "imageUrl": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop",
            "description": "7km of pure white silica sand and crystal-clear waters. One of the world's most beautiful beaches."
        }
    ],
    "temples": [
        {
            "id": 3,
            "name": "Angkor Wat, Cambodia",
            "imageUrl": "https://images.unsplash.com/photo-1558391755-142a5b19f27b?q=80&w=2070&auto=format&fit=crop",
            "description": "The largest religious monument in the world, built in the 12th century. A masterpiece of Khmer architecture."
        },
        {
            "id": 4,
            "name": "Golden Temple, India",
            "imageUrl": "https://images.unsplash.com/photo-1621897691912-ee2a73fc38f3?q=80&w=1974&auto=format&fit=crop",
            "description": "Sacred Sikh shrine covered in real gold, surrounded by the holy sarovar. A symbol of peace and equality."
        }
    ],
    "countries": [
        {
            "id": 5,
            "name": "Sydney, Australia",
            "imageUrl": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
            "description": "Iconic Opera House, Harbour Bridge, and beautiful beaches. A vibrant city with endless activities."
        },
        {
            "id": 6,
            "name": "Tokyo, Japan",
            "imageUrl": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1974&auto=format&fit=crop",
            "description": "Neon-lit metropolis with ancient temples, amazing food, and unique culture. Where tradition meets future."
        }
    ]
};

// Current page state
let currentPage = 'home';

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
    displayRecommendations(RECOMMENDATION_DATA);
});

// Page navigation
function showPage(page) {
    // Hide all pages
    document.getElementById('home-page').classList.remove('active');
    document.getElementById('about-page').classList.remove('active');
    document.getElementById('contact-page').classList.remove('active');
    
    // Remove active class from all nav links
    document.getElementById('home-link').classList.remove('active');
    document.getElementById('about-link').classList.remove('active');
    document.getElementById('contact-link').classList.remove('active');
    
    // Show selected page
    document.getElementById(page + '-page').classList.add('active');
    document.getElementById(page + '-link').classList.add('active');
    
    currentPage = page;
    
    // If home page, show recommendations
    if (page === 'home') {
        displayRecommendations(RECOMMENDATION_DATA);
    }
}

// Display recommendations in grid
function displayRecommendations(data) {
    const grid = document.getElementById('results-grid');
    
    // Combine all recommendations - 2 each for beaches, temples, countries
    const allRecommendations = [
        ...data.beaches,
        ...data.temples,
        ...data.countries
    ];
    
    let html = '';
    allRecommendations.forEach(place => {
        html += `
            <div class="result-card">
                <img src="${place.imageUrl}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Search functionality
function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (query === '') {
        displayRecommendations(RECOMMENDATION_DATA);
        return;
    }
    
    // Switch to home page if not already there
    if (currentPage !== 'home') {
        showPage('home');
    }
    
    let results = {
        beaches: [],
        temples: [],
        countries: []
    };
    
    // Check for beach-related keywords
    if (query.includes('beach') || query.includes('beaches')) {
        results.beaches = RECOMMENDATION_DATA.beaches;
    }
    
    // Check for temple-related keywords
    if (query.includes('temple') || query.includes('temples')) {
        results.temples = RECOMMENDATION_DATA.temples;
    }
    
    // Check for country/city names
    if (query.includes('country') || query.includes('countries') || 
        query.includes('australia') || query.includes('japan')) {
        results.countries = RECOMMENDATION_DATA.countries;
    }
    
    // Check for specific country names
    if (query.includes('australia')) {
        results.countries = RECOMMENDATION_DATA.countries.filter(c => 
            c.name.includes('Australia')
        );
    }
    
    if (query.includes('japan')) {
        results.countries = RECOMMENDATION_DATA.countries.filter(c => 
            c.name.includes('Japan')
        );
    }
    
    // Check if any results found
    const hasResults = results.beaches.length > 0 || results.temples.length > 0 || results.countries.length > 0;
    
    if (hasResults) {
        const combined = [...results.beaches, ...results.temples, ...results.countries];
        const grid = document.getElementById('results-grid');
        
        let html = '';
        combined.forEach(place => {
            html += `
                <div class="result-card">
                    <img src="${place.imageUrl}" alt="${place.name}">
                    <h3>${place.name}</h3>
                    <p>${place.description}</p>
                </div>
            `;
        });
        
        grid.innerHTML = html;
    } else {
        document.getElementById('results-grid').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: rgba(255,255,255,0.1); border-radius: 15px;">
                <h3 style="color: #ffd700;">No results found for "${query}"</h3>
                <p>Try searching for: beach, temple, australia, japan, etc.</p>
            </div>
        `;
    }
}

// Clear results
function clearResults() {
    document.getElementById('searchInput').value = '';
    if (currentPage === 'home') {
        displayRecommendations(RECOMMENDATION_DATA);
    } else {
        showPage('home');
    }
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate sending email
    console.log('Contact form submitted:', { name, email, message });
    
    // Show success message
    alert(`Thank you ${name}! Your message has been sent successfully. We'll get back to you at ${email} within 24 hours.`);
    
    // Clear form
    document.getElementById('contactForm').reset();
}

// Make functions global
window.showPage = showPage;
window.performSearch = performSearch;
window.clearResults = clearResults;
window.handleContactSubmit = handleContactSubmit;