document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    
    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        message.textContent = 'Login successful!';
        message.style.color = 'green';
        
        // Save current user
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to home page
        setTimeout(() => {
            window.location.href = '../HomePage/home.html';
        }, 2000);
    } else {
        message.textContent = 'Invalid username or password.';
        message.style.color = 'red';
    }
});
