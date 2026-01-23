// FILE: productdata.js

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
        
        gallery: [
            { type: 'image', url: "https://m.media-amazon.com/images/I/61t-XG6vTUL._SL1500_.jpg" },
            { type: 'image', url: "https://m.media-amazon.com/images/I/51O0S8v0+BL._SL1500_.jpg" },
            { type: 'image', url: "https://m.media-amazon.com/images/I/61j39j+ko6L._SL1500_.jpg" },
            // Video without poster (Fallback use karega)
            { type: 'video', url: "https://www.w3schools.com/html/mov_bbb.mp4" } 
        ],

        desc: "Best budget earbuds with ANC. Bass heavy sound. 42H Playtime.",
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
    },
    {
        id: 2,
        name: "Sony WH-1000XM5 Noise Cancelling",
        category: "electronics",
        price: "19,990",
        originalPrice: "24,990",
        discount: "20% off",
        rating: 4.8,
        image: "https://m.media-amazon.com/images/I/51SKmu2G9FL._SL1200_.jpg",
        
        gallery: [
            { type: 'image', url: "https://m.media-amazon.com/images/I/51SKmu2G9FL._SL1200_.jpg" },
            { type: 'image', url: "https://m.media-amazon.com/images/I/61C66qTqnwL._AC_AIweblab1006854,T4_FMavif_SF1050,1050_PQ64_.jpg?aicid=detailPage-mediaBlock" },
            // VIDEO MEIN "POSTER" ADD KIYA HAI (Thumbnail ke liye)
            { 
                type: 'video', 
                url: "https://www.w3schools.com/html/movie.mp4",
                poster: "https://m.media-amazon.com/images/I/61C66qTqnwL._AC_AIweblab1006854,T4_FMavif_SF1050,1050_PQ64_.jpg?aicid=detailPage-mediaBlock" // Ye photo dikhegi thumbnail mein
            },
            { type: 'image', url: "https://m.media-amazon.com/images/I/61C66qTqnwL._AC_AIweblab1006854,T4_FMavif_SF1050,1050_PQ64_.jpg?aicid=detailPage-mediaBlock" }
        ],

        desc: "Industry leading noise cancellation. Extremely comfortable.",
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
];
