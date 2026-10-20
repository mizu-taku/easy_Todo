// 1. HTMLの要素（部品）を取得する
const inputElement = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

// 2. 「追加」ボタンがクリックされたときの処理を設定する
addButton.addEventListener('click', function() {

  // 3. 入力欄に入っている文字を取得する
  const taskText = inputElement.value;

  // もし入力欄が空っぽなら、何もせずにここで処理を終わる
  if (taskText === '') {
    return;
  }

  // 4. 新しい <li> 要素（タスクの枠）をJavaScriptで作る
  const newListItem = document.createElement('li');
  newListItem.textContent = taskText; // <li>の中身を入力された文字にする
  //タスクをクリックしたら取り消し線にする
  newListItem.addEventListener('click' , () => {
    newListItem.classList.toggle('completed');
  });

  // --- 削除ボタンを作る処理 ---
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';

  // 削除ボタンがクリックされたら、リストからそのタスク(li)を消す
  deleteButton.addEventListener('click' , () => {
    todoList.removeChild(newListItem);
  });
  // タスク(li)の右側に、削除ボタンを追加する
  newListItem.appendChild(deleteButton);

  // 5. 作った <li> を <ul>（リスト）の中に追加する
  todoList.appendChild(newListItem);

  // 6. 次のタスクを入力しやすいように、入力欄を空っぽに戻す
  inputElement.value = '';
});