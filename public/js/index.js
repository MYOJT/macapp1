
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const id = document.getElementById('loginId').value; // 修正
  console.log(id);
  const password = document.getElementById('password').value;
  console.log(password);
  
  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password })
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
