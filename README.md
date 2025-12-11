<div align="center">
  <img src="https://github.com/user-attachments/assets/2c7ad673-e84f-41b1-a95b-bb432eedd6c1" />
</div>

<div align="center">

![Version](https://img.shields.io/npm/v/@julienbenac/vine-plugin-phone?style=for-the-badge&colorA=4c566a&colorB=5382a1&logo=npm&logoColor=white)
![Code Size](https://img.shields.io/github/languages/code-size/julienbenac/vine-plugin-phone?style=for-the-badge&colorA=4c566a&colorB=ebcb8b&logo=github&logoColor=white)
![License](https://img.shields.io/github/license/julienbenac/vine-plugin-phone?style=for-the-badge&colorA=4c566a&colorB=a3be8c)

</div>

`@julienbenac/vine-plugin-phone` is a VineJS plugin that provides reliable validation for international phone numbers.

> [!NOTE]
> The phone validation rule is offered as a separate plugin, rather than being included in the VineJS core. This keeps the core package lightweight and fast. The plugin uses the [`libphonenumber-js`](https://www.npmjs.com/package/libphonenumber-js) library to accurately recognize and validate phone numbers from many countries. By providing phone validation as an optional plugin, you only add this feature when needed, without affecting projects that do not require it.

## Getting started

### Installation

Before using this plugin, make sure you have installed the core package `@vinejs/vine`. Once this is done, you can install the `@julienbenac/vine-plugin-phone` package.

<details open>
  <summary><strong>📦 Using npm</strong></summary>

```bash
npm install @julienbenac/vine-plugin-phone
```

</details>

<details>
  <summary><strong>🚀 Using pnpm</strong></summary>

```bash
pnpm add @julienbenac/vine-plugin-phone
```

</details>

<details>
  <summary><strong>🧶 Using yarn</strong></summary>

```bash
yarn add @julienbenac/vine-plugin-phone
```

</details>

<details>
  <summary><strong>🥟 Using bun</strong></summary>

```bash
bun add @julienbenac/vine-plugin-phone
```

</details>

### Usage

#### Direct usage

This approach is easy to implement, but it is less reusable and not as well integrated into the Vine validation system. It works well for quick setups, but for more maintainable and consistent code, extending the schema classes is recommended.

```ts
// validator.ts

import { phoneRule } from '@julienbenac/vine-plugin-phone'
import vine from '@vinejs/vine'

const schema = vine.object({
  phone: vine.string().use(phoneRule({ countryCode: 'FR' })),
})
```

You may define a callback function to compute the options at runtime.

```ts
// validator.ts

import { phoneRule } from '@julienbenac/vine-plugin-phone'
import vine from '@vinejs/vine'

const schema = vine.object({
  phone: vine.string().use(
    phoneRule((field) => ({
      countryCode: 'FR',
    }))
  ),
})
```

#### Extending schema classes

This approach is more reusable and better integrated into the Vine validation system. By extending the `VineString` class, you create a custom, chainable method that fits naturally into your validation schemas. This makes your codebase cleaner, easier to maintain, and consistent with other built-in validation rules such as email or url.

```ts
// vine.ts

import type { Options } from '@julienbenac/vine-plugin-phone'

import { phoneRule } from '@julienbenac/vine-plugin-phone'

declare module '@vinejs/vine' {
  interface VineString {
    phone(options: Options): this
  }
}

VineString.macro('phone', function (this: VineString, options: Options) {
  return this.use(phoneRule(options))
})
```

Integrating phone validation as a native method in your schema definitions makes your code easier to read and maintain. You can use the `phone` method directly in validation chains, just like built-in rules. This improves consistency and clarity throughout your codebase.

```ts
// validator.ts

import vine from '@vinejs/vine'

const schema = vine.object({
  phone: vine.string().phone({ countryCode: 'FR' }),
})
```

You may define a callback function to compute the options at runtime.

```ts
// validator.ts

import vine from '@vinejs/vine'

const schema = vine.object({
  phone: vine.string().phone((field) => ({
    countryCode: 'FR',
  })),
})
```

#### Custom error messages

The [`libphonenumber-js`](https://www.npmjs.com/package/libphonenumber-js) module handles international formats very well. To provide a better UX, you can customize and translate error messages according to the user's language (via an i18n module or a static dictionary). You can also provide readable field names so messages feel more natural to end users.

```ts
// vine.ts

import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const messages = {
  phone: 'Le champ {{ field }} doit être un numéro de téléphone valide',
}

const fields = {
  phone: 'téléphone',
}

vine.messagesProvider = new SimpleMessagesProvider(messages, fields)
```

Now, when using the `phone` rule, error messages are automatically customized and translated according to the provided custom messages and fields.
