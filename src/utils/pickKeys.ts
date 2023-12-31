const pickKeys = <
	const TObject extends Record<string, unknown>,
	const TPickArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TPickArray
) => {
	const arrayFromFilteredObject = Object.entries(initialObject).filter(([key]) =>
		keysToOmit.includes(key)
	);

	const updatedObject = Object.fromEntries(arrayFromFilteredObject);

	return updatedObject as {
		[Key in Extract<keyof TObject, TPickArray[number]>]: TObject[Key];
	};
};

export { pickKeys };
