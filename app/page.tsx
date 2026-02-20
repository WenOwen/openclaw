'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  priority: 'high' | 'medium' | 'low';
}

type Priority = 'high' | 'medium' | 'low';

const priorityConfig = {
  high: { label: '高', color: 'from-red-500 to-orange-500', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/50', textColor: 'text-red-400' },
  medium: { label: '中', color: 'from-yellow-500 to-amber-500', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/50', textColor: 'text-yellow-400' },
  low: { label: '低', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/50', textColor: 'text-green-400' },
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority>('medium');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState<Priority>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

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
        priority: selectedPriority,
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
      setSelectedPriority('medium');
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
    setEditPriority(todo.priority);
  };

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim(), priority: editPriority } : todo
      ));
      setEditingId(null);
      setEditText('');
      setEditPriority('medium');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditPriority('medium');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }).filter(todo => {
    if (priorityFilter === 'all') return true;
    return todo.priority === priorityFilter;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
    high: todos.filter(t => t.priority === 'high').length,
    medium: todos.filter(t => t.priority === 'medium').length,
    low: todos.filter(t => t.priority === 'low').length,
  };

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen tech-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            TodoList
          </h1>
          <p className="text-gray-400 text-sm">管理你的任务 · 智能优先级</p>
        </div>

        {/* 输入框 */}
        <div className="gradient-border mb-6">
          <div className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  placeholder="添加新任务..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
                <button
                  onClick={addTodo}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity neon-glow"
                >
                  添加
                </button>
              </div>
              {/* 优先级选择 */}
              <div className="flex gap-2 items-center">
                <span className="text-gray-400 text-sm">优先级:</span>
                {(Object.keys(priorityConfig) as Priority[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPriority(p)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedPriority === p
                        ? `${priorityConfig[p].color} text-white shadow-lg`
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {priorityConfig[p].label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 过滤器和统计 */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
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
                    {f === 'all' ? '全部' : f === 'active' ? '进行中' : '已完成'}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-cyan-400">总计: {stats.total}</span>
                <span className="text-purple-400">进行: {stats.active}</span>
                <span className="text-pink-400">完成: {stats.completed}</span>
              </div>
            </div>
            {/* 优先级过滤器 */}
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-gray-400 text-sm">优先级筛选:</span>
              {(['all', 'high', 'medium', 'low'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    priorityFilter === p
                      ? p === 'all' 
                        ? 'bg-white/20 text-white'
                        : `${priorityConfig[p as Priority].color} text-white`
                      : 'bg-white/5 text-gray-500 hover:bg-white/10'
                  }`}
                >
                  {p === 'all' ? '全部' : priorityConfig[p as Priority].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Todo 列表 */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="max-h-[500px] overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">暂无任务</p>
                <p className="text-sm mt-2">添加一个任务开始吧！</p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`border-b border-white/5 p-4 hover:bg-white/5 transition-colors ${
                    todo.completed ? 'opacity-60' : ''
                  } ${priorityConfig[todo.priority].bgColor}`}
                  style={{ borderLeft: `3px solid ${todo.priority === 'high' ? '#ef4444' : todo.priority === 'medium' ? '#eab308' : '#22c55e'}` }}
                >
                  {editingId === todo.id ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                        autoFocus
                      />
                      <div className="flex gap-2 items-center">
                        <span className="text-gray-400 text-sm">优先级:</span>
                        {(Object.keys(priorityConfig) as Priority[]).map((p) => (
                          <button
                            key={p}
                            onClick={() => setEditPriority(p)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                              editPriority === p
                                ? `${priorityConfig[p].color} text-white`
                                : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            {priorityConfig[p].label}
                          </button>
                        ))}
                        <button
                          onClick={saveEdit}
                          className="ml-auto px-4 py-1.5 bg-green-500 rounded font-medium text-white hover:bg-green-600 transition-colors"
                        >
                          保存
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-4 py-1.5 bg-red-500 rounded font-medium text-white hover:bg-red-600 transition-colors"
                        >
                          取消
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-5 h-5 rounded border-2 border-cyan-400 bg-transparent checked:bg-cyan-500 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className={`${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                          {todo.text}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <span>🕐 {formatDateTime(todo.createdAt)}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${priorityConfig[todo.priority].bgColor} ${priorityConfig[todo.priority].textColor}`}>
                            {priorityConfig[todo.priority].label}优先级
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => startEdit(todo)}
                        className="px-3 py-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-3 py-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        删除
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
          <p>点击复选框标记任务完成 · 显示任务创建时间</p>
        </div>
      </div>
    </div>
  );
}
