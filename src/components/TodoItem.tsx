import React from 'react';
import type { ITodo } from "../types/todo.types";
import { useTodoContext } from '../context/TodoContext';

interface TodoItemProps {
    todo: ITodo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { toggleTodo, deleteTodo, setEditingTodo } = useTodoContext();

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        toggleTodo(todo.id);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingTodo(todo);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        deleteTodo(todo.id);
    };

    const textClasses = `
        flex-grow cursor-pointer break-words leading-relaxed
        px-2 sm:px-3 md:px-4
        text-xs sm:text-sm md:text-base lg:text-lg
        text-gray-700 dark:text-gray-300
        ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}
    `;

    return (
        <li className="
            flex flex-col sm:flex-row sm:items-center 
            p-2 sm:p-3 md:p-4 lg:p-5
            border-b border-gray-200 dark:border-gray-700 
            hover:bg-gray-50 dark:hover:bg-gray-700
            active:bg-gray-100 dark:active:bg-gray-600
            cursor-pointer
            gap-2 sm:gap-3 md:gap-0"
        >
            <div className="flex items-start sm:contents">
                <input
                    type="checkbox"
                    className="
                        h-3 sm:h-4 md:h-5 lg:h-6
                        w-3 sm:w-4 md:w-5 lg:w-6
                        mt-0.5 sm:mt-1 md:mt-0
                        mr-2 sm:mr-3 md:mr-4
                        flex-shrink-0 rounded
                        border-gray-300 dark:border-gray-600
                        bg-white dark:bg-gray-700
                        focus:ring-blue-500 focus:ring-1 sm:focus:ring-2 focus:ring-offset-1
                        dark:focus:ring-offset-gray-800
                        checked:bg-purple-600 checked:border-purple-600 checked:text-white"
                    checked={todo.completed}
                    onChange={handleToggle}
                    aria-label={`Marcar tarea "${todo.text}" como ${todo.completed ? 'pendiente' : 'completada'}`}
                />
                <span
                    className={textClasses}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleTodo(todo.id);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleTodo(todo.id);
                        }
                    }}
                >
                    {todo.text}
                </span>
            </div>

            <div className="
                flex items-center justify-end sm:justify-start
                gap-1 sm:gap-2 md:gap-3
                ml-5 sm:ml-auto
                sm:flex-shrink-0"
            >
                <button
                    onClick={handleEdit}
                    className="
                        p-1 sm:p-1.5 md:p-2 lg:p-2.5
                        text-blue-500 hover:text-blue-700 active:text-blue-800
                        dark:text-blue-400 dark:hover:text-blue-300 dark:active:text-blue-200
                        hover:bg-blue-50 active:bg-blue-100
                        dark:hover:bg-blue-900/20 dark:active:bg-blue-900/40
                        rounded-md sm:rounded-lg
                        focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                        dark:focus:ring-offset-gray-800
                        min-w-[28px] sm:min-w-[32px] md:min-w-[36px] lg:min-w-[40px]
                        h-[28px] sm:h-[32px] md:h-[36px] lg:h-[40px]
                        flex items-center justify-center"
                    title="Editar tarea"
                    aria-label={`Editar tarea: ${todo.text}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.389-8.389-2.828-2.828z" />
                    </svg>
                </button>

                <button
                    onClick={handleDelete}
                    className="
                        p-1 sm:p-1.5 md:p-2 lg:p-2.5
                        text-red-500 hover:text-red-700 active:text-red-800
                        dark:text-red-400 dark:hover:text-red-300 dark:active:text-red-200
                        hover:bg-red-50 active:bg-red-100
                        dark:hover:bg-red-900/20 dark:active:bg-red-900/40
                        rounded-md sm:rounded-lg
                        focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-red-500 focus:ring-offset-1
                        dark:focus:ring-offset-gray-800
                        min-w-[28px] sm:min-w-[32px] md:min-w-[36px] lg:min-w-[40px]
                        h-[28px] sm:h-[32px] md:h-[36px] lg:h-[40px]
                        flex items-center justify-center"
                    title="Eliminar tarea"
                    aria-label={`Eliminar tarea: ${todo.text}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 112 0v6a1 1 0 11-2 0V8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </li>
    );
};