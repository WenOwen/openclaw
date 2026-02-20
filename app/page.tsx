'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // 从 localStorage 加载数据
  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return (
    <div className="min-h-screen tech-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            TodoList
          </h1>
          <p className="text-gray-400 text-sm">Manage your tasks efficiently</p>
        </div>

        {/* 输入框 */}
        <div className="gradient-border mb-6">
          <div className="p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new task..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
              />
              <button
                onClick={addTodo}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity neon-glow"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* 过滤器和统计 */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-2">
              {(['all', 'active', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === f
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex gap-4 text-sm">
              <span className="text-cyan-400">Total: {stats.total}</span>
              <span className="text-purple-400">Active: {stats.active}</span>
              <span className="text-pink-400">Done: {stats.completed}</span>
            </div>
          </div>
        </div>

        {/* Todo 列表 */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No tasks here yet</p>
                <p className="text-sm mt-2">Add a task to get started!</p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`border-b border-white/5 p-4 hover:bg-white/5 transition-colors ${
                    todo.completed ? 'opacity-60' : ''
                  }`}
                >
                  {editingId === todo.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className="px-4 py-2 bg-green-500 rounded font-medium text-white hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-red-500 rounded font-medium text-white hover:bg-red-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 rounded border-2 border-cyan-400 bg-transparent checked:bg-cyan-500 cursor-pointer"
                      />
                      <span
                        className={`flex-1 ${
                          todo.completed
                            ? 'line-through text-gray-500'
                            : 'text-white'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => startEdit(todo)}
                        className="px-3 py-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-3 py-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Click the checkbox to mark tasks as completed</p>
        </div>
      </div>
    </div>
  );
}
