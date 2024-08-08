import { existsSync, readFileSync } from 'fs';

/**
 * Loads the appropriate environment variables for an event.
 */
const envLoader = () => {
  const env = process.env.npm_lifecycle_event || 'dev';
  const path = env.includes('test') || env.includes('cover') ? '.env.test' : '.env';

  if (existsSync(path)) {
    const data = readFileSync(path, 'utf-8').trim().split('\n');

    for (const line of data) {
      const delimPosition = line.indexOf('=');
      const variable = line.substring(0, delimPosition);
      const value = line.substring(delimPosition + 1);
      process.env[variable] = value;
    }
  }
};

const startServer = (api) => {
    envLoader();
    const port = process.env.PORT || 5000;
    const env = process.env.npm_lifecycle_event || 'dev';
    api.listen(port, () => {
      console.log(`[${env}] API has started listening at port:${port}`);
    });
  };
  
  export default startServer;