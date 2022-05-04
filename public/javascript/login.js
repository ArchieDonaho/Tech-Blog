// handle login functionality
async function loginFormHandler(event) {
  event.preventDefault();

  const email = $('#email').val().trim();
  const password = $('#password').val().trim();

  console.log(email, password);

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

$('#login-form').on('submit', loginFormHandler);
