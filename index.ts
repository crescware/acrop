import { main } from "./src";

main()
  .then((succeeded) => {
    const exitCode = succeeded ? 0 : 1;
    console.log(`Exiting with code ${exitCode}`);
    process.exit(exitCode);
  })
  .catch((e) => {
    console.error(e);
    console.log(`Exiting with code 1`);
    process.exit(1);
  });
