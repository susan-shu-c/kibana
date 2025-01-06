/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: Post Attack discovery API endpoint
 *   version: 1
 */

import { z } from '@kbn/zod';

import { AnonymizationFieldResponse } from '../anonymization_fields/bulk_crud_anonymization_fields_route.gen';
import { ApiConfig, Replacements } from '../conversations/common_attributes.gen';
import { AttackDiscoveryResponse } from './common_attributes.gen';

export type AttackDiscoveryPostRequestBody = z.infer<typeof AttackDiscoveryPostRequestBody>;
export const AttackDiscoveryPostRequestBody = z.object({
  alertsIndexPattern: z.string(),
  anonymizationFields: z.array(AnonymizationFieldResponse),
  /**
   * LLM API configuration.
   */
  apiConfig: ApiConfig,
  end: z.string().optional(),
  filter: z.object({}).catchall(z.unknown()).optional(),
  langSmithProject: z.string().optional(),
  langSmithApiKey: z.string().optional(),
  model: z.string().optional(),
  replacements: Replacements.optional(),
  size: z.number(),
  start: z.string().optional(),
  subAction: z.enum(['invokeAI', 'invokeStream']),
});
export type AttackDiscoveryPostRequestBodyInput = z.input<typeof AttackDiscoveryPostRequestBody>;

export type AttackDiscoveryPostResponse = z.infer<typeof AttackDiscoveryPostResponse>;
export const AttackDiscoveryPostResponse = AttackDiscoveryResponse;
