import { useState, useEffect, useMemo } from 'react';
import type { ITodo } from '../types/todo.types';

const fetchTodosFromApi = (): Promise<ITodo[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: 'Aprender React Hooks', completed: true },
                { id: 2, text: 'Construir una aplicación de Tareas', completed: false },
                { id: 3, text: 'Desplegar en Netlify', completed: false },
            ]);
        }, 1000);
    });
};

export const useTodos = () => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showCompleted, setShowCompleted] = useState<boolean>(false);
    const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);

    useEffect(() => {
        try {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        } catch (error) {
            console.error("Error al cargar las tareas desde localStorage:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const loadTodos = async () => {
            setLoading(true);
            try {
                const apiTodos = await fetchTodosFromApi();
                setTodos(apiTodos);
            } catch (error) {
                console.error("Error al cargar las tareas desde la API:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!loading && todos.length === 0) {
            loadTodos();
        } else if (loading) {
            const timeoutId = setTimeout(() => {
                if (todos.length === 0) {
                    loadTodos();
                }
            }, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [loading, todos.length]);

    useEffect(() => {
        if (!loading) {
            try {
                localStorage.setItem('todos', JSON.stringify(todos));
            } catch (error) {
                console.error("Error al guardar las tareas en localStorage:", error);
            }
        }
    }, [todos, loading]);

    const addTodo = (text: string) => {
        if (text.trim() === '') return;
        const newTodo: ITodo = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTodos(prev => [...prev, newTodo]);
    };

    const deleteTodo = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const editTodo = (id: number, newText: string) => {
        if (newText.trim() === '') return;
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
        setEditingTodo(null);
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const toggleFilter = () => {
        setShowCompleted(prev => !prev);
    };

    const filteredTodos = useMemo(() => {
        return showCompleted ? todos.filter(todo => todo.completed) : todos;
    }, [todos, showCompleted]);

    return {
        loading,
        todos: filteredTodos,
        showCompleted,
        editingTodo,
        addTodo,
        deleteTodo,
        editTodo,
        toggleTodo,
        toggleFilter,
        setEditingTodo
    };
};