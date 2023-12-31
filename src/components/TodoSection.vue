<script lang="ts" setup>
import { useMediaQueryStore } from '@/store/useMediaQueryStore';
import { useTodoActions, useTodoStore } from '@/store/useTodoStore';

const { todoInput, todoStore, totalIncompleteTodos, todoListfilter } = useTodoStore();

const { handleAddTodo, handleClearCompleteTodos, handleTodosFilter } = useTodoActions();

const { isMobile } = useMediaQueryStore();
</script>

<template>
	<section
		class="flex w-[min(100%,_clamp(32.7rem,_80vw,_54rem))] translate-y-[-9.2rem] flex-col items-center gap-[1.6rem] text-[1.2rem] md:translate-y-[-14.2rem] md:text-[1.8rem]"
	>
		<form id="todoForm" class="flex w-full items-center" @submit.prevent="handleAddTodo">
			<div
				class="flex w-full items-center gap-[1.2rem] rounded-[6px] bg-main-theme px-[2.1rem] [box-shadow:0px_35px_50px_-15px_var(--shadow)] md:gap-[2.4rem]"
			>
				<span
					class="inline-block aspect-square w-[2rem] shrink-0 rounded-full [border:1.1px_solid_var(--border-primary)] md:w-[2.4rem]"
				/>

				<input
					id="todoInput"
					v-model="todoInput"
					class="w-full bg-inherit py-[1.8rem] text-secondary placeholder:text-secondary md:py-[2.3rem]"
					type="text"
					placeholder="Create a new todo"
				/>
			</div>
		</form>

		<ul
			:class="[
				'flex min-h-[31rem] w-full flex-col rounded-[6px] bg-main-theme text-primary [box-shadow:0px_3px_50px_0px_var(--shadow)] [&_>_li:not(:last-child)]:[border-bottom:2px_solid_var(--border-primary)]',

				todoStore.todoList.length <= 3 &&
					'[&_>_li:last-child]:[border-top:2px_solid_var(--border-primary)]',
			]"
		>
			<slot />

			<li
				v-if="isMobile"
				class="mt-auto flex items-center justify-between p-[2.1rem_2rem_2.3rem] text-secondary"
			>
				<p>
					{{ totalIncompleteTodos }}
					{{ totalIncompleteTodos === 1 ? 'item' : 'items' }} left
				</p>

				<button
					class="select-none transition-[transform,color] duration-[120ms] ease-in-out hover:text-primary active:scale-[1.06]"
					@click="handleClearCompleteTodos"
				>
					Clear completed
				</button>
			</li>
		</ul>

		<div
			class="[&_>_button flex w-full items-center justify-center gap-[1.9rem] rounded-[6px] bg-main-theme p-[1.95rem_2.4rem] text-[1.4rem] font-[700] text-secondary [box-shadow:0px_35px_60px_0px_var(--shadow)]"
		>
			<p v-if="!isMobile" class="mr-auto min-w-[8rem] text-secondary">
				{{ totalIncompleteTodos }}
				{{ totalIncompleteTodos === 1 ? 'item' : 'items' }} left
			</p>

			<button
				:data-selected="todoListfilter === 'all'"
				class="hover:text-primary [&[data-selected=true]]:text-[--text-blue]"
				@click="handleTodosFilter('all')"
			>
				All
			</button>

			<button
				:data-selected="todoListfilter === 'active'"
				class="hover:text-primary [&[data-selected=true]]:text-[--text-blue]"
				@click="handleTodosFilter('active')"
			>
				Active
			</button>

			<button
				:data-selected="todoListfilter === 'completed'"
				class="hover:text-primary [&[data-selected=true]]:text-[--text-blue]"
				@click="handleTodosFilter('completed')"
			>
				Completed
			</button>

			<button
				v-if="!isMobile"
				class="ml-auto select-none text-secondary transition-[transform,color] duration-[120ms] ease-in-out hover:text-primary active:scale-[1.06]"
				@click="handleClearCompleteTodos"
			>
				Clear completed
			</button>
		</div>

		<p class="mt-[5rem] text-[1.4rem] text-secondary">Drag and drop to reorder list</p>
	</section>
</template>
