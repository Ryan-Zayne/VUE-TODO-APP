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

const useState = (<TValue>(initialState: TValue, options: UseStateOptions = {}) => {
	type NewStateFn = (prevState: FullStateValue<TValue>) => PartialStateValue<TValue>;

	const { needsDoubleBinding = false, isDeeplyReactive = false, shouldReplace = false } = options;

	const state = isDeeplyReactive
		? ref(initialState)
		: (shallowRef(initialState) as ReturnType<typeof ref<TValue>>);

	function setState(newState: PartialStateValue<TValue>): void;
	function setState(newStateFn: NewStateFn): void;

	// setState Overload Implementation
	function setState(newState: unknown) {
		const nextState = isFunction<NewStateFn>(newState)
			? newState(state.value as FullStateValue<TValue>)
			: newState;

		if (Object.is(state.value, nextState)) return;

		state.value =
			!shouldReplace && isObject(state.value) && isObject(nextState)
				? { ...state.value, ...nextState }
				: (nextState as FullStateValue<TValue>);
	}

	return needsDoubleBinding ? [state, setState] : [readonly(state), setState];
}) satisfies UseState as UseState;

export { useState };
