// Keep hash links to FAQ entries useful without inventing a chat integration.
document.querySelectorAll('a[href^="#faq-"]').forEach((link) => {
  link.addEventListener('click', () => {
    const detail = document.getElementById(link.hash.slice(1));
    if (detail instanceof HTMLDetailsElement) detail.open = true;
  });
});
