# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added Up/Down keyboard handling in `widget.js:51-64`. The keys only act while
  the palette is open, and the default input-caret movement is prevented so
  focus remains in the search field.
- Added `moveSelection(direction)` in `widget.js:188-226`. It moves the
  `.selected` highlight by one result, stops at the first and last results,
  does nothing when there are no results, and scrolls the highlighted result
  into view.
- Connected the new selection behavior to the existing result rendering and
  Enter handling: `widget.js:173-185` selects the first result after each
  search, while `widget.js:228-244` makes Enter open whichever result is
  currently selected.
- Updated the keyboard instructions in `README.md:49-53` and
  `docs/index.html:232-243`, and marked arrow navigation complete in
  `ROADMAP.md:5`.

