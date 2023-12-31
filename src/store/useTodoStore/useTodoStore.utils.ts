import { parseJSON } from '@/utils/parseJson';
import { TODO_STORAGE_KEY, type TodoStoreType } from './useTodoStore';

export const defaultTodoState: TodoStoreType = {
	todoList: [],
	isEditMode: false,
};

export const initialStoredState = parseJSON<TodoStoreType>(localStorage.getItem(TODO_STORAGE_KEY));
