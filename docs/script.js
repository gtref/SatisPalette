(() => {
  const menuButton = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const filterInput = document.getElementById("nav-filter");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const copyStatus = document.getElementById("copy-status");

  function setMenuOpen(isOpen) {
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  }

  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });

  sidebar.addEventListener("click", event => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }

    if (
      event.key === "/" &&
      !event.ctrlKey &&
      !event.metaKey &&
      !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
    ) {
      event.preventDefault();
      filterInput.focus();
    }
  });

  filterInput.addEventListener("input", () => {
    const query = filterInput.value.trim().toLocaleLowerCase();
    for (const link of navLinks) {
      link.hidden = !link.textContent.toLocaleLowerCase().includes(query);
    }
  });

  const sections = navLinks
    .map(link => document.querySelector(link.hash))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          const currentId = `#${visible[0].target.id}`;
          for (const link of navLinks) {
            const active = link.hash === currentId;
            link.classList.toggle("active", active);
            if (active) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    sections.forEach(section => observer.observe(section));
  }

  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", async () => {
      const code = document.getElementById(button.dataset.copy);
      if (!code) {
        console.error("[SatisPalette docs] Copy target was not found.");
        copyStatus.textContent = "Could not find the code to copy.";
        return;
      }

      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = "Copied";
        copyStatus.textContent = "Code copied to clipboard.";
        window.setTimeout(() => {
          button.textContent = "Copy";
        }, 1600);
      } catch (error) {
        console.error("[SatisPalette docs] Unable to copy code.", error);
        copyStatus.textContent = "Copy failed. Select and copy the code manually.";
      }
    });
  });
})();
