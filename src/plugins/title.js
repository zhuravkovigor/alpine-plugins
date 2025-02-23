import Alpine from "alpinejs";

export const titleDirective = (el, { expression }, { evaluate }) => {
  // Evaluate the expression and set the title on initialization
  const initialTitle = evaluate(expression);
  document.title = initialTitle;
};
