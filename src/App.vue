<script setup lang="ts">
import { onMounted } from 'vue';
import TodoListItem from './components/TodoListItem.vue';
import { useState } from './lib/hooks/useState';
import { prefersDarkMode } from './lib/utils/constants';
import { getInitialThemeOnLoad } from './lib/utils/get-initial-theme-on-load';

onMounted(() => {
	document.documentElement.dataset.theme = getInitialThemeOnLoad();
});

export type TodoStoreType = {
	todoList: Array<{
		id: string;
		todoValue: string;
		isDone: boolean;
	}>;
	isEditMode: boolean;
};

const defaultTodoState: TodoStoreType = {
	todoList: [],
	isEditMode: false,
};

const [themeStore, setThemeStore] = useState({
	theme: prefersDarkMode ? 'dark' : 'light',
	isDarkMode: getInitialThemeOnLoad() === 'dark',
});

const toggleTheme = () => {
	const newTheme = themeStore.value.theme === 'light' ? 'dark' : 'light';
	document.documentElement.dataset.theme = newTheme;

	setThemeStore({ theme: newTheme, isDarkMode: newTheme === 'dark' });

	console.log(themeStore.value);
};

const [todoInput, setTodoInput] = useState('', { isDoubleBound: true });
const [todoStore, setTodoStore] = useState(defaultTodoState);

const handleAddTodo = () => {
	if (todoInput.value.length < 3) {
		alert('Please enter a todo with at least 3 characters!');
		return;
	}

	setTodoStore((prevState) => ({
		todoList: [
			...prevState.todoList,
			{ id: crypto.randomUUID().slice(0, 4), todoValue: todoInput.value, isDone: false },
		],
	}));

	setTodoInput('');
};

const handleDeleteTodo = (id: string) => {
	setTodoStore((prevState) => ({
		todoList: prevState.todoList.filter((item) => item.id !== id),
	}));
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
};

const handleClearCompletedTodos = () => {
	setTodoStore((prevState) => ({
		todoList: prevState.todoList.filter((item) => !item.isDone),
	}));
};

const getNumberOfCompletedTodos = () => {
	const { todoList } = todoStore.value;

	const completedTodos = todoList.filter((item) => item.isDone);

	return todoList.length - completedTodos.length;
};
</script>

<template>
	<section class="flex flex-col items-center pb-[12.6rem]">
		<header
			class="flex min-h-[20rem] w-full items-start justify-between bg-hero-image-light bg-cover bg-no-repeat px-[2.4rem] pt-[4.8rem] bg-blend-overlay dark:bg-hero-image-dark"
		>
			<img src="/src/assets/logo.svg" class="h-[2rem] w-[10.9rem]" alt="" />

			<button @click="toggleTheme">
				<img
					:src="`/src/assets/${themeStore.isDarkMode ? 'sun' : 'moon'}.svg`"
					class="aspect-square w-[2rem]"
					alt=""
				/>
			</button>
		</header>

		<article
			class="mx-[2.4rem] flex w-[min(100%,_clamp(32.7rem,_80vw,_54rem))] translate-y-[-9.2rem] flex-col items-center gap-[1.6rem] text-[1.2rem]"
		>
			<form id="todoForm" class="flex w-full items-center" @submit.prevent="handleAddTodo">
				<div
					class="flex w-full items-center rounded-[6px] bg-main-theme px-[2.1rem] [box-shadow:0px_35px_50px_-15px_var(--shadow)]"
				>
					<span
						class="block aspect-square w-[2rem] shrink-0 rounded-full [border:2px_solid_var(--border-primary)]"
					/>

					<input
						id="todoInput"
						v-model="todoInput"
						class="w-full bg-inherit py-[1.8rem] pl-[1.2rem] text-secondary placeholder:text-secondary"
						type="text"
						placeholder="Create a new todo"
					/>
				</div>
			</form>

			<ul
				:class="[
					'flex min-h-[30rem] w-full flex-col rounded-[6px] bg-main-theme text-primary [box-shadow:0px_3px_50px_0px_var(--shadow)] [&_>_li:not(:first-child)]:[border-top:2px_solid_var(--border-primary)]',

					todoStore.todoList.length === 1 &&
						'[&_>_li:first-child]:[border-bottom:2px_solid_var(--border-primary)]',
				]"
			>
				<TodoListItem
					v-for="todoItem in todoStore.todoList"
					:key="todoItem.id"
					:todoItem="todoItem"
					@onButtonClick="handleDeleteTodo(todoItem.id)"
					@onCheckBoxToggle="handleDoneTodo(todoItem.id)"
				/>

				<li class="mt-auto flex items-center justify-between p-[2.1rem_2rem_2.3rem] text-secondary">
					<p>
						{{ getNumberOfCompletedTodos() }}
						{{ getNumberOfCompletedTodos() === 1 ? 'item left' : 'items left' }}
					</p>

					<button
						class="select-none transition-[transform,color] duration-[120ms] ease-in-out hover:text-primary active:scale-[1.06]"
						@click="handleClearCompletedTodos"
					>
						Clear completed
					</button>
				</li>
			</ul>

			<div
				class="flex w-full items-center justify-center gap-[1.9rem] rounded-[6px] bg-main-theme py-[1.6rem] pt-[1.7rem] text-[1.4rem] font-[700] text-secondary [box-shadow:0px_35px_50px_-10px_var(--shadow)]"
			>
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>

			<p class="mt-[4rem] text-[1.4rem] text-secondary">Drag and drop to reorder list</p>
		</article>
	</section>
</template>
