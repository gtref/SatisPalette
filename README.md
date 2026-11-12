# SatisPalette

SatisPalette is a small, client-side command palette for searching pages on a website. Visitors can open it with **Ctrl+K**, search page titles and text, and follow a result to the matching page.

## Get a copy

Clone the repository or download its files from [GitHub](https://github.com/gtref/SatisPalette). SatisPalette currently has no build step or package manager requirements; the widget is a plain JavaScript file.

## Add it to your site

Copy `widget.js` and create a `search.json` file in a location your site can serve. Add the configuration before the widget script on each page where you want the palette:

```html
<script>
  window.CommandPaletteConfig = {
    data: "./search.json",
    theme: "light"
  };
</script>
<script src="./widget.js"></script>
```

The `data` value is the URL of the JSON search index. If omitted, the widget looks for `/search.json` at the site root. Set `theme` to `"dark"` or `"light"` to choose the palette colors; it defaults to `"light"`.

## Build the search index

The index is a JSON array of pages. Each page needs a `url`; `title` is optional and will fall back to the page's document title or URL.

```json
[
  {
    "title": "Home",
    "url": "./index.html"
  },
  {
    "title": "Documentation",
    "url": "./docs.html"
  }
]
```

When it starts, the widget fetches each listed page and indexes its title and visible page text in the browser. Serve the site over HTTP(S), and make sure indexed pages can be fetched from the page running the widget (same origin, or a server configured to allow CORS).

## Use the palette

- Press **Ctrl+K** to open or close the search palette.
- Type to search page titles and text.
- Select a result to navigate to that page.
- Press **Escape** to close the palette.
- Press **Enter** to navigate to the top item in the results list.

The widget currently shows up to ten matching results. Search is a simple, case-insensitive substring match; keyboard arrow navigation is not currently supported.
