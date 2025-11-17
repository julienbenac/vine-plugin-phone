import type { CountryCode } from 'libphonenumber-js'

import parsePhoneNumberFromString from 'libphonenumber-js'

/**
 * Validates phone numbers.
 * Supports international format validation and country-specific validation.
 *
 * @param value - The phone number string to validate
 * @param countryCode - Optional ISO 3166-1 alpha-2 country code for validation context
 * @returns True if the phone number is valid according to international standards
 *
 * @example
 * isPhone('+14155551234') // true (US international format)
 * isPhone('+33123456789') // true (French international format)
 * isPhone('0123456789', 'FR') // true (French national format)
 * isPhone('123', 'US') // false (invalid format)
 */
export const isPhone = (value: string, countryCode?: CountryCode): boolean => {
  const phoneNumber = parsePhoneNumberFromString(value, countryCode)
  return phoneNumber?.isValid() ?? false
}
