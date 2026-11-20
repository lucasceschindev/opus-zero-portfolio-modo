(() => {
  'use strict';

  const products = {
    solar:  { name: 'Solar', price: 129, image: 'assets/flores-solar.svg' },
    bruma:  { name: 'Bruma', price: 139, image: 'assets/flores-bruma.svg' },
    aurora: { name: 'Aurora', price: 119, image: 'assets/flores-aurora.svg' },
    jardim: { name: 'Jardim', price: 149, image: 'assets/flores-jardim.svg' }
  };
  const customPrices = { p: 89, m: 129, g: 189 };
  const customLabels = { p: 'Um mimo', m: 'Um abraço', g: 'Um festão' };
  const money = amount => new Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL',maximumFractionDigits:0}).format(amount);
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const menu = document.getElementById('menu-button');
  const links = document.getElementById('main-nav');
  const setMenu = open => {
    links.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  menu.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('resize', () => { if (innerWidth > 900) setMenu(false); });

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.product')];
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => card.hidden = category !== 'todos' && card.dataset.category !== category);
  }));

  const form = document.getElementById('gift-form');
  const previewImg = document.getElementById('preview-image');
  const occasion = document.getElementById('preview-occasion');
  const sizeLabel = document.getElementById('preview-size');
  const previewPrice = document.getElementById('preview-price');
  const selected = name => form.querySelector(`input[name="${name}"]:checked`)?.value;
  function updatePreview() {
    const palette = selected('palette') || 'solar';
    const size = selected('size') || 'p';
    const reason = selected('occasion') || 'Só porque sim';
    previewImg.src = products[palette].image;
    previewImg.alt = `Prévia ilustrada de flores no estilo ${palette}`;
    occasion.textContent = reason;
    sizeLabel.textContent = customLabels[size];
    previewPrice.textContent = money(customPrices[size]);
  }
  form.addEventListener('change', updatePreview);

  const cart = [];
  const cartButton = document.getElementById('open-cart');
  const cartCount = document.getElementById('cart-count');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const closeCartButton = document.getElementById('close-cart');
  const clearCartButton = document.getElementById('clear-cart');
  let previouslyFocused = null;
  let toastTimeout;

  function toast(message) {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => el.classList.remove('show'), 2600);
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function renderCart() {
    cartItems.replaceChildren();
    if (cart.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'cart-empty';
      empty.textContent = 'Sua sacola está vazia por enquanto. ✳';
      cartItems.appendChild(empty);
    } else {
      cart.forEach((item, index) => {
        const entry = document.createElement('div');
        entry.className = 'cart-entry';
        entry.innerHTML = `<img src="${escapeHtml(item.image)}" alt=""><div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.description)}</small><button type="button" data-remove="${index}" aria-label="Remover ${escapeHtml(item.name)}">Remover</button></div><span class="entry-price">${money(item.price)}</span>`;
        cartItems.appendChild(entry);
      });
    }
    cartCount.textContent = String(cart.length);
    cartTotal.textContent = money(cart.reduce((sum, item) => sum + item.price, 0));
    clearCartButton.disabled = cart.length === 0;
  }

  function openCart() {
    previouslyFocused = document.activeElement;
    cartBackdrop.hidden = false;
    cartDrawer.hidden = false;
    document.body.style.overflow = 'hidden';
    cartDrawer.focus();
  }
  function closeCart() {
    cartBackdrop.hidden = true;
    cartDrawer.hidden = true;
    document.body.style.overflow = '';
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
  }
  cartButton.addEventListener('click', openCart);
  closeCartButton.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);
  cartDrawer.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeCart(); }
    if (event.key !== 'Tab') return;
    const focusables = [...cartDrawer.querySelectorAll('button:not([disabled])')];
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length-1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === cartDrawer)) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!cartDrawer.hidden) closeCart();
      if (links.classList.contains('open')) setMenu(false);
    }
  });

  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => {
    const p = products[button.dataset.add];
    if (!p) return;
    cart.push({...p,description:'Arranjo demonstrativo'});
    renderCart(); toast(`${p.name} adicionado à sacola fictícia ♡`);
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const palette = selected('palette') || 'solar';
    const size = selected('size') || 'p';
    const reason = selected('occasion') || 'Só porque sim';
    cart.push({name:`Buquê personalizado (${customLabels[size]})`,price:customPrices[size],description:`${reason} · ${palette}`,image:products[palette].image});
    renderCart(); openCart();
  });
  cartItems.addEventListener('click', event => {
    const button = event.target.closest('[data-remove]');
    if (!button) return;
    const index = Number(button.dataset.remove);
    if (Number.isInteger(index) && index >= 0 && index < cart.length) {
      cart.splice(index, 1); renderCart();
    }
  });
  clearCartButton.addEventListener('click', () => {cart.length=0;renderCart();toast('Sacola demonstrativa esvaziada');});
  renderCart(); updatePreview();
})();
