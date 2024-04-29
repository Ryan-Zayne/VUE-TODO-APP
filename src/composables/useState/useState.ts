import { isFunction, isObject } from "@/utils/typeof";
import { readonly, ref, shallowRef } from "vue";
import type {
	DefaultOptions,
	FullStateValue,
	PartialStateValue,
	ReadonlyState,
	UseStateOptions,
	UseStateReturnType,
	WritableState,
} from "./state.types";

type UseState = {
	<TValue>(initialState: TValue, options?: DefaultOptions): UseStateReturnType<ReadonlyState<TValue>>;

	<TValue>(
		initialState: TValue,
		options: UseStateOptions<false, true>
	): UseStateReturnType<ReadonlyState<TValue>>;

	<TValue>(
		initialState: TValue,
		options: UseStateOptions<true, false>
	): UseStateReturnType<WritableState<TValue>>;
};

type NewStateFn<TValue> = (prevState: FullStateValue<TValue>) => PartialStateValue<TValue>;

type SetState<TValue> = (newState: PartialStateValue<TValue> | NewStateFn<TValue>) => void;

const useState: UseState = <TValue>(initialState: TValue, options: UseStateOptions = {}) => {
	const { allowDoubleBind = false, deep = false, shouldReplace = false } = options;

	const state = !deep
		? (shallowRef(initialState) as ReturnType<typeof ref<TValue>>)
		: ref(initialState);

	const setState: SetState<TValue> = (newState) => {
		const nextState = isFunction<NewStateFn<TValue>>(newState)
			? newState(state.value as FullStateValue<TValue>)
			: newState;

		if (Object.is(state.value, nextState)) return;

		state.value =
			!shouldReplace && isObject(state.value) && isObject(nextState)
				? { ...state.value, ...nextState }
				: (nextState as FullStateValue<TValue>);
	};

	return !allowDoubleBind ? [readonly(state), setState] : [state, setState];
};

export { useState };
