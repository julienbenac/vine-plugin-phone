import type { FieldContext } from '@vinejs/vine/types'
import type { Options } from './types.js'

import vine from '@vinejs/vine'

import { isPhone } from './helpers.js'

/**
 * Validates the value to be a valid phone number.
 */
export const phoneRule = vine.createRule<
  Options | undefined | ((field: FieldContext) => Options | undefined)
>(function phone(value, options, field) {
  const normalizedOptions = options && typeof options === 'function' ? options(field) : options
  const countryCode = normalizedOptions?.countryCode

  if (!isPhone(value as string, countryCode)) {
    field.report('The {{ field }} field must be a valid phone number', 'phone', field)
  }
})
