import Alpine from "alpinejs";

Alpine.store("route", {
  params: {},
  data: {},
  path: window.location.pathname,
}); // Initialize route store

export const routeDirective =
  () =>
  (el, { expression }, { evaluate }) => {
    el.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default behavior of anchor tag
      let target = evaluate(expression);
      if (typeof target === "object" && target.path) {
        let path = target.path;
        let queryString = "";
        if (target.params) {
          queryString = new URLSearchParams(target.params).toString();
          path += `?${queryString}`;
        }
        history.pushState({}, null, path);
        fetchPage(path);
        Alpine.store("route", {
          params: target.params || {},
          data: {},
          path: path,
        }); // Save params and path in Alpine store
      } else {
        history.pushState({}, null, target);
        fetchPage(target);
        Alpine.store("route", {
          params: {},
          data: {},
          path: target,
        }); // Save empty params and path in Alpine store
      }
    });
  };

const cache = new Map();

function fetchPage(page) {
  const [path] = page.split("?");
  const pageName = path === "" ? "/" : path;
  const cached = cache.get(pageName);
  const now = Date.now();

  if (cached && now - cached.timestamp < 2 * 60 * 1000) {
    document.getElementById("content").innerHTML = cached.html;
    return;
  }

  const fetchUrl =
    pageName === "/" ? "../pages/index.html" : `../pages/${pageName}.html`;

  fetch(fetchUrl)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
      cache.set(pageName, { html, timestamp: now });
    })
    .catch((error) => {
      console.error("Error loading page:", error);
    });
}

// Load the initial page based on the current URL,
// use "/" if we're on the home page "/"
const initialPage =
  window.location.pathname === "/"
    ? "/"
    : window.location.pathname.substring(1) + window.location.search;

// Check if there are URL parameters and push them to route store
const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());
Alpine.store("route", {
  params: params,
  data: {},
  path: window.location.pathname,
});

fetchPage(initialPage);

// Handle the popstate event to support back/forward navigation
window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  const search = window.location.search;
  const page = path === "/" ? "/" : path.substring(1) + search;
  fetchPage(page);
});
