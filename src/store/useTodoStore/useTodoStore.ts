import { useState } from '@/hooks/useState';
import { syncStateWithStorage } from '@/utils/syncStateWithStorage';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { defaultTodoState, initialStoredState } from './useTodoStore.utils';

export type TodoStoreType = {
	todoList: Array<{
		id: string;
		todoInputValue: string;
		isDone: boolean;
	}>;

	isEditMode: boolean;
};

export const TODO_STORAGE_KEY = 'todoState';

const todoStoreFn = defineStore('todoStore', () => {
	const [todoInput, setTodoInput] = useState('', { needsDoubleBinding: true });
	const [todoStore, setTodoStore] = useState(initialStoredState ?? defaultTodoState);
	const [todoListfilter, setTodoListfilter] = useState<'all' | 'active' | 'completed'>('all');

	const filteredTodosList = computed(() => {
		const { todoList } = todoStore.value;

		switch (todoListfilter.value) {
			case 'active': {
				return todoList.filter((item) => !item.isDone);
			}

			case 'completed': {
				return todoList.filter((item) => item.isDone);
			}

			default: {
				return todoList;
			}
		}
	});

	const totalIncompleteTodos = computed(() => {
		const { todoList } = todoStore.value;

		const completedTodos = todoList.filter((item) => item.isDone);

		return todoList.length - completedTodos.length;
	});

	const $syncStorage = () => {
		syncStateWithStorage(TODO_STORAGE_KEY, todoStore.value, ['todoList']);
	};

	const handleAddTodo = () => {
		if (todoInput.value.length < 3) {
			alert('Please enter a todo with at least 3 characters!');
			return;
		}

		const newTodoItem = {
			id: crypto.randomUUID().slice(0, 4),
			todoInputValue: todoInput.value,
			isDone: false,
		};

		setTodoStore((prevState) => ({ todoList: [...prevState.todoList, newTodoItem] }));

		setTodoInput('');

		$syncStorage();
	};

	const handleDeleteTodo = (id: string) => {
		const { todoList } = todoStore.value;

		const updatedTodoList = todoList.filter((item) => item.id !== id);

		setTodoStore({ todoList: updatedTodoList });

		$syncStorage();
	};

	const handleDoneTodo = (id: string) => {
		const { todoList } = todoStore.value;

		const updatedTodoList = todoList.map((todoiItem) => {
			if (todoiItem.id === id) {
				return { ...todoiItem, isDone: !todoiItem.isDone };
			}

			return todoiItem;
		});

		setTodoStore({ todoList: updatedTodoList });

		$syncStorage();
	};

	const handleClearCompleteTodos = () => {
		const { todoList } = todoStore.value;

		const isAnyTodoCompleted = todoList.some((item) => item.isDone);

		if (!isAnyTodoCompleted) {
			alert('There are no completed todos yet!');
			return;
		}

		const updatedTodoList = todoList.filter((item) => !item.isDone);

		setTodoStore({ todoList: updatedTodoList });

		$syncStorage();
	};

	const handleTodosFilter = (filter: typeof todoListfilter.value) => setTodoListfilter(filter);

	return {
		todoStore,
		todoInput,
		totalIncompleteTodos,
		todoListfilter,
		filteredTodosList,

		actions: () => ({
			handleAddTodo,
			handleDeleteTodo,
			handleDoneTodo,
			handleClearCompleteTodos,
			handleTodosFilter,
		}),
	};
});

export const useTodoStore = () => storeToRefs(todoStoreFn());

export const useTodoActions = () => todoStoreFn().actions();
