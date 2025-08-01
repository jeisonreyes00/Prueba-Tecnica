import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';

export const TodoList: React.FC = () => {
    const { loading, todos, showCompleted, toggleFilter } = useTodoContext();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen min-h-[400px] p-2">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-medium">
                        Cargando tareas...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-2">
            <div className="
                bg-white dark:bg-gray-800
                shadow-md
                rounded-xl
                overflow-hidden
                border border-gray-200 dark:border-gray-700"
            >
                <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4 leading-tight">
                        Lista de Tareas 📝
                    </h1>

                    <div className="mb-4">
                        <TodoForm />
                    </div>

                    <button
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 dark:active:bg-blue-800 text-white font-semibold text-base rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={toggleFilter}
                        aria-label={showCompleted ? 'Mostrar todas las tareas' : 'Mostrar solo tareas completadas'}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {showCompleted ? (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>Mostrar Todas</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>Mostrar Solo Completadas</span>
                                </>
                            )}
                        </span>
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {todos.length > 0 ? (
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {todos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} />
                            ))}
                        </ul>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-2 text-center">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    className="w-10 h-10 text-gray-400 dark:text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                                No hay tareas para mostrar
                            </p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm max-w-md leading-relaxed">
                                {showCompleted
                                    ? 'No tienes tareas completadas aún. ¡Completa algunas tareas!'
                                    : 'Comienza agregando tu primera tarea usando el formulario de arriba.'}
                            </p>
                        </div>
                    )}
                </div>

                {todos.length > 0 && (
                    <div className="px-2 py-2 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {todos.filter(todo => todo.completed).length} de {todos.length} tareas completadas
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};