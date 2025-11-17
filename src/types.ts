import type { CountryCode } from 'libphonenumber-js'

/**
 * Options accepted by the phone number validation rule.
 * Configures phone number validation behavior.
 *
 * Unlike mobile validation which is locale-based, phone validation
 * uses international phone number standards with optional country context.
 *
 * @example
 * const options: Options = {
 *   countryCode: 'US'
 * }
 */
export type Options = {
  /**
   * ISO 3166-1 alpha-2 country code for default country when validating national numbers.
   * When provided, allows validation of national format numbers in addition to international format.
   * If not provided, only international format (+prefix) numbers are accepted.
   */
  countryCode?: CountryCode
}
