import { pickKeys } from './pickKeys';
import { isObject } from './typeof';

type StorageSyncParams<
	TKey extends string,
	TState extends Record<string, unknown>,
	TOmitArray extends Array<keyof TState>,
> =
	| [key: TKey, state: string]
	| [key: TKey, state: TState]
	| [key: TKey, state: TState, keysToOmit: TOmitArray];

const syncStateWithStorage = <
	TKey extends string,
	const TState extends Record<string, unknown>,
	TOmitArray extends Array<keyof TState>,
>(
	...params: StorageSyncParams<TKey, TState, TOmitArray>
) => {
	const [storageKey, state, keysToOmit] = params;

	switch (true) {
		case isObject(state) && keysToOmit !== undefined: {
			const stateSlice = pickKeys(state, keysToOmit);

			localStorage.setItem(storageKey, JSON.stringify(stateSlice));
			break;
		}

		case isObject(state): {
			localStorage.setItem(storageKey, JSON.stringify(state));
			break;
		}

		default: {
			localStorage.setItem(storageKey, state);
		}
	}
};

export { syncStateWithStorage };
