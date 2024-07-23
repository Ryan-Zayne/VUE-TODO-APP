import { isFunction, isObject } from "@/utils/typeof";
import { type Ref, readonly, ref, shallowRef } from "vue";
import type {
	DefaultStateOptions,
	PartialStateValue,
	ReadonlyState,
	UseStateOptions,
	UseStateReturnType,
	WritableState,
} from "./types";

type UseState = {
	<TValue>(
		initialState: TValue,
		options?: DefaultStateOptions
	): UseStateReturnType<ReadonlyState<TValue>>;

	<TValue>(
		initialState: TValue,
		options: UseStateOptions<false, true>
	): UseStateReturnType<ReadonlyState<TValue>>;

	<TValue>(
		initialState: TValue,
		options: UseStateOptions<true, false>
	): UseStateReturnType<WritableState<TValue>>;
};

type NewStateFn<TValue> = (prevState: TValue) => PartialStateValue<TValue>;

type SetState<TValue> = (newState: PartialStateValue<TValue> | NewStateFn<TValue>) => void;

const useState: UseState = <TValue>(initialState: TValue, options: UseStateOptions = {}) => {
	const { writable = false, deep = false, shouldReplace = false } = options;

	const state = deep ? ref(initialState) : (shallowRef(initialState) as Ref<TValue>);

	const setState: SetState<TValue> = (newState) => {
		const nextState = isFunction<NewStateFn<TValue>>(newState)
			? newState(state.value as TValue)
			: newState;

		state.value =
			!shouldReplace && isObject(state.value) && isObject(nextState)
				? { ...state.value, ...nextState }
				: (nextState as TValue);
	};

	return !writable ? [readonly(state), setState] : [state, setState];
};

export { useState };
