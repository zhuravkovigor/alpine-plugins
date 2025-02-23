export const componentDirective = (el, { expression }) => {
  if (!expression) {
    console.error("Expression is not defined.");
    return;
  }

  console.log("Expression:", expression); // Add this line to debug the expression
  const template = document.getElementById(expression)?.content.cloneNode(true);

  if (!template) {
    console.error(`Template with ID "${expression}" not found.`);
    return;
  }

  el.appendChild(template);
  Alpine.initTree(el);
};
