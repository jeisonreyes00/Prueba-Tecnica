import React, { useState, useEffect } from 'react';
import { useTodoContext } from '../context/TodoContext';

export const TodoForm: React.FC = () => {
    const { addTodo, editTodo, editingTodo, setEditingTodo } = useTodoContext();
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        setInputText(editingTodo ? editingTodo.text : '');
    }, [editingTodo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        editingTodo ? editTodo(editingTodo.id, inputText) : addTodo(inputText);
        setInputText('');
    };

    const handleCancelEdit = () => {
        setEditingTodo(null);
        setInputText('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
        flex flex-col sm:flex-row 
        gap-2 sm:gap-3 lg:gap-4
        w-full
      "
        >
            <input
                type="text"
                placeholder={editingTodo ? 'Editar tarea...' : 'Agregar una nueva tarea...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow rounded-md sm:rounded-lg lg:rounded-xl p-2 sm:p-3 lg:p-4 text-sm sm:text-base lg:text-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 dark:focus:ring-offset-gray-800 w-full sm:min-w-0"
                maxLength={500}
                autoComplete="off"
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 lg:gap-3w-full sm:w-autosm:flex-shrink-0">
                <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="
                        w-full sm:w-auto
                        py-2 lg:py-4
                        px-4 lg:px-8
                        bg-blue-600 hover:bg-blue-700 
                        text-white text-sm lg:text-lg font-semibold
                        rounded-md lg:rounded-xl
                        shadow-md hover:shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 dark:focus:ring-offset-gray-800
                        disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none
                        min-w-[100px] lg:min-w-[140px]"
                >
                    {editingTodo ? (
                        <>
                            <span className="sm:hidden">Guardar</span>
                            <span className="hidden sm:inline">Guardar Cambios</span>
                        </>
                    ) : (
                        <>
                            <span className="sm:hidden">Agregar</span>
                            <span className="hidden sm:inline">Agregar Tarea</span>
                        </>
                    )}
                </button>

                {editingTodo && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="
                            w-full sm:w-auto
                            py-2 lg:py-4
                            px-4 lg:px-8
                            bg-gray-500 hover:bg-gray-600
                            dark:bg-gray-600 dark:hover:bg-gray-700
                            text-white text-sm lg:text-lg font-semibold
                            rounded-md lg:rounded-xl
                            shadow-md hover:shadow-lg
                            focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 dark:focus:ring-offset-gray-800
                            min-w-[100px] lg:min-w-[140px]"
                    >
                        <span className="sm:hidden">❌ Cancelar</span>
                        <span className="hidden sm:inline">❌ Cancelar Edición</span>
                    </button>
                )}
            </div>
        </form>
    );
};