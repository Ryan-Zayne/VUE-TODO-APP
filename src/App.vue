<script setup lang="ts">
import TodoHeader from './components/TodoHeader.vue';
import TodoListItem from './components/TodoListItem.vue';
import TodoSection from './components/TodoSection.vue';
import { useTodoStore } from './store/useTodoStore';

const { filteredTodosList } = useTodoStore();
</script>

<template>
	<TodoHeader />

	<TodoSection>
		<TodoListItem v-for="todoItem in filteredTodosList" :key="todoItem.id" :todoItem="todoItem" />
	</TodoSection>
</template>
