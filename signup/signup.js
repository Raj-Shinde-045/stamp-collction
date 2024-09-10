document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');
    
    if (password !== confirmPassword) {
        message.textContent = 'Passwords do not match.';
        message.style.color = 'red';
        return;
    }
    
    // Get existing users or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
        message.textContent = 'Username already exists. Please choose another.';
        message.style.color = 'red';
        return;
    }
    
    // Add new user
    users.push({ username, email, password });
    
    // Save updated users array
    localStorage.setItem('users', JSON.stringify(users));
    
    message.textContent = 'Sign up successful! Redirecting to login page...';
    message.style.color = 'green';
    
    // Redirect to login page after 2 seconds
    setTimeout(() => {
        window.location.href = '../Login/login.html';
    }, 2000);
});
