let API_URL = "https://6820588072e59f922ef8614b.mockapi.io/users"
let users = [];
let userForm = document.getElementById('userForm');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let userList = document.getElementById('userList');
let errorMsg = document.getElementById('error');

async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    users = await response.json();
    displayUsers();
  } catch (err) {
    errorMsg.textContent = 'Failed to fetch users.';
  }
}

function displayUsers() {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${user.name}</strong><span>${user.email}</span>`;
    userList.appendChild(li);
  });
}

userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (users.some(user => user.email === email)) {
    errorMsg.textContent = 'User with this email already exists.';
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    const newUser = await response.json();
    users.push(newUser);
    displayUsers();
    userForm.reset();
    errorMsg.textContent = '';
  } catch (err) {
    errorMsg.textContent = 'Error adding user.';
  }
});

fetchUsers();
    