import { isObject } from '@/lib/utils/typeof';
import {
readonly,
ref,
shallowReadonly,
shallowRef,
type DeepReadonly,
type Ref,
type UnwrapRef,
} from 'vue';

type UseStateOptions<TisDoubleBound = boolean, TisDeepReactive = boolean> = {
	isDoubleBound?: TisDoubleBound;
	isDeepReactive?: TisDeepReactive;
};

type UseStateResult<TValue, TState> = [
	TState,
	{
		(newState: Partial<UnwrapRef<TValue>>): void;
		(newState: (prevState: UnwrapRef<TValue>) => Partial<UnwrapRef<TValue>>): void;
	},
];

type UseStateDefaultOptions = UseStateOptions<false, false>;

function useState<TValue>(
	initialState: TValue,
	options?: UseStateDefaultOptions
): UseStateResult<TValue, Readonly<Ref<DeepReadonly<UnwrapRef<TValue>>>>>;

function useState<TValue>(
	initialState: TValue,
	options: UseStateOptions<false, true>
): UseStateResult<TValue, Readonly<Ref<DeepReadonly<UnwrapRef<TValue>>>>>;

function useState<TValue>(
	initialState: TValue,
	options: UseStateOptions<true, false>
): UseStateResult<TValue, Readonly<Ref<DeepReadonly<UnwrapRef<TValue>>>>>;

// useState Overload Implementation
function useState<TValue>(initialState: TValue, options: UseStateOptions = {}) {
	const { isDoubleBound = false, isDeepReactive = false } = options;

	const state = !isDeepReactive
		? (shallowRef(initialState) as Ref<UnwrapRef<TValue>>)
		: ref(initialState);

	function setState(newState: Partial<typeof state.value>): void;
	function setState(newState: (prevState: typeof state.value) => Partial<typeof state.value>): void;

	// setState Overload Implementation
	function setState(newValue: unknown) {
		if (typeof newValue === 'function' && isObject(state.value) && isObject(newValue(state.value))) {
			state.value = { ...state.value, ...newValue(state.value) };
			return;
		}

		if (typeof newValue === 'function') {
			state.value = newValue(state.value);
			console.log('case 1');
			return;
		}

		if (isObject(newValue) && isObject(state.value)) {
			state.value = { ...state.value, ...newValue };
			return;
		}

		state.value = newValue as UnwrapRef<TValue>;
	}

	if (isDoubleBound) {
		return [state, setState];
	}

	if (isDeepReactive) {
		return [readonly(state), setState];
	}

	return [shallowReadonly(state), setState];
}

export { useState };
