import { register } from 'node:module';

// Register the hooks from the compiled dpm.js file
register('./hooks.js', import.meta.url);
