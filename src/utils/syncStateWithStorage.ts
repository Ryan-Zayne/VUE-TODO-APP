import { pickKeys } from './pickKeys';
import { isObject } from './typeof';

function syncStateWithStorage<TKey extends string>(storageKey: TKey, state: string): void;
function syncStateWithStorage<TKey extends string, TState extends Record<string, unknown>>(
	storageKey: TKey,
	state: TState
): void;
function syncStateWithStorage<
	TKey extends string,
	const TState extends Record<string, unknown>,
	TOmitArray extends Array<keyof TState>,
>(storageKey: TKey, state: TState, keysToOmit: TOmitArray): void;

// Overload Implementation
function syncStateWithStorage(
	storageKey: string,
	state: string | Record<string, unknown>,
	keysToOmit?: string[]
) {
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
}

syncStateWithStorage('key', { breakfast: 'waffles' });

export { syncStateWithStorage };
