// handle new user signup
async function submitFormHandler(event) {
  event.preventDefault();

  const username = $('#username').val().trim();
  const email = $('#email').val().trim();
  const password = $('#password').val().trim();

  if (username && email && password) {
    // post the data to create a new user
    const response = await fetch('api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
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

$('#signup-form').on('submit', submitFormHandler);
