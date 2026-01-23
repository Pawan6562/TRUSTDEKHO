// FILE: product.js (With Swipe & Custom Player)

const getPlatformIcon = (platform) => {
    if (platform === 'youtube') return '<i class="fa-brands fa-youtube" style="color: #ff0000;"></i>';
    if (platform === 'instagram') return '<i class="fa-brands fa-instagram" style="color: #E1306C;"></i>';
    return '<i class="fa-solid fa-link"></i>';
};

document.addEventListener('DOMContentLoaded', () => {
    
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const loadingDiv = document.getElementById('loading');
    const contentDiv = document.getElementById('productContent');

    if (!productId || typeof productsData === 'undefined') {
        loadingDiv.innerHTML = "<h3>Error: Product Not Found</h3>";
        return;
    }

    const product = productsData.find(p => p.id == productId);

    if (product) {
        loadingDiv.style.display = 'none';
        contentDiv.style.display = 'grid';

        // Basic Info Fill
        document.getElementById('p-name').innerText = product.name;
        document.getElementById('p-rating').innerHTML = `${product.rating} <i class="fa-solid fa-star"></i>`;
        document.getElementById('p-price').innerText = `₹${product.price}`;
        document.getElementById('p-original').innerText = `₹${product.originalPrice}`;
        document.getElementById('p-discount').innerText = product.discount;
        if(document.getElementById('p-desc')) document.getElementById('p-desc').innerText = product.desc;

        const platformIcon = getPlatformIcon(product.tester.platform);
        document.getElementById('p-tester').innerHTML = `
            <a href="${product.tester.link}" target="_blank" style="display:flex; align-items:center; gap:5px; color:#333; text-decoration:none;">
                Verified Tester: ${platformIcon} <strong>${product.tester.name}</strong> <i class="fa-solid fa-circle-check" style="color:#10b981;"></i>
            </a>
        `;
        document.getElementById('buy-amazon').href = product.links.amazon;
        document.getElementById('buy-flipkart').href = product.links.flipkart;

        // --- ADVANCED GALLERY LOGIC ---
        const mainDisplay = document.getElementById('mainDisplay');
        const thumbnailList = document.getElementById('thumbnailList');
        const gallery = product.gallery || [{ type: 'image', url: product.image }];
        
        let currentIndex = 0;

        // Function to Render Media
        const renderMedia = (index) => {
            const item = gallery[index];
            mainDisplay.innerHTML = ''; // Clear

            // Add Navigation Arrows
            mainDisplay.innerHTML += `
                <div class="nav-arrow nav-prev" onclick="prevSlide()"><i class="fa-solid fa-chevron-left"></i></div>
                <div class="nav-arrow nav-next" onclick="nextSlide()"><i class="fa-solid fa-chevron-right"></i></div>
            `;

            if (item.type === 'video') {
                // CUSTOM VIDEO PLAYER HTML
                const videoHTML = `
                    <div class="custom-video-wrapper">
                        <video id="activeVideo" src="${item.url}" poster="${item.poster || ''}"></video>
                        <div class="center-play-btn" onclick="togglePlay()"><i class="fa-solid fa-play"></i></div>
                        <div class="video-controls">
                            <button class="control-btn" onclick="togglePlay()"><i class="fa-solid fa-play" id="playIcon"></i></button>
                            <div class="progress-container" onclick="seekVideo(event)">
                                <div class="progress-fill" id="progressBar"></div>
                            </div>
                            <button class="control-btn" onclick="toggleMute()"><i class="fa-solid fa-volume-high" id="volIcon"></i></button>
                        </div>
                    </div>
                `;
                mainDisplay.innerHTML += videoHTML;
                setupVideoEvents(); // Initialize player logic
            } else {
                // IMAGE
                mainDisplay.innerHTML += `<img src="${item.url}" alt="Product View">`;
            }

            // Update Thumbnails
            updateThumbnails(index);
        };

        // Update Thumbnail Styles
        const updateThumbnails = (index) => {
            document.querySelectorAll('.thumb-item').forEach((thumb, idx) => {
                if (idx === index) {
                    thumb.classList.add('active');
                    thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    thumb.classList.remove('active');
                }
            });
        };

        // Initialize Thumbnails List
        thumbnailList.innerHTML = gallery.map((item, index) => {
            let thumbContent = '';
            // Use 'poster' for video thumbnail if available
            let thumbImg = item.type === 'video' && item.poster ? item.poster : item.url;
            
            if (item.type === 'video') {
                thumbContent = `
                    <div class="video-indicator"><i class="fa-solid fa-play"></i></div>
                    <img src="${thumbImg}" alt="Video" onerror="this.src='https://via.placeholder.com/100?text=VIDEO'">
                `;
            } else {
                thumbContent = `<img src="${thumbImg}" alt="View ${index}">`;
            }

            return `<div class="thumb-item ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})">${thumbContent}</div>`;
        }).join('');

        // --- NAVIGATION FUNCTIONS ---
        window.goToSlide = (index) => {
            currentIndex = index;
            renderMedia(currentIndex);
        };

        window.nextSlide = () => {
            currentIndex = (currentIndex + 1) % gallery.length; // Loop back to start
            renderMedia(currentIndex);
        };

        window.prevSlide = () => {
            currentIndex = (currentIndex - 1 + gallery.length) % gallery.length; // Loop to end
            renderMedia(currentIndex);
        };

        // --- TOUCH SWIPE LOGIC (Mobile) ---
        let touchStartX = 0;
        let touchEndX = 0;

        mainDisplay.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        mainDisplay.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) nextSlide(); // Swipe Left -> Next
            if (touchEndX > touchStartX + 50) prevSlide(); // Swipe Right -> Prev
        };

        // --- CUSTOM VIDEO PLAYER FUNCTIONS ---
        window.togglePlay = () => {
            const video = document.getElementById('activeVideo');
            const centerBtn = document.querySelector('.center-play-btn');
            const playIcon = document.getElementById('playIcon');

            if (video.paused) {
                video.play();
                centerBtn.style.display = 'none'; // Hide center button
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');
            } else {
                video.pause();
                centerBtn.style.display = 'block'; // Show center button
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');
            }
        };

        window.toggleMute = () => {
            const video = document.getElementById('activeVideo');
            const volIcon = document.getElementById('volIcon');
            video.muted = !video.muted;
            if(video.muted) {
                volIcon.classList.remove('fa-volume-high');
                volIcon.classList.add('fa-volume-xmark');
            } else {
                volIcon.classList.remove('fa-volume-xmark');
                volIcon.classList.add('fa-volume-high');
            }
        };

        window.seekVideo = (e) => {
            const video = document.getElementById('activeVideo');
            const progressBar = document.querySelector('.progress-container');
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        };

        function setupVideoEvents() {
            const video = document.getElementById('activeVideo');
            const bar = document.getElementById('progressBar');
            if(video) {
                video.addEventListener('timeupdate', () => {
                    const percent = (video.currentTime / video.duration) * 100;
                    bar.style.width = `${percent}%`;
                });
                // Video khatam hone pe reset
                video.addEventListener('ended', () => {
                    document.querySelector('.center-play-btn').style.display = 'block';
                    document.getElementById('playIcon').classList.remove('fa-pause');
                    document.getElementById('playIcon').classList.add('fa-play');
                });
            }
        }

        // Initialize First Slide
        renderMedia(0);

    } else {
        loadingDiv.innerHTML = "<h2>Product Not Found!</h2>";
    }
});
