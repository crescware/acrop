import timeSpan from "time-span";

type StartImplReturn = () => void;

export class VerboseLogger {
  #verbose: boolean = false;

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
      console.log(v);
    }

    const end = timeSpan();

    return () => {
      console.log([`${v}:`, end(), "ms"].join(" "));
    };
  }
}
