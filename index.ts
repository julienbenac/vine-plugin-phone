import type { FieldContext } from '@vinejs/vine/types'
import type { Options as PhoneOptions } from './src/types.js'

export { isPhone } from './src/helpers.js'
export { phoneRule } from './src/rules.js'

export { messages } from './src/messages.js'

export type Options = PhoneOptions | undefined | ((field: FieldContext) => PhoneOptions | undefined)
