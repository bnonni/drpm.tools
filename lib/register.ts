import { register } from 'node:module';

// Register the hooks.js file
register('./hooks.js', import.meta.url);
