# SatisPalette

SatisPalette is a lightweight, client-side command palette for searching
website pages. Its project documentation is published at
[SatisPalette](https://gtref.github.io/SatisPalette/site/).

## Run locally

No framework or package installation is needed to work on the documentation.
With Node.js installed, start the local server with:

```sh
npm run dev
```

Open the URL printed in the terminal. The server serves the landing page,
documentation, widget, and blog without changing the blog files.

## Build and preview

Build the static site into `site/`:

```sh
npm run build
```

Preview the generated files locally:

```sh
npm run preview
```

Commit and push the contents of `site/` to publish the documentation at
[https://gtref.github.io/SatisPalette/site/](https://gtref.github.io/SatisPalette/site/).

## Project layout

- `index.html`: project landing page.
- `docs/`: documentation written in plain HTML, CSS, and JavaScript.
- `widget.js` and `search.json`: the embeddable widget and example index.
- `site/`: generated, publishable landing page and documentation.
- `dist/` and `posts/`: separate blog output and source. The build does not
  modify them.
