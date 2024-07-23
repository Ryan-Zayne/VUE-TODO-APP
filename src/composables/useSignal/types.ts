export type UseSignalOptions<TValue> = {
	equals?: false | ((prev: TValue, next: TValue) => boolean);
	shouldReplace?: boolean;
};

export type PartialSignalValue<TValue> =
	TValue extends Record<string, unknown> ? Partial<TValue> : TValue;

export type UseSignalReturnType<TValue> = [
	() => TValue,
	{
		(newState: PartialSignalValue<TValue>): void;
		(newState: (prevState: TValue) => PartialSignalValue<TValue>): void;
	},
];
