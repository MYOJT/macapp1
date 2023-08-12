// Attach the function to your button
document.getElementById("addTodo").addEventListener('click',
  async function registerNewTodo() {
    const todoValue = document.getElementById("newTodo").value;
    const start_time = document.getElementById("start_time").value;
    const deadline_time = document.getElementById("deadline_time").value;
    // Validate the input data
    if (!todoValue) {
      alert('Todo cannot be empty!');
      return;
    }

    let userId;

    try {
      const response = await fetch('/api/getUserId');
      if (!response.ok) {
        throw new Error('ネットワーク応答が正しくありません');
      }
      const data = await response.json();
      userId = data.userId;
    } catch (error) {
      console.error('APIの呼び出し中に問題が発生しました:', error);
      return;  // Return here to prevent further execution
    }

    // Create a POST request to your API endpoint
    try {
      const response = await fetch('/api/addTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          todo: todoValue,
          start_time: start_time,
          deadline_time: deadline_time
        })
      });
      const data = await response.json();
      if (data.success) {
        alert('Todo added successfully!');
        // テーブルに新しい行を追加する
        const table = document.querySelector('table tbody');
        const newRow = table.insertRow();

        const startTimeCell = newRow.insertCell(0);
        startTimeCell.textContent = start_time;

        const deadlineTimeCell = newRow.insertCell(1);
        deadlineTimeCell.textContent = deadline_time;

        const todoValueCell = newRow.insertCell(2);
        todoValueCell.textContent = todoValue;

        const isFinishedCell = newRow.insertCell(3);
        const isFinishedButton = document.createElement('button');
        isFinishedButton.textContent = '完了';  // こちらは空または完了情報を追加する
        isFinishedButton.addEventListener('click', async function () {
          // 取り消し線のトグル処理
          if (newRow.style.textDecoration === 'line-through') {
            newRow.style.textDecoration = 'none';
          } else {
            newRow.style.textDecoration = 'line-through';
          }
          // サーバーにis_finishの更新を通知
          const isFinished = newRow.style.textDecoration === 'line-through';
          try {
            const response = await fetch('/api/updateTodoStatus', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                todoValue: todoValue,
                is_finish: isFinished
              })
            });

            if (!response.ok) {
              throw new Error('Failed to update todo status');
            }
          } catch (error) {
            console.error('Error updating todo status:', error);
          }
        });

        isFinishedCell.appendChild(isFinishedButton);

        const deleteCell = newRow.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '削除';
        deleteButton.addEventListener('click', async function () {
          try {
            const response = await fetch('/api/deleteTodo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                todoValue: todoValue
              })
            });

            if (!response.ok) {
              throw new Error('Failed to delete todo');
            }

            table.deleteRow(newRow.rowIndex);
          } catch (error) {
            console.error('Error deleting todo:', error);
          }
        });
        deleteCell.appendChild(deleteButton);
      } else {
        alert('Failed to add todo. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
