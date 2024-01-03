import type { DeepReadonly, Ref, UnwrapRef } from 'vue';

export type UseStateOptions<TisDoubleBound = boolean, TisDeepReactive = boolean> = {
	needsDoubleBinding?: TisDoubleBound;
	isDeeplyReactive?: TisDeepReactive;
};
export type DefaultOptions = UseStateOptions<false, false>;

export type FullStateValue<TValue> = UnwrapRef<TValue>;
export type PartialStateValue<TValue> = TValue extends Record<string, unknown>
	? Partial<UnwrapRef<TValue>>
	: UnwrapRef<TValue>;

export type ReadonlyState<TValue> = Readonly<Ref<DeepReadonly<UnwrapRef<TValue>>>>;
export type WritableState<TValue> = Ref<UnwrapRef<TValue>>;

/* eslint-disable @typescript-eslint/unified-signatures */

export type UseStateReturnType<TStateVariant> = TStateVariant extends
	| ReadonlyState<infer TValue>
	| WritableState<infer TValue>
	? [
			TStateVariant,
			{
				(newState: PartialStateValue<TValue>): void;
				(newState: (prevState: FullStateValue<TValue>) => PartialStateValue<TValue>): void;
			},
		]
	: never;
