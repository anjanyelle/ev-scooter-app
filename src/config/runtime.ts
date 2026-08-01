import { generatedRuntimeConfig } from './generatedRuntime';

type RepositoryMode = 'mock' | 'http';

function optionalString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export const runtimeConfig = {
repositoryMode:
generatedRuntimeConfig.repositoryMode as RepositoryMode,
  apiBaseUrl: optionalString(generatedRuntimeConfig.apiBaseUrl),
  companyWebsite: optionalString(generatedRuntimeConfig.companyWebsite),
  playStoreUrl: optionalString(generatedRuntimeConfig.playStoreUrl),
  roadsideAssistancePhone: optionalString(generatedRuntimeConfig.roadsideAssistancePhone),
  buildEnvironment: optionalString(generatedRuntimeConfig.buildEnvironment) || 'development'
} as const;
