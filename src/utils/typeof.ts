export const isObject = (value: unknown): value is Record<string, unknown> => {
	return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

// == `Any` is required here so that one can pass custom function type without type errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFunction = <TFunction extends (...args: any) => any>(
	value: unknown
): value is TFunction => {
	return typeof value === "function";
};
