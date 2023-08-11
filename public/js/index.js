document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm'); // 修正

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('loginId').value; // 修正
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password })
    });

    if (response.ok) {
      window.location.href = '/todo.html'; // ログイン成功時にtodo.htmlに遷移
    } else {
      // ログイン失敗時の処理
      console.error('ログイン失敗');
    }
  });
});

