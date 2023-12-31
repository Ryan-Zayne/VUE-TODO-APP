const pickKeys = <
	TObject extends Record<string, unknown>,
	const TPickArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToPick: TPickArray
) => {
	const arrayFromInitObject = Object.entries(initialObject);

	const filteredArray = arrayFromInitObject.filter(([objectKey]) => keysToPick.includes(objectKey));

	const updatedObject = Object.fromEntries(filteredArray);

	return updatedObject as { [Key in Extract<keyof TObject, TPickArray[number]>]: TObject[Key] };
};

export { pickKeys };
