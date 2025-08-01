import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 pt-4">
      <TodoList />
    </div>
  );
}

export default App;