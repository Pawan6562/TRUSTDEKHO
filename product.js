// FILE: product.js
// Ye version screen par errors print karega taaki hume pata chale dikat kahan hai.

// 1. GLOBAL ERROR HANDLER (Agar code fatata hai to ye catch karega)
window.onerror = function(message, source, lineno, colno, error) {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.innerHTML = `
            <h3 style="color:red;">⚠️ CRITICAL ERROR (Code Crash)</h3>
            <p><strong>Error:</strong> ${message}</p>
            <p><strong>Line:</strong> ${lineno}</p>
            <p>Check console for more details.</p>
        `;
    }
    return false;
};

document.addEventListener('DOMContentLoaded', () => {
    
    // Debugging message
    console.log("Product JS Loaded successfully.");

    const loadingDiv = document.getElementById('loading');
    const contentDiv = document.getElementById('productContent');

    // 2. CHECK IF DATA FILE IS LOADED
    // Hum check kar rahe hain ki 'productdata.js' se 'productsData' variable aaya ya nahi
    if (typeof productsData === 'undefined' || !Array.isArray(productsData)) {
        loadingDiv.innerHTML = `
            <h3 style="color:red;">❌ Data File Error</h3>
            <p>Variable <code>productsData</code> nahi mila.</p>
            <p><strong>Solution:</strong> Check karein ki 'productdata.js' file mein koi syntax error (missing comma/bracket) to nahi hai?</p>
        `;
        return; // Yahi ruk jao
    }

    // 3. GET ID FROM URL
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    // Debugging
    console.log("URL ID Detected:", productId);

    // CASE A: URL mein ID hi nahi hai (e.g., product.html)
    if (!productId) {
        loadingDiv.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <h3>⚠️ No Product Selected</h3>
                <p>URL mein Product ID missing hai.</p>
                <a href="index.html" style="background:#2874f0; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Go to Home Page</a>
            </div>
        `;
        return;
    }

    // 4. FIND PRODUCT IN DATABASE
    // Note: '==' use kiya taaki string "1" aur number 1 match ho jayein
    const product = productsData.find(p => p.id == productId);

    // CASE B: ID to hai, par Database mein product nahi mila (e.g., product.html?id=99)
    if (!product) {
        loadingDiv.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <h3 style="color:orange;">🔍 Product Not Found</h3>
                <p>Sorry, Product ID <strong>${productId}</strong> hamare database mein nahi hai.</p>
                <a href="index.html" style="color:blue;">Return to Home</a>
            </div>
        `;
        return;
    }

    // CASE C: SUCCESS! Product mil gaya
    try {
        // --- UI HIDE/SHOW ---
        loadingDiv.style.display = 'none';
        contentDiv.style.display = 'grid';

        // --- FILL DATA ---
        document.getElementById('p-image').src = product.image || 'https://via.placeholder.com/400';
        document.getElementById('p-name').innerText = product.name;
        document.getElementById('p-rating').innerHTML = `${product.rating} <i class="fa-solid fa-star"></i>`;
        document.getElementById('p-price').innerText = `₹${product.price}`;
        document.getElementById('p-original').innerText = `₹${product.originalPrice}`;
        document.getElementById('p-discount').innerText = product.discount;
        
        if(document.getElementById('p-desc')) {
            document.getElementById('p-desc').innerText = product.desc;
        }

        // Helper function for icon
        const getPlatformIcon = (platform) => {
            if (platform === 'youtube') return '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
            if (platform === 'instagram') return '<i class="fa-brands fa-instagram" style="color: #E1306C;"></i>';
            return '<i class="fa-solid fa-link"></i>';
        };

        const platformIcon = getPlatformIcon(product.tester.platform);
        document.getElementById('p-tester').innerHTML = `
            <a href="${product.tester.link}" target="_blank" style="display:flex; align-items:center; gap:5px; color:#333; text-decoration:none;">
                Verified Tester: ${platformIcon} <strong>${product.tester.name}</strong> <i class="fa-solid fa-circle-check" style="color:#10b981;"></i>
            </a>
        `;

        // Buttons
        document.getElementById('buy-amazon').href = product.links.amazon;
        document.getElementById('buy-flipkart').href = product.links.flipkart;

        // Video Player Logic
        const playBtn = document.getElementById('playVideoBtn');
        const videoSection = document.getElementById('videoPlayerSection');
        const iframe = document.getElementById('youtubeFrame');
        const closeBtn = document.getElementById('closeVideoBtn');
        const imageBox = document.querySelector('.main-image-box');

        if (playBtn) {
            playBtn.onclick = function() {
                if(product.videoId) {
                    iframe.src = `https://www.youtube.com/embed/${product.videoId}?autoplay=1`;
                    imageBox.style.display = 'none';
                    videoSection.style.display = 'block';
                } else {
                    alert("Video Preview Not Available");
                }
            };
        }

        if (closeBtn) {
            closeBtn.onclick = function() {
                iframe.src = "";
                videoSection.style.display = 'none';
                imageBox.style.display = 'flex';
            };
        }

    } catch (err) {
        // Agar data bharte waqt koi error aaya
        console.error(err);
        loadingDiv.style.display = 'block';
        loadingDiv.innerHTML = `<h3 style="color:red;">Error Displaying Data: ${err.message}</h3>`;
    }
});
