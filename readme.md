# Rollup Typescript library template

A simple TypeScript library template. Quick to start dev, build a Pure TypeScript or React Component library.

Please use pnpm do this.

```sh
pnpm i
```

# Usage

### Package

Bundle your source code via tsc, rollup.

```
npm run package
```

### Dev

Start dev mode by Vite.

```
npm run dev
```

### Deploy

Deploy example to GitHub Pages.

```
npm run deploy
npm run publish
```

# Additional

## ESBuild & React

If you want to bundle React JSX with rollup. Add additional packages.

```
pnpm i -D rollup-plugin-esbuild
```

And, un-comment this in `rollup.config.ts`.

```ts
esbuild({
  include: /\.[jt]sx?$/,
  exclude: /node_modules/,
  sourceMap: false,
  minify: process.env.NODE_ENV === 'production',
  target: 'es2017',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  define: {
    __VERSION__: '"x.y.z"',
  },
  tsconfig: './src/tsconfig.json',
  loaders: {
    '.json': 'json',
    '.js': 'jsx',
  },
}),
```

## PostCSS & CSS Module

Enable default now.

Nest selector is supported too.

To build css extract a file not bundle into js, un-comment this.

```ts
css({
  extract: true,
})
```



## License

2023 © Innei, MIT License.

> [Personal Site](https://innei.in/) · GitHub [@Innei](https://github.com/innei/)