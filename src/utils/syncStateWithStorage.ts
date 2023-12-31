import { pickKeys } from './pickKeys';
import { isArray, isObject } from './typeof';

type SyncStorageParams =
	| [key: string, state: string]
	| [key: string, state: Record<string, unknown>]
	| [key: string, state: Record<string, unknown>, selectedKeys: string[]];

function syncStateWithStorage<TKey extends string, TString extends string>(
	...params: [key: TKey, state: TString]
): void;

function syncStateWithStorage<TKey extends string, TObject extends Record<string, unknown>>(
	...params: [key: TKey, state: TObject]
): void;

function syncStateWithStorage<
	TKey extends string,
	TObject extends Record<string, unknown>,
	const TPickArray extends Array<keyof TObject>,
>(...params: [key: TKey, state: TObject, selectedKeys: TPickArray]): void;

// Overload Implementation
function syncStateWithStorage(...params: SyncStorageParams): void {
	const [storageKey, state, keysToOmit] = params;

	switch (true) {
		case isObject(state) && keysToOmit !== undefined: {
			const stateSlice = pickKeys(state, keysToOmit);

			localStorage.setItem(storageKey, JSON.stringify(stateSlice));
			break;
		}

		case isObject(state) || isArray(state): {
			localStorage.setItem(storageKey, JSON.stringify(state));
			break;
		}

		default: {
			localStorage.setItem(storageKey, state);
		}
	}
}

export { syncStateWithStorage };
