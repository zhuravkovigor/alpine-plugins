export const componentDirective = (el, { expression }) => {
  if (!expression) {
    return;
  }

  const template = document.getElementById(expression)?.content.cloneNode(true);

  if (!template) {
    console.error(`Template with ID "${expression}" not found.`);
    return;
  }

  console.log(template);

  el.appendChild(template);
  Alpine.initTree(el);
};
