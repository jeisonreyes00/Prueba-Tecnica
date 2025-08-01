import { createContext, useContext, type ReactNode } from 'react';
import { useTodos } from '../hooks/useTodos';
import type { ITodo } from '../types/todo.types';

type TodoContextType = {
    loading: boolean;
    todos: ITodo[];
    showCompleted: boolean;
    editingTodo: ITodo | null;
    addTodo: (text: string) => void;
    deleteTodo: (id: number) => void;
    editTodo: (id: number, newText: string) => void;
    toggleTodo: (id: number) => void;
    toggleFilter: () => void;
    setEditingTodo: (todo: ITodo | null) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const todoState = useTodos();
    return (
        <TodoContext.Provider value={todoState}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodoContext debe ser usado dentro de un TodoProvider');
    }
    return context;
};
