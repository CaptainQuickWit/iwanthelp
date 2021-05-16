// LOGIN 
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/members/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the meshboard page
      document.location.replace('/meshboard');
    } else {
      alert(response.statusText);
    }
  }
};

// SIGNUP 
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();

  const password = document.querySelector('#password-signup').value.trim();

  const first_name = document.querySelector('#first_name-signup').value.trim();

  const last_name = document.querySelector('#last_name-signup').value.trim();

  const email = document.querySelector('#email-signup').value.trim();

  const school_and_program = document.querySelector('#school_and_program-signup').value.trim();

  if (username && password && first_name && last_name && email && school_and_program) {
    const response = await fetch('/api/members', {
      method: 'POST',
      body: JSON.stringify({ username, password, first_name, last_name, email, school_and_program }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
