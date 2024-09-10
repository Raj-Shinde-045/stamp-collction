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

    // Update profile information
    document.getElementById('username').textContent = currentUser.username;
    document.getElementById('bio').textContent = currentUser.bio || 'No bio yet.';
    if (currentUser.profilePic) {
        document.getElementById('profile-pic').src = currentUser.profilePic;
    }

    // Mock data for stamps
    const personalStamps = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Personal Stamp ${i + 1}`,
        year: 2000 + Math.floor(Math.random() * 23),
        price: `₹${Math.floor(Math.random() * 5000)}`,
        category: ['Historical', 'Wildlife', 'Monuments', 'National Symbols', 'Personalities'][Math.floor(Math.random() * 5)],
        icon: 'fas fa-stamp'
    }));

    const collabStamps = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Collab Stamp ${i + 1}`,
        year: 2010 + Math.floor(Math.random() * 13),
        price: `₹${Math.floor(Math.random() * 10000)}`,
        category: ['Joint Issue', 'International Exhibition', 'Commemorative', 'Special Edition', 'Limited Series'][Math.floor(Math.random() * 5)],
        icon: 'fas fa-handshake'
    }));

    // Function to display stamps
    function displayStamps(stamps, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        const template = document.getElementById('stamp-template');
        stamps.forEach(stamp => {
            const stampElement = template.content.cloneNode(true);
            
            stampElement.querySelector('.image-container').innerHTML = `<i class="${stamp.icon} fa-4x"></i>`;
            stampElement.querySelector('.stamp-name').textContent = stamp.name;
            stampElement.querySelector('.stamp-year').textContent = `Year: ${stamp.year}`;
            stampElement.querySelector('.stamp-price').textContent = stamp.price;
            stampElement.querySelector('.stamp-category').textContent = `Category: ${stamp.category}`;

            // Remove the click event listener for flipping
            // stampElement.querySelector('.stamp-item').addEventListener('click', function() {
            //     this.classList.toggle('flipped');
            // });

            container.appendChild(stampElement);
        });
    }

    // Display personal stamps initially
    displayStamps(personalStamps, 'personal-stamps');

    // Navigation functionality
    const navButtons = document.querySelectorAll('.profile-nav button');
    const contentSections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-target');
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(target).style.display = 'grid';
            if (target === 'collab-stamps') {
                displayStamps(collabStamps, 'collab-stamps');
            }
        });
    });

    // Edit profile functionality (you can expand this as needed)
    document.getElementById('edit-profile').addEventListener('click', function() {
        alert('Edit profile functionality to be implemented');
    });

    // Update stats (you can replace these with actual data)
    document.getElementById('posts-count').textContent = personalStamps.length + collabStamps.length;
    document.getElementById('followers-count').textContent = Math.floor(Math.random() * 1000);
    document.getElementById('following-count').textContent = Math.floor(Math.random() * 500);
});
