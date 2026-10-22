// 1. HTMLの要素（部品）を取得する
const inputElement = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

//画面のタスク一覧をブラウザに保存する関数
const saveTasks = () => {
  const tasks = [];

// 画面にあるすべての <li> を集めて、1つずつ順番に処理する
todoList.querySelectorAll('li').forEach((li) => {
  tasks.push({
    text: li.firstChild.textContent,// タスクの文字だけを取得（「削除」を除く）
    completed: li.classList.contains('completed')// 取り消し線が付いているか（true または false）
  });
});

// データを文字（JSON形式）に変換して、'todos' という名前で保管庫に保存する
localStorage.setItem('todos' , JSON.stringify(tasks));
};
//<li>を作って画面に追加する処理を独立させる
const createTaskElement = (taskText, isCompleted = false) => {
  const newListItem = document.createElement('li');
  newListItem.textContent = taskText;

// もし完了状態のデータなら、最初から取り消し線をつける
if (isCompleted) {
  newListItem.classList.add('completed');
}
 //タスクをクリックしたら取り消し線にする
  newListItem.addEventListener('click' , () => {
    newListItem.classList.toggle('completed');
    saveTasks();
});
  // --- 削除ボタンを作る処理 ---
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';

    // 削除ボタンがクリックされたら、リストからそのタスク(li)を消す
  deleteButton.addEventListener('click' , (e) => {
    todoList.removeChild(newListItem);
    saveTasks();
  });

    // タスク(li)の右側に、削除ボタンを追加する
  newListItem.appendChild(deleteButton);
    // 5. 作った <li> を <ul>（リスト）の中に追加する
  todoList.appendChild(newListItem);
};

//にゅ力欄から新しいタスクを追加する処理
const addTask = () => {
  const taskText = inputElement.value;

  if (taskText === '') {
    return;
  }

  //画面にタスクを作成して追加する
  createTaskElement(taskText);
  saveTasks();

    // 6. 次のタスクを入力しやすいように、入力欄を空っぽに戻す
  inputElement.value = '';
};

//保存されたエータを読み込んでロードされる関数
const loadTasks =() => {
  const savedTasks = localStorage.getItem('todos');//保管庫からデータを取り出す

  if(savedTasks) {
    //文字（JSON形式）からJavaScriptの配列に戻し、1つずつ画面に復活させる
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => {
      createTaskElement(task.text, task.completed);
    });
  }
};
    //追加ボタンがクリックした時にaddTaskを実行する
  addButton.addEventListener('click' , addTask);

  //入力欄でキーボードのキーが押されたときの処理
  inputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
});
//ぺージを開いた瞬間にロード機能を実行する
loadTasks();