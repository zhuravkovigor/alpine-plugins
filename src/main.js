import Alpine from "alpinejs";
import { routeDirective } from "./plugins/route";
import { ajaxData } from "./plugins/ajax";
import { componentDirective } from "./plugins/component";
import { titleDirective } from "./plugins/title";

document.addEventListener("alpine:init", () => {
  Alpine.directive("route", routeDirective());
  Alpine.directive("component", componentDirective);
  Alpine.directive("title", titleDirective);
  Alpine.data("ajax", ajaxData);
});

window.Alpine = Alpine;
Alpine.start();
