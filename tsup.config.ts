import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: [],
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'build',
  publicDir: true,
  format: ['esm'],
  dts: true,
  minify: !options.watch,
}))
