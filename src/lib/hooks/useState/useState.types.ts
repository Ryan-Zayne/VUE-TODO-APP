import type { DeepReadonly, Ref, UnwrapRef } from 'vue';

export type UseStateOptions<TisDoubleBound = boolean, TisDeepReactive = boolean> = {
	needsDoubleBinding?: TisDoubleBound;
	isDeeplyReactive?: TisDeepReactive;
};
export type DefaultOptions = UseStateOptions<false, false>;

export type FullStateValue<TValue> = UnwrapRef<TValue>;
export type PartialStateValue<TValue> = Partial<UnwrapRef<TValue>>;

export type ReadonlyState<TValue> = Readonly<Ref<DeepReadonly<UnwrapRef<TValue>>>>;
export type WritableState<TValue> = Ref<UnwrapRef<TValue>>;

export type UseStateReturnType<TState> = TState extends ReadonlyState<infer TValue>
	? [
			TState,
			{
				(newState: PartialStateValue<TValue>): void;
				(newState: (prevState: FullStateValue<TValue>) => PartialStateValue<TValue>): void;
			},
		]
	: TState extends WritableState<infer TValue>
		? [
				TState,
				{
					(newState: PartialStateValue<TValue>): void;
					(newState: (prevState: FullStateValue<TValue>) => PartialStateValue<TValue>): void;
				},
			]
		: never;
