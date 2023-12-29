<script setup lang="ts">
import type { TodoStoreType } from '@/App.vue';

const props = defineProps<{
	todoItem: TodoStoreType['todoList'][number];
}>();

const emit = defineEmits<{
	onButtonClick: [];
	onCheckBoxToggle: [];
}>();

const todoCheckBoxId = `checkbox-${props.todoItem.id}`;
</script>

<template>
	<li class="flex select-none items-center gap-[1.2rem] p-[1.9rem_2rem_2.1rem]">
		<input
			:id="todoCheckBoxId"
			type="checkbox"
			class="custom-checkbox [border:2px_solid_var(--border-primary)]"
			@input="emit('onCheckBoxToggle')"
		/>

		<label :for="todoCheckBoxId" :class="[todoItem.isDone && 'line-through']">
			{{ todoItem.todoValue }}
		</label>

		<button
			class="ml-auto transition-transform duration-[50ms] ease-in-out active:scale-[1.2]"
			@click="emit('onButtonClick')"
		>
			<img class="" src="/src/assets/x-icon.svg" alt="" />
		</button>
	</li>
</template>
