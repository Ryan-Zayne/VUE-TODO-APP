import type { DeepReadonly, Ref, UnwrapRef } from "vue";

export type UseStateOptions<TWritable = boolean, TDeep = boolean> = {
	writable?: TWritable;
	deep?: TDeep;
	shouldReplace?: boolean;
};
export type DefaultStateOptions = UseStateOptions<false, false>;

export type PartialStateValue<TValue> =
	TValue extends Record<string, unknown> ? Partial<TValue> : TValue;

export type ReadonlyState<TValue> = DeepReadonly<Ref<TValue>>;
export type WritableState<TValue> = Ref<TValue>;

export type UseStateReturnType<TStateVariant> = TStateVariant extends
	| ReadonlyState<infer TValue>
	| WritableState<infer TValue>
	? [
			TStateVariant,
			{
				(newState: PartialStateValue<TValue>): void;
				(newState: (prevState: TValue) => PartialStateValue<TValue>): void;
			},
		]
	: never;
