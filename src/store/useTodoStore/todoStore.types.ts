export type TodoStoreType = {
	todoList: Array<{
		id: string;
		todoInputValue: string;
		isDone: boolean;
	}>;

	isEditMode: boolean;
};
