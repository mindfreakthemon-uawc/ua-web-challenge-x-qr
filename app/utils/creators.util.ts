type grabber<T> = ((i: number, j: number) => T);

export function createGrabber<T>(value: T | grabber<T>): grabber<T> {
	if (isSpecifier<T>(value)) {
		return value;
	} else {
		return (i: number, j: number) => value;
	}
}

export function createArray<T>(length: number, value: T | grabber<T>): T[] {
	let array = [];
	let grabber = createGrabber<T>(value);

	for (let i = 0; i < length; i++) {
		array[i] = grabber(i, i);
	}

	return array;
}

export function createMatrix<T>(length: number, value: T | grabber<T>): T[][] {
	let matrix = [];
	let grabber = createGrabber<T>(value);

	for (let i = 0; i < length; i++) {
		matrix[i] = [];

		for (let j = 0; j < length; j++) {
			matrix[i][j] = grabber(i, j);
		}
	}

	return matrix;
}

export function isSpecifier<T>(value: T | grabber<T>): value is grabber<T> {
	return typeof value === 'function';
}
