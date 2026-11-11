// Keep hash links to FAQ entries useful without inventing a chat integration.
document.querySelectorAll('a[href^="#faq-"]').forEach((link) => {
  link.addEventListener('click', () => {
    const detail = document.getElementById(link.hash.slice(1));
    if (detail instanceof HTMLDetailsElement) detail.open = true;
  });
});

// Request preparation only. No credentials or order writes in the public browser.
const bouquetCatalog = {
  'cedar-bloom': { name: 'Cedar Bloom', cents: 3500 },
  'rose-garden': { name: 'Rose Garden', cents: 5500 },
  'sunny-day': { name: 'Sunny Day', cents: 4500 },
};
const requestForm = document.getElementById('flower-request-form');
if (requestForm) {
  const bouquet = document.getElementById('bouquet');
  const quantity = document.getElementById('quantity');
  const fulfillment = document.getElementById('fulfillment');
  const destination = document.getElementById('destination');
  const request = document.getElementById('flower-request');
  const feedback = document.getElementById('copy-feedback');
  function updateRequest() {
    const pickup = fulfillment.value === 'pickup';
    const wasPickup = destination.options.length === 1 && destination.value === 'demo-store';
    if (pickup && !wasPickup) destination.replaceChildren(new Option('Cedar Market fictional pickup desk', 'demo-store'));
    if (!pickup && wasPickup) destination.replaceChildren(new Option('Alex Demo’s fictional home', 'demo-home'), new Option('Alex Demo’s fictional office', 'demo-office'));
    const total = (bouquetCatalog[bouquet.value].cents * Number(quantity.value) + (pickup ? 0 : 700)) / 100;
    document.getElementById('flower-estimate').textContent = `Illustrative total: $${total.toFixed(2)} USD. The AI agent must confirm a server quote.`;
    request.value = `I want a fictional flower order: ${quantity.value} ${bouquetCatalog[bouquet.value].name} bouquet(s), ${pickup ? 'pickup at' : 'demo delivery to'} ${destination.value}. Please quote it first and ask me to confirm. No real payment or delivery.`;
    feedback.textContent = '';
  }
  requestForm.addEventListener('submit', (event) => event.preventDefault());
  requestForm.addEventListener('change', updateRequest);
  document.getElementById('copy-flower-request').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(request.value);
      feedback.textContent = 'Copied. Use this in the lab AI agent preview or your test conversation. No order was submitted.';
    } catch {
      request.focus(); request.select();
      feedback.textContent = 'Select and copy the request above. No order was submitted.';
    }
  });
  updateRequest();
}
