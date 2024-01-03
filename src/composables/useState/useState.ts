import { isObject } from '@/utils/typeof';
import { readonly, ref, shallowRef } from 'vue';
import type {
	DefaultOptions,
	FullStateValue,
	PartialStateValue,
	ReadonlyState,
	UseStateOptions,
	UseStateReturnType,
	WritableState,
} from './state.types';

function useState<TValue>(
	initialState: TValue,
	options?: DefaultOptions
): UseStateReturnType<ReadonlyState<TValue>>;

function useState<TValue>(
	initialState: TValue,
	options: UseStateOptions<false, true>
): UseStateReturnType<ReadonlyState<TValue>>;

function useState<TValue>(
	initialState: TValue,
	options: UseStateOptions<true, false>
): UseStateReturnType<WritableState<TValue>>;

// useState Overload Implementation
function useState<TValue>(initialState: TValue, options: UseStateOptions = {}) {
	const { needsDoubleBinding = false, isDeeplyReactive = false } = options;

	const state = isDeeplyReactive
		? ref(initialState)
		: (shallowRef(initialState) as ReturnType<typeof ref<TValue>>);

	function setState(newState: PartialStateValue<TValue>): void;
	function setState(newStateFn: (prevState: FullStateValue<TValue>) => PartialStateValue<TValue>): void;

	// setState Overload Implementation
	function setState(newState: unknown) {
		if (typeof newState === 'function' && isObject(newState(state.value)) && isObject(state.value)) {
			state.value = { ...state.value, ...newState(state.value) } as FullStateValue<TValue>;
			return;
		}

		if (typeof newState === 'function') {
			state.value = newState(state.value) as FullStateValue<TValue>;
			return;
		}

		if (isObject(newState) && isObject(state.value)) {
			state.value = { ...state.value, ...newState } as FullStateValue<TValue>;
			return;
		}

		state.value = newState as FullStateValue<TValue>;
	}

	return needsDoubleBinding ? state : [readonly(state), setState];
}

export { useState };
