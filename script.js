// FILE: script.js (For Index Page Only)

// Helper Function for Icons
function getPlatformIcon(platform) {
    if (platform === 'youtube') return '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
    if (platform === 'instagram') return '<i class="fa-brands fa-instagram" style="color: #E1306C;"></i>';
    return '<i class="fa-solid fa-link"></i>';
}

// Card Creator Function
function createProductCard(product) {
    const platformIcon = getPlatformIcon(product.tester.platform);
    
    return `
        <article class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
            <div class="card-img">
                <div class="video-tag"><i class="fa-solid fa-play"></i> Video Inside</div>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="card-details">
                <div class="rating-badge">${product.rating} <i class="fa-solid fa-star"></i></div>
                <h4>${product.name}</h4>
                <div class="price-area">
                    <span class="current-price">₹${product.price}</span>
                    <span class="discount">${product.discount}</span>
                </div>
                <div class="tester-note">
                    Tested by: 
                    <a href="${product.tester.link}" target="_blank" onclick="event.stopPropagation()">
                        ${platformIcon} <strong>${product.tester.name}</strong>
                    </a>
                </div>
            </div>
        </article>
    `;
}

// Main Execution for Home Page
document.addEventListener('DOMContentLoaded', () => {
    // Note: productsData hume 'products.js' se mil raha hai automatically
    
    const electronicsContainer = document.getElementById('electronicsContainer');
    const fashionContainer = document.getElementById('fashionContainer');

    if(electronicsContainer) {
        // Filter Electronics from Central Data
        const electronicsData = productsData.filter(p => p.category === 'electronics');
        electronicsContainer.innerHTML = electronicsData.map(createProductCard).join('');
    }
    
    if(fashionContainer) {
        // Filter Fashion from Central Data
        const fashionData = productsData.filter(p => p.category === 'fashion');
        fashionContainer.innerHTML = fashionData.map(createProductCard).join('');
    }
});
