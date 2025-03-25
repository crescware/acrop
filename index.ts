import { main } from "./src";

main()
	.then((succeeded) => {
		const exitCode = succeeded ? 0 : 1;
		console.info(`Exiting with code ${exitCode}`);
		process.exit(exitCode);
	})
	.catch((e) => {
		console.error(e);
		console.info("Exiting with code 1");
		process.exit(1);
	});
