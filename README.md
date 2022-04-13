# hot-chain-svg

A toolkit for building on-chain SVG projects.

⚠️ Work in progress. It's not usable as a library yet, but feel free to fork the repo and play with it.

## Getting started

```
$ git clone https://github.com/w1nt3r-eth/hot-chain-svg
$ cd hot-chain-svg
$ yarn
```

### Hot Reloading

```
$ yarn start
```

Open the URL (http://localhost:9901). Every time you change `Renderer.sol`, the webpage will automatically refresh. Use Chrome DevTools to inspect the page.

### Visual QA

```
$ yarn qa
```

This will render 256 tokens into a temporary folder. It will also check the resulting SVG for syntax errors. Open the folder and view the resulting files. Feel free to edit `src/qa.js`.

### React-inspired API

You'll notice there's `SVG.sol` inside the `contracts` folder. The idea is to provide a React-inspired API, tailored to SVG graphics. It's not complete. You don't have to use it to benefit from hot reloading and visual QA script.

## Under the hood

`hot-chain-svg` uses `solc` to compile Solidity files. Then, it deploys it to a local VM instance (powered by `@ethereumjs/vm`) and calls the `example` function. The resulting SVG image is served via the built-in HTTP server.

The tool also watches the files in `contracts` for changes. When it detects a change, it sends an event to the browser via EventSource subscription, which causes the page to reload.

## Contributing

Check out GitHub issues and feel free to send a PR.

## Credits

Built by [@w1nt3r_eth](https://twitter.com/w1nt3r_eth) and [@tylerangert](https://twitter.com/tylerangert).
This project was extracted from [Watchfaces.World](https://www.watchfaces.world/).
