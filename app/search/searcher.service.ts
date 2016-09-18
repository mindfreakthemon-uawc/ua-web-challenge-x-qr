import { createArray } from '../utils/creators.util';

export class SearchResult {
	constructor(public fromIndex: number,
	            public distances: number[],
	            public weights: number[][],
	            public pointers: number[]) {
	}

	getDistance(toIndex: number): number {
		return this.distances[toIndex];
	}

	getPath(toIndex: number): number[] {
		let path = [];

		let pointer = this.pointers[toIndex];

		while (pointer !== this.fromIndex) {
			path.unshift(pointer);
			pointer = this.pointers[pointer];
		}

		if (path.length === 0 && !Number.isFinite(this.weights[this.fromIndex][toIndex])) {
			return null;
		}

		path.unshift(this.fromIndex);
		path.push(toIndex);

		return path;
	}
}

export class SearcherService {

	weights: number[][];

	distances: number[];

	pointers: number[];

	flags: boolean[];

	length: number;

	impossible: boolean = false;

	search(weights: number[][], fromIndex: number): SearchResult {
		this.weights = weights;
		this.length = weights.length;
		this.flags = createArray<boolean>(this.length, false);
		this.pointers = createArray<number>(this.length, fromIndex);
		this.distances = createArray<number>(this.length, Number.POSITIVE_INFINITY);

		this.distances[fromIndex] = 0;

		this.procedureSearch();

		return new SearchResult(fromIndex, this.distances, this.weights, this.pointers);
	}

	protected procedureSearch(): void {
		let length = this.length;

		while (this.isNotAllVertexesProcessed()) {
			let index = this.getMinUnprocessedVertex();

			let distance = this.distances[index];

			this.flags[index] = true;

			for (let i = 0; i < length; i++) {
				if (i === index) {
					continue;
				}

				if (distance + this.weights[index][i] < this.distances[i]) {
					this.distances[i] = distance + this.weights[index][i];
					this.pointers[i] = index;
				}
			}
		}
	}

	protected getMinUnprocessedVertex(): number {
		let minValue = Number.POSITIVE_INFINITY;
		let minIndex = -1;

		this.distances
			.forEach((value, index) => {
				if (this.flags[index]) {
					return;
				}

				if (value < minValue) {
					minIndex = index;
				}
			});

		if (minIndex === -1 && this.isNotAllVertexesProcessed()) {
			// there are vertexes that are not connected to anything
			// so we just return the first one just so it get checked
			return this.flags.indexOf(false);
		}

		return minIndex;
	}

	protected isNotAllVertexesProcessed(): boolean {
		return this.flags.includes(false);
	}
}
