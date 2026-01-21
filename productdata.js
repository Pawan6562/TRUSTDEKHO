// FILE: productdata.js
// Isme sirf data rahega. Ye tera DATABASE hai.

const productsData = [
    {
        id: 1,
        name: "Boat Airdopes 141 - ANC",
        category: "electronics",
        price: "1,299",
        originalPrice: "2,999",
        discount: "56% off",
        rating: 4.5,
        image: "https://m.media-amazon.com/images/I/61t-XG6vTUL._SL1500_.jpg",
        desc: "Best budget earbuds with ANC. Bass heavy sound, perfect for gym and travel. 42H Playtime.",
        videoId: "vA2jM4yVd0A",
        tester: {
            name: "Tech Burner",
            platform: "youtube",
            link: "https://www.youtube.com/@TechBurner", 
            verified: true
        },
        links: {
            amazon: "https://www.amazon.in/dp/example",
            flipkart: "https://www.flipkart.com/example"
        }
    }, // <--- YE COMMA BOHOT ZAROORI HAI (Jab naya product add karo)
    {
        id: 2,
        name: "Sony WH-1000XM5 Noise Cancelling",
        category: "electronics",
        price: "19,990",
        originalPrice: "24,990",
        discount: "20% off",
        rating: 4.8,
        image: "https://m.media-amazon.com/images/I/51SKmu2G9FL._SL1200_.jpg",
        desc: "Industry leading noise cancellation. Extremely comfortable but expensive.",
        videoId: "2t5q3Xo6b8Y",
        tester: {
            name: "Gyan Therapy",
            platform: "instagram",
            link: "https://www.instagram.com/gyantherapy/",
            verified: true
        },
        links: {
            amazon: "https://www.amazon.in",
            flipkart: "https://www.flipkart.com"
        }
    }
    // Aur products yahan comma laga kar add karna...
];
