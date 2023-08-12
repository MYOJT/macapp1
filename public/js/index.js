'use strict';
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const name = document.getElementById('loginId').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, password })
    });

    if (response.ok) {
      window.location.href = 'html/todo.html'; 
    } else {
      console.error('ログイン失敗');
    }
  } catch (error) {
    console.error('通信エラー:', error);
  }
});
