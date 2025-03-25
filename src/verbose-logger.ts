import timeSpan from "time-span";

type StartImplReturn = () => void;

export class VerboseLogger {
	#verbose = false;

	constructor(verbose: boolean) {
		this.#verbose = verbose;
	}

	start(v: string): StartImplReturn {
		return this.#startImpl(v, false);
	}

	startWithHeader(v: string): StartImplReturn {
		return this.#startImpl(v, true);
	}

	#startImpl(v: string, showStartLog: boolean): StartImplReturn {
		if (!this.#verbose) {
			return () => {
				// noop
			};
		}

		if (showStartLog) {
			console.info(v);
			// no return;
		}

		const end = timeSpan();

		return () => {
			console.info([`${v}:`, end(), "ms"].join(" "));
		};
	}
}
