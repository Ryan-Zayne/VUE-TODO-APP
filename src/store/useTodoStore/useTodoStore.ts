import { useState } from '@/lib/hooks/useState';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { initialStoredState, syncStateWithStorage } from './useTodoStore.utils';

export type TodoStoreType = {
	todoList: Array<{
		id: string;
		todoInputValue: string;
		isDone: boolean;
	}>;

	isEditMode: boolean;
};

const todoStoreFn = defineStore('todoStore', () => {
	const [todoInput] = useState('', { needsDoubleBinding: true });
	const [todoStore, setTodoStore] = useState(initialStoredState);

	const totalIncompleteTodos = computed(() => {
		const { todoList } = todoStore.value;

		const completedTodos = todoList.filter((item) => item.isDone);

		return todoList.length - completedTodos.length;
	});

	const handleAddTodo = () => {
		if (todoInput.value.length < 3) {
			alert('Please enter a todo with at least 3 characters!');
			return;
		}

		setTodoStore((prevState) => ({
			todoList: [
				...prevState.todoList,
				{ id: crypto.randomUUID().slice(0, 4), todoInputValue: todoInput.value, isDone: false },
			],
		}));

		todoInput.value = '';

		syncStateWithStorage(todoStore);
	};

	const handleDeleteTodo = (id: string) => {
		setTodoStore((prevState) => ({
			todoList: prevState.todoList.filter((item) => item.id !== id),
		}));

		syncStateWithStorage(todoStore);
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

		syncStateWithStorage(todoStore);
	};

	const handleClearCompleteTodos = () => {
		setTodoStore((prevState) => ({
			todoList: prevState.todoList.filter((item) => !item.isDone),
		}));

		syncStateWithStorage(todoStore);
	};

	return {
		todoStore,
		todoInput,
		totalIncompleteTodos,

		actions: {
			handleAddTodo,
			handleDeleteTodo,
			handleDoneTodo,
			handleClearCompleteTodos,
		},
	};
});

export const useTodoStore = () => storeToRefs(todoStoreFn());

export const useTodoActions = () => todoStoreFn().actions;
