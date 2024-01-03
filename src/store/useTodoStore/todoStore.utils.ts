import { parseJSON } from '@/utils/parseJson';
import type { TodoStoreType } from './todoStore.types';

export const TODO_STORAGE_KEY = 'todoState';

const defaultTodoState: TodoStoreType = {
	todoList: [],
	isEditMode: false,
};

const initialStoredState = parseJSON<TodoStoreType>(localStorage.getItem(TODO_STORAGE_KEY));

export const initialTodoState = initialStoredState ?? defaultTodoState;
