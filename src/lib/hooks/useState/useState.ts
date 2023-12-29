import { isObject } from '@/lib/utils/typeof';
import { readonly, ref, shallowRef } from 'vue';
import type {
	DefaultOptions,
	FullStateValue,
	PartialStateValue,
	ReadonlyState,
	UseStateOptions,
	UseStateReturnType,
	WritableState,
} from './useState.types';

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
		: (shallowRef(initialState) as WritableState<TValue>);

	function setState(newState: PartialStateValue<TValue>): void;
	function setState(newState: (prevState: FullStateValue<TValue>) => PartialStateValue<TValue>): void;

	// setState Overload Implementation
	function setState(newValue: unknown) {
		if (typeof newValue === 'function' && isObject(state.value) && isObject(newValue(state.value))) {
			state.value = { ...state.value, ...newValue(state.value) };
			return;
		}

		if (typeof newValue === 'function') {
			state.value = newValue(state.value);
			return;
		}

		if (isObject(newValue) && isObject(state.value)) {
			state.value = { ...state.value, ...newValue };
			return;
		}

		state.value = newValue as FullStateValue<TValue>;
	}

	return [needsDoubleBinding ? state : readonly(state), setState];
}

export { useState };
