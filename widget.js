/**
 * @author Gtref 2026
 * @license MIT
 * ------------------
 * @todo
 * [x] Parse JSON
 * [x] Register ctrl + k
 * [x] Load dialog on ctrl + k key bind
 * [x] Add CSS
 * [x] Build page index
 * [x] Search indexed pages
 * [ ] Enter opens selected result
 * [ ] Arrow navigation
 */

(() => {

    const config = window.CommandPaletteConfig || {
        data: "./search.json"
    };

    let searchData = [];

    function addListeners() {
        document.addEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(event) {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {
            event.preventDefault();

            const existing =
                document.getElementById("cp-palette");

            if (existing) {
                closePalette();
            } else {
                openPalette();
            }
        }

        if (event.key === "Escape") {
            closePalette();
        }
    }

    async function loadConfig() {

        try {

            const res = await fetch(config.data);

            if (!res.ok) {
                throw new Error(
                    `Failed to load ${config.data}`
                );
            }

            return await res.json();

        } catch (err) {

            console.error(
                "[CommandPalette]",
                err
            );

            return [];
        }
    }

    async function buildSearchIndex(pages) {

        const parser = new DOMParser();

        for (const page of pages) {

            try {

                console.log(
                    `[CommandPalette] Indexing ${page.url}`
                );

                const html = await fetch(page.url)
                    .then(res => res.text());

                const doc = parser.parseFromString(
                    html,
                    "text/html"
                );

                searchData.push({
                    title:
                        page.title ||
                        doc.title ||
                        page.url,

                    url: page.url,

                    content:
                        doc.body.innerText.toLowerCase()
                });

            } catch (err) {

                console.error(
                    `[CommandPalette] Failed to index ${page.url}`,
                    err
                );

            }
        }

        console.log(
            `[CommandPalette] Indexed ${searchData.length} pages`
        );
    }

    function performSearch(query) {

        query = query.toLowerCase();

        return searchData.filter(page =>
            page.title.toLowerCase().includes(query) ||
            page.content.includes(query)
        );

    }

    function renderResults(query) {

        const results =
            document.getElementById("cp-results");

        if (!results) {
            return;
        }

        if (query.trim() === "") {

            results.innerHTML = "";

            return;
        }

        const matches =
            performSearch(query);

        results.innerHTML = matches
            .slice(0, 10)
            .map(page => `
                <a
                    class="cp-result"
                    href="${page.url}"
                >
                    <strong>${page.title}</strong>
                    <br>
                    <small>${page.url}</small>
                </a>
            `)
            .join("");
    }

    function openPalette() {

        if (
            document.getElementById("cp-palette")
        ) {
            return;
        }

        const div =
            document.createElement("div");

        div.id = "cp-palette";

        div.innerHTML = `
            <input
                id="cp-search"
                type="text"
                placeholder="Search pages..."
            />

            <div id="cp-results"></div>
        `;

        document.body.appendChild(div);

        const input =
            document.getElementById("cp-search");

        input.focus();

        input.addEventListener(
            "input",
            () => renderResults(input.value)
        );
    }

    function closePalette() {

        document
            .getElementById("cp-palette")
            ?.remove();

    }

    function addStyles() {

        const style =
            document.createElement("style");

        style.textContent = `
            #cp-palette {
                position: fixed;
                top: 15%;
                left: 50%;
                transform: translateX(-50%);

                width: 600px;
                max-width: 90vw;

                background: white;

                border: 1px solid #ccc;
                border-radius: 10px;

                padding: 1rem;

                z-index: 99999;

                box-shadow:
                    0 10px 40px rgba(0,0,0,.25);
            }

            #cp-search {
                width: 100%;
                padding: .75rem;
                box-sizing: border-box;
                margin-bottom: 1rem;
            }

            #cp-results {
                max-height: 400px;
                overflow-y: auto;
            }

            .cp-result {
                display: block;
                text-decoration: none;

                color: inherit;

                padding: .75rem;

                border-radius: 6px;
            }

            .cp-result:hover {
                background: #f3f3f3;
            }
        `;

        document.head.appendChild(style);
    }

    async function init() {

        console.log(
            "[CommandPalette] Loading..."
        );

        const pages =
            await loadConfig();

        await buildSearchIndex(pages);

        addStyles();

        addListeners();

        console.log(
            "[CommandPalette] Ready"
        );
    }

    init();

})();
