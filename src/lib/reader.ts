import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Reads Keystatic singletons from the repo at build time.
export const reader = createReader(process.cwd(), keystaticConfig);
