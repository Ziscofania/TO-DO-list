document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/todos');
      const todos = await response.json();
      renderTodos(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Render todos to the DOM
  const renderTodos = (todos) => {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.dataset.id = todo._id;

      li.innerHTML = `
        <span>${todo.title}</span>
        <div class="todo-actions">
          <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      todoList.appendChild(li);
    });
  };

  // Add new todo
  todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = todoInput.value.trim();

    if (title) {
      try {
        const response = await fetch('http://localhost:5000/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });

        const newTodo = await response.json();
        todoInput.value = '';
        fetchTodos();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  });

  // Handle complete and delete actions
  todoList.addEventListener('click', async (e) => {
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;

    const id = todoItem.dataset.id;

    if (e.target.classList.contains('complete-btn')) {
      try {
        const currentState = todoItem.classList.contains('completed');
        await fetch(`http://localhost:5000/api/todos/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: !currentState }),
        });
        fetchTodos();
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }

    if (e.target.classList.contains('delete-btn')) {
      try {
        await fetch(`http://localhost:5000/api/todos/${id}`, {
          method: 'DELETE',
        });
        fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  });

  // Initial fetch
  fetchTodos();
});