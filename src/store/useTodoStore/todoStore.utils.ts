import { parseJSON } from '@/utils/parseJson';
import type { TodoStoreType } from './todoStore.types';

export const TODO_STORAGE_KEY = 'todoState';

export const defaultTodoState: TodoStoreType = {
	todoList: [],
	isEditMode: false,
};

export const initialStoredState = parseJSON<TodoStoreType>(localStorage.getItem(TODO_STORAGE_KEY));
