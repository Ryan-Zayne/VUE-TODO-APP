<script setup lang="ts">
import { useTodoActions, type TodoStoreType } from '@/store/useTodoStore';

const props = defineProps<{ todoItem: TodoStoreType['todoList'][number] }>();

const { handleDeleteTodo, handleDoneTodo } = useTodoActions();

const todoCheckBoxId = `checkbox-${props.todoItem.id}`;
</script>

<template>
	<li
		class="flex select-none items-center gap-[1.2rem] p-[1.9rem_2rem_2.1rem] md:gap-[2.4rem] md:p-[2.1rem_2.4rem_2.3rem]"
	>
		<input
			:id="todoCheckBoxId"
			type="checkbox"
			class="custom-checkbox w-[2rem] before:w-[2rem] md:w-[2.4rem] md:before:w-[2.4rem]"
			:checked="todoItem.isDone"
			@input="handleDoneTodo(todoItem.id)"
		/>

		<label :for="todoCheckBoxId" :class="{ 'text-secondary line-through': todoItem.isDone }">
			{{ todoItem.todoInputValue }}
		</label>

		<button
			type="button"
			class="ml-auto transition-transform duration-[50ms] ease-in-out active:scale-[1.2]"
			@click="handleDeleteTodo(todoItem.id)"
		>
			<img class="aspect-square w-[1.4rem]" src="/src/assets/x-icon.svg" alt="" />
		</button>
	</li>
</template>

<style scoped>
input[type='checkbox'].custom-checkbox {
	appearance: none;
	margin: 0;
}

.custom-checkbox {
	display: flex;
	justify-content: center;
	align-items: center;
	aspect-ratio: 1;
	border-radius: 50%;
	background-image: url('/src/assets/circle.svg');
	background-size: contain;
}

.custom-checkbox:hover {
	background-image: url('/src/assets/circle-hover.svg');
}

.custom-checkbox::before {
	content: '';
	background-image: url('/src/assets/tick-icon.svg');
	background-size: contain;
	aspect-ratio: 1;
	border-radius: 50%;
	transform: scale(0);
	transition: 150ms transform ease-in-out;
}

.custom-checkbox:checked::before {
	transform: scale(1);
}
</style>
