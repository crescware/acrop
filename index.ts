import { main } from './src';

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
