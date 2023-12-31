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

		<label :for="todoCheckBoxId" :class="[todoItem.isDone && 'text-secondary line-through']">
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
