import { runtimeConfig } from '@/config/runtime';
import { getStoredAccessToken } from '@/storage/sessionStorage';

import { HttpEVRepository } from './repositories/httpRepository';
import { MockEVRepository } from './repositories/mockRepository';

// Backend switch: set LEXICON_REPOSITORY_MODE=http and provide a real HTTPS base URL.
export const evRepository =
  runtimeConfig.repositoryMode === 'http'
    ? new HttpEVRepository({
        baseUrl: runtimeConfig.apiBaseUrl,
        getToken: getStoredAccessToken
      })
    : new MockEVRepository();
