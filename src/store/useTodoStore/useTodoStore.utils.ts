import type { ReadonlyState } from '@/lib/hooks/useState';
import { parseJSON } from '@/lib/utils/parseJson';
import type { TodoStoreType } from './useTodoStore';

const defaultTodoState: TodoStoreType = {
	todoList: [],
	isEditMode: false,
};

export const initialStoredState = parseJSON<TodoStoreType>(localStorage.getItem('todoList-state')) ?? defaultTodoState;

export const syncStateWithStorage = (todoStore: ReadonlyState<TodoStoreType>) => {
	const { todoList } = todoStore.value;

	localStorage.setItem('todoList-state', JSON.stringify({ todoList }));
};
