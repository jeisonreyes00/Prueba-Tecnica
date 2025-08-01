import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from '../components/TodoList';
import { useTodoContext } from '../context/TodoContext';
import type { ITodo } from '../types/todo.types';

jest.mock('../context/TodoContext', () => ({
    useTodoContext: jest.fn(),
}));


jest.mock('../components/TodoItem', () => ({
    TodoItem: jest.fn(({ todo }) => <li data-testid={`todo-item-${todo.id}`}>{todo.text}</li>),
}));
jest.mock('../components/TodoForm', () => ({
    TodoForm: () => <div data-testid="todo-form" />,
}));

// Castear el mock de useTodoContext para poder acceder a sus métodos de Jest.
const mockUseTodoContext = useTodoContext as jest.Mock;

// Datos de tareas de ejemplo que el mock del contexto devolverá.
const mockTodos: ITodo[] = [
    { id: 1, text: 'Aprender React Hooks', completed: true },
    { id: 2, text: 'Construir una aplicación de Tareas', completed: false },
    { id: 3, text: 'Desplegar en Netlify', completed: false },
];

// Función de ayuda para renderizar el componente TodoList.
const renderComponent = () => {
    return render(<TodoList />);
};

describe('<TodoList />', () => {
    beforeEach(() => {
        mockUseTodoContext.mockReturnValue({
            loading: false, // Por defecto, no cargando
            todos: mockTodos, // Por defecto, con las tareas de ejemplo
            showCompleted: false, // Por defecto, no filtrando tareas completadas
            toggleFilter: jest.fn(), // Mock para la función de filtro
            editingTodo: null, // Por defecto, no hay tarea en edición
            addTodo: jest.fn(), // Mock para añadir tarea
            deleteTodo: jest.fn(), // Mock para eliminar tarea
            editTodo: jest.fn(), // Mock para editar tarea
            setEditingTodo: jest.fn(), // Mock para establecer la tarea a editar
            toggleTodo: jest.fn(), // Mock para alternar el estado de completado
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // --- Tests de Estado de Carga ---
    test('debería renderizar el estado de carga cuando loading es true', () => {
        mockUseTodoContext.mockReturnValue({
            ...mockUseTodoContext(),
            loading: true,
        });

        renderComponent();

        expect(screen.getByText(/Cargando tareas.../i)).toBeInTheDocument();
        expect(screen.queryByTestId('todo-form')).not.toBeInTheDocument();
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
    });

    // --- Tests de Renderizado de Lista y Elementos ---
    test('debería renderizar la lista de tareas cuando no está cargando', () => {
        renderComponent();

        expect(screen.queryByText(/Cargando tareas.../i)).not.toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Lista de Tareas 📝/i })).toBeInTheDocument();
        expect(screen.getByTestId('todo-form')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(mockTodos.length);
        expect(screen.getByText(/Aprender React Hooks/i)).toBeInTheDocument();
        expect(screen.getByText(/Construir una aplicación de Tareas/i)).toBeInTheDocument();
        expect(screen.getByText(/Desplegar en Netlify/i)).toBeInTheDocument();
        expect(screen.getByText(/1 de 3 tareas completadas/i)).toBeInTheDocument();
    });

    test('debería renderizar el mensaje de "No hay tareas" cuando la lista está vacía', () => {
        mockUseTodoContext.mockReturnValue({
            ...mockUseTodoContext(),
            todos: [],
        });

        renderComponent();
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(screen.getByText(/No hay tareas para mostrar/i)).toBeInTheDocument();
        expect(screen.getByText(/Comienza agregando tu primera tarea usando el formulario de arriba/i)).toBeInTheDocument();
    });

    // --- Tests de Funcionalidad del Botón de Filtro ---
    test('debería llamar a toggleFilter al hacer clic en el botón de filtro', () => {
        const mockToggleFilter = jest.fn();
        mockUseTodoContext.mockReturnValue({
            ...mockUseTodoContext(),
            toggleFilter: mockToggleFilter,
        });

        renderComponent();
        const filterButton = screen.getByRole('button', { name: /Mostrar solo tareas completadas/i });
        fireEvent.click(filterButton);

        expect(mockToggleFilter).toHaveBeenCalledTimes(1);
    });

    // --- Tests del Contador de Tareas ---
    test('el contador de tareas completadas debería ser correcto', () => {
        renderComponent();
        expect(screen.getByText(/1 de 3 tareas completadas/i)).toBeInTheDocument();

        const allCompletedTodos = mockTodos.map(todo => ({ ...todo, completed: true }));
        mockUseTodoContext.mockReturnValue({
            ...mockUseTodoContext(),
            todos: allCompletedTodos,
        });

        renderComponent();
        expect(screen.getByText(/3 de 3 tareas completadas/i)).toBeInTheDocument();
    });

    // --- Tests de Comportamiento del Footer ---
    test('el footer no debería renderizarse si no hay tareas', () => {
        mockUseTodoContext.mockReturnValue({
            ...mockUseTodoContext(),
            todos: [],
        });

        renderComponent();
        expect(screen.queryByText(/tareas completadas/i)).not.toBeInTheDocument();
    });
});