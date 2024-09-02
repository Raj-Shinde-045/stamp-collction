// Sample data for catalog items
const catalogItems = [
    { id: 1, name: "Ajanta_Panel", image: "img/stamps/ajanta.jpeg", price: 50000, category: "Stamps" },
    { id: 2, name: "Indian_UN_Force_in_Gaza_Palestine", image: "img/stamps/un.jpeg", price: 25000, category: "Stamps" },
    { id: 3, name: "1948 Gandhi Memorial", image: "img/stamps/1948.jpg", price: 10000, category: "Stamps" },
    // Add more rare Indian stamps as needed
];

// Sample data for cancellation releases
const cancellationItems = [
    { id: 1, name: "First Day Cover", image: "fdc1.jpg", date: "2023-05-01" },
    { id: 2, name: "Special Postmark", image: "postmark1.jpg", date: "2023-06-15" },
    // Add more items as needed
];

// Function to display catalog items with lazy loading
function displayCatalogItems(items) {
    const catalogContainer = document.getElementById("catalog-items");
    catalogContainer.innerHTML = "";
    items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
            <img src="placeholder.jpg" data-src="${item.image}" alt="${item.name}" class="lazy-image">
            <h3>${item.name}</h3>
            <p class="item-price">Price: ₹${item.price}</p>
            <p class="item-category">Category: ${item.category}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        catalogContainer.appendChild(itemElement);
    });

    // Initialize lazy loading
    lazyLoad();
}

// Modify the lazyLoad function
function lazyLoad() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => {
                    img.classList.remove('lazy-image');
                    img.classList.add('loaded');
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${img.dataset.src}`);
                    img.src = 'placeholder.jpg'; // Use a placeholder image on error
                    img.classList.remove('lazy-image');
                    img.classList.add('loaded');
                };
                imageObserver.unobserve(img);
            }
        });
    }, options);

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Function to display cancellation releases
function displayCancellationItems() {
    const cancellationContainer = document.getElementById("cancellation-items");
    cancellationItems.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Release Date: ${item.date}</p>
        `;
        cancellationContainer.appendChild(itemElement);
    });
}

// Function to add item to cart
function addToCart(itemId) {
    console.log(`Item ${itemId} added to cart`);
    // Implement cart functionality here
    updateCartCount();
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    // For now, just increment the count. In a real app, you'd get the actual cart size.
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
}

// Function to filter and search catalog items
function filterAndSearchItems() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filterSelect = document.getElementById("filter-select").value.toLowerCase();
    const catalogItems = document.querySelectorAll("#catalog-items .item");

    catalogItems.forEach(item => {
        const name = item.querySelector("h3").textContent.toLowerCase();
        const category = item.querySelector(".item-category").textContent.toLowerCase();
        
        const matchesSearch = name.includes(searchInput);
        const matchesFilter = filterSelect === "" || category.includes(filterSelect);
        
        item.style.display = matchesSearch && matchesFilter ? "block" : "none";
    });
}

// Modify the handleIntersection function
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Trigger animations for child elements if needed
            entry.target.querySelectorAll('.item').forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
            // ... rest of your existing code ...
        }
    });
}

// Modify the init function
function init() {
    displayCatalogItems(catalogItems);
    displayCancellationItems();
    preloadImages(catalogItems);
    // ... rest of your init function
    animateOnScroll();
}

// Run initialization when the page loads
window.onload = init;

// Create an Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1, // Trigger when 10% of the section is visible
    rootMargin: '0px 0px -10% 0px' // Start loading slightly before the section is in view
});

// Observe each section
document.querySelectorAll('main section').forEach(section => {
    observer.observe(section);
});

function preloadImages(images) {
    images.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
}

// Add this function to your existing JavaScript
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
}
