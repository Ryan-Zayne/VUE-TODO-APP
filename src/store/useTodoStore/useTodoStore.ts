import { useState } from '@/composables/useState';
import { syncStateWithStorage } from '@/utils/syncStateWithStorage';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { TODO_STORAGE_KEY, initialTodoState } from './todoStore.utils';

const todoStoreFn = defineStore('todoStore', () => {
	const [todoInput, setTodoInput] = useState('', { needsDoubleBinding: true });
	const [todoStore, setTodoStore] = useState(initialTodoState);
	const [todoListFilter, setTodoListFilter] = useState<'all' | 'active' | 'completed'>('all');

	const filteredTodosList = computed(() => {
		const { todoList } = todoStore.value;

		switch (todoListFilter.value) {
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

	const $activateStorageSync = () => {
		syncStateWithStorage(TODO_STORAGE_KEY, todoStore.value, ['todoList']);
	};

	const handleAddTodo = () => {
		if (todoInput.value.length < 3) {
			// eslint-disable-next-line no-alert
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

		$activateStorageSync();
	};

	const handleDeleteTodo = (id: string) => {
		const { todoList } = todoStore.value;

		const updatedTodoList = todoList.filter((item) => item.id !== id);

		setTodoStore({ todoList: updatedTodoList });

		$activateStorageSync();
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

		$activateStorageSync();
	};

	const handleClearCompleteTodos = () => {
		const { todoList } = todoStore.value;

		const isAnyTodoCompleted = todoList.some((item) => item.isDone);

		if (!isAnyTodoCompleted) {
			// eslint-disable-next-line no-alert
			alert('There are no completed todos yet!');
			return;
		}

		const updatedTodoList = todoList.filter((item) => !item.isDone);

		setTodoStore({ todoList: updatedTodoList });

		$activateStorageSync();
	};

	return {
		todoStore,
		todoInput,
		totalIncompleteTodos,
		todoListFilter,
		filteredTodosList,

		actions: () => ({
			handleAddTodo,
			handleDeleteTodo,
			handleDoneTodo,
			handleClearCompleteTodos,
			setTodoListFilter,
		}),
	};
});

export const useTodoStore = () => storeToRefs(todoStoreFn());

export const useTodoActions = () => todoStoreFn().actions();
