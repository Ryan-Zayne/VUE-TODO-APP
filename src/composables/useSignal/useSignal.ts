import { isFunction, isObject } from "@/utils/typeof";
import { type Ref, shallowRef, triggerRef } from "vue";
import type { PartialSignalValue, UseSignalOptions, UseSignalReturnType } from "./types";

type NewSignalFn<TValue> = (prevState: TValue) => PartialSignalValue<TValue>;

type SetSignal<TValue> = (newState: PartialSignalValue<TValue> | NewSignalFn<TValue>) => void;

const useSignal = <TValue>(initialState: TValue, options: UseSignalOptions<TValue> = {}) => {
	const state = shallowRef(initialState) as Ref<TValue>;

	const setState: SetSignal<TValue> = (newState) => {
		const nextState = isFunction<NewSignalFn<TValue>>(newState)
			? newState(state.value as TValue)
			: newState;

		const equality = isFunction(options.equals)
			? options.equals(state.value, nextState as TValue)
			: options.equals;

		state.value =
			!options.shouldReplace && isObject(state.value) && isObject(nextState)
				? { ...state.value, ...nextState }
				: (nextState as TValue);

		if (!equality) {
			triggerRef(state);
		}
	};

	return [() => state.value, setState] as const;
};

export { useSignal };
