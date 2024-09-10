document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = '../Login/login.html';
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = '../index.html';
    });

    // Generate 100 stamps
    const stampsDatabase = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Indian Stamp ${i + 1}`,
        year: 1900 + Math.floor(Math.random() * 123), // Random year between 1900 and 2022
        price: `₹${Math.floor(Math.random() * 10000)}`,
        category: ['Historical', 'Wildlife', 'Monuments', 'National Symbols', 'Personalities'][Math.floor(Math.random() * 5)],
        icon: 'fas fa-stamp' // Font Awesome stamp icon
    }));

    const itemsPerPage = 20;
    let currentPage = 1;

    function displayStamps(stamps, page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedStamps = stamps.slice(startIndex, endIndex);

        const productGrid = document.getElementById('featured-products');
        productGrid.innerHTML = ''; // Clear existing products

        const template = document.getElementById('stamp-template');

        paginatedStamps.forEach(stamp => {
            const stampElement = template.content.cloneNode(true);
            
            // Front of the card
            stampElement.querySelector('.card-front .image-container').innerHTML = `<i class="${stamp.icon} fa-4x"></i>`;
            stampElement.querySelector('.card-front .stamp-name').textContent = stamp.name;
            stampElement.querySelector('.card-front .stamp-year').textContent = `Year: ${stamp.year}`;
            stampElement.querySelector('.card-front .stamp-price').textContent = stamp.price;
            stampElement.querySelector('.card-front .stamp-category').textContent = `Category: ${stamp.category}`;

            // Back of the card
            stampElement.querySelector('.card-back .stamp-name').textContent = stamp.name;
            stampElement.querySelector('.card-back .stamp-description').textContent = `Description for ${stamp.name}`;
            stampElement.querySelector('.card-back .stamp-year').textContent = `Year: ${stamp.year}`;
            stampElement.querySelector('.card-back .stamp-price').textContent = stamp.price;
            stampElement.querySelector('.card-back .stamp-category').textContent = `Category: ${stamp.category}`;

            // Add click event to flip the card
            stampElement.querySelector('.product-item').addEventListener('click', function(e) {
                if (!e.target.closest('.add-to-cart')) {
                    this.classList.toggle('flipped');
                }
            });

            // Modify the add-to-cart event listener
            stampElement.querySelector('.add-to-cart').addEventListener('click', (e) => {
                e.stopPropagation();
                alert(`Added ${stamp.name} to cart!`);
                // Optionally, flip the card back after adding to cart
                e.target.closest('.product-item').classList.remove('flipped');
            });

            productGrid.appendChild(stampElement);
        });

        updatePaginationControls(stamps.length);
    }

    function updatePaginationControls(totalItems) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginationContainer = document.getElementById('pagination-controls');
        paginationContainer.innerHTML = '';

        // Previous button
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayStamps(stampsDatabase, currentPage);
            }
        });
        paginationContainer.appendChild(prevButton);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayStamps(stampsDatabase, currentPage);
            });
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayStamps(stampsDatabase, currentPage);
            }
        });
        paginationContainer.appendChild(nextButton);
    }

    // Initial display
    displayStamps(stampsDatabase, currentPage);

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const searchResults = stampsDatabase.filter(stamp => 
            stamp.name.toLowerCase().includes(searchTerm) ||
            stamp.category.toLowerCase().includes(searchTerm) ||
            stamp.year.toString().includes(searchTerm)
        );

        currentPage = 1; // Reset to first page for search results
        displayStamps(searchResults, currentPage);
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // You might want to display a welcome message using the currentUser
    const welcomeMessage = document.createElement('h2');
    welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
    document.querySelector('main').insertBefore(welcomeMessage, document.querySelector('main').firstChild);

    // Account button functionality
    const accountBtn = document.getElementById('account-btn');
    accountBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior
        window.location.href = '../account/acc.html';
    });
});
