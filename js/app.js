/* ============================================================
   Liva Atölye — mağaza mantığı (vanilla JS, bağımlılık yok)
   ============================================================ */
(() => {
  'use strict';

  const PRODUCTS = [
    {
      id: 'seramik-kupa',
      name: 'El Yapımı Seramik Kupa',
      category: 'Seramik',
      price: 340,
      oldPrice: 390,
      image: 'assets/products/seramik-kupa.webp',
      badge: 'Çok satan',
      rating: 4.9,
      reviews: 86,
      stock: 12,
      short: 'Benekli krem sır, terrakota ağız kenarı.',
      description: 'Çamur tezgâhında tek tek şekillendirilen, 1200 °C\'de pişirilen günlük kullanım kupası. Her birinin benek dağılımı biraz farklıdır; bu da onu eşsiz kılar. Bulaşık makinesine ve mikrodalgaya uygundur.',
      details: ['Yaklaşık 300 ml hacim', 'Gıda uyumlu, kurşunsuz sır', 'Bulaşık makinesinde yıkanabilir', 'El yapımı: küçük farklılıklar doğaldır']
    },
    {
      id: 'soya-mumu',
      name: 'Lavanta Soya Mumu',
      category: 'Mum & Koku',
      price: 220,
      image: 'assets/products/soya-mumu.webp',
      badge: 'Yeni',
      rating: 4.8,
      reviews: 54,
      stock: 24,
      short: 'Doğal soya vaksı, yumuşak lavanta kokusu.',
      description: 'Parafin içermeyen soya vaksı ve pamuk fitille elle döküldü. Yaklaşık 35 saat yanma süresi sunar. Kutusu geri dönüştürülebilir amber cam; bittiğinde saksı ya da kalemlik olarak kullanabilirsiniz.',
      details: ['180 g · yaklaşık 35 saat yanma', 'Doğal soya vaksı, pamuk fitil', 'Uçucu yağ ile hafif lavanta kokusu', 'Her kullanımda fitili 3 mm kısaltın']
    },
    {
      id: 'dokuma-runner',
      name: 'Dokuma Pamuklu Runner',
      category: 'Tekstil',
      price: 680,
      image: 'assets/products/dokuma-runner.webp',
      badge: 'Sınırlı',
      rating: 5.0,
      reviews: 31,
      stock: 6,
      short: 'El tezgâhında dokunmuş, okra çizgili keten dokulu.',
      description: 'Kadıköy\'deki atölyede el tezgâhında dokunan %100 pamuklu masa runner\'ı. Doğal krem zemin üzerine ince okra çizgiler ve elde bağlanmış püsküller. Sofraya sıcak, sade bir doku katar.',
      details: ['40 × 150 cm', '%100 pamuk, el tezgâhı dokuma', '30 °C\'de hassas yıkama', 'Sınırlı üretim: 6 adet']
    },
    {
      id: 'kesme-tahtasi',
      name: 'Zeytin Ağacı Kesme Tahtası',
      category: 'Ahşap',
      price: 540,
      image: 'assets/products/kesme-tahtasi.svg',
      badge: null,
      rating: 4.9,
      reviews: 42,
      stock: 9,
      short: 'Saplı, doğal yağla bitirilmiş tek parça ahşap.',
      description: 'Sürdürülebilir kaynaklardan gelen tek parça zeytin ağacından yapıldı. Zımparalanıp gıda güvenli mineral yağ ile bitirildi. Her tahtanın damar deseni kendine özgüdür; yıllarla birlikte daha da güzelleşir.',
      details: ['Yaklaşık 30 × 20 cm, sap dahil', 'Tek parça zeytin ağacı', 'Mineral yağ ile cilalanmıştır', 'Elde yıkayın, kurulamayı unutmayın']
    },
    {
      id: 'hasir-sepet',
      name: 'El Dokuma Hasır Sepet',
      category: 'Dekor',
      price: 420,
      image: 'assets/products/hasir-sepet.svg',
      badge: null,
      rating: 4.7,
      reviews: 28,
      stock: 14,
      short: 'Deniz otu örgüsü, iki kulplu, hafif ve sağlam.',
      description: 'Doğal deniz otunun elde örülmesiyle yapılan çok amaçlı sepet. Ekmek, dergi, oyuncak ya da küçük bir bitki için ideal. Hafiftir, katlanmaz; yıllar içinde rengi biraz daha bal tonuna döner.',
      details: ['Yaklaşık 32 cm çap · 22 cm yükseklik', 'Doğal deniz otu, el örgüsü', 'İki sağlam kulplu', 'Nemli bezle silin, ıslatmayın']
    },
    {
      id: 'seramik-vazo',
      name: 'Mat Beyaz Seramik Vazo',
      category: 'Seramik',
      price: 590,
      oldPrice: 650,
      image: 'assets/products/seramik-vazo.svg',
      badge: 'İndirim',
      rating: 4.8,
      reviews: 37,
      stock: 8,
      short: 'Organik formlu, mat sırlı; kuru dallarla çok yakışır.',
      description: 'Serbest elde şekillendirilmiş yumuşak, asimetrik formuyla ışığı farklı açılardan alan bir vazo. Mat beyaz sır, hem kuru dal hem de taze çiçeklerle sade bir duruş sağlar. İçi sırlıdır, su tutar.',
      details: ['Yaklaşık 22 cm yükseklik', 'Mat sır, iç yüzey sırlı', 'Su geçirmez, çiçek için uygun', 'El yapımı: formlar birbirinden biraz farklıdır']
    }
  ];

  const CATEGORIES = ['Tümü', ...new Set(PRODUCTS.map(p => p.category))];
  const CART_KEY = 'liva-atolye-cart-v1';
  const FAV_KEY = 'liva-atolye-fav-v1';
  const FREE_SHIPPING = 750;

  const money = new Intl.NumberFormat('tr-TR', {
    style: 'currency', currency: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 0
  });
  const fmt = n => money.format(n);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  function load(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : fallback;
    } catch (_) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* depolama kapalıysa sessizce geç */ }
  }

  const state = {
    category: 'Tümü',
    query: '',
    sort: 'featured',
    favoritesOnly: false,
    cart: load(CART_KEY, []).filter(x => x && typeof x.id === 'string' && Number(x.qty) > 0),
    favorites: load(FAV_KEY, []).filter(x => typeof x === 'string')
  };
  let modalId = null;
  let modalQty = 1;
  let lastFocus = null;
  let toastTimer = null;

  const $ = id => document.getElementById(id);
  const els = {
    filters: $('filters'), grid: $('productGrid'), resultCount: $('resultCount'), empty: $('emptyState'),
    search: $('searchInput'), headerSearch: $('headerSearch'), headerSearchInput: $('headerSearchInput'),
    searchToggle: $('searchToggle'), sort: $('sortSelect'), favToggle: $('favToggle'), favCount: $('favCount'),
    cartButton: $('cartButton'), cartCount: $('cartCount'), cartDrawer: $('cartDrawer'),
    cartItemCount: $('cartItemCount'), cartBody: $('cartBody'), cartFoot: $('cartFoot'),
    overlay: $('overlay'), modal: $('productModal'), modalImage: $('modalImage'), modalContent: $('modalContent'),
    toast: $('toast'), toastText: $('toastText'), contactForm: $('contactForm')
  };

  const productById = id => PRODUCTS.find(p => p.id === id);
  const cartQty = () => state.cart.reduce((sum, line) => sum + line.qty, 0);
  const cartTotal = () => state.cart.reduce((sum, line) => {
    const p = productById(line.id);
    return p ? sum + p.price * line.qty : sum;
  }, 0);

  /* ---------------- Vitrin ---------------- */
  function renderFilters() {
    els.filters.innerHTML = CATEGORIES.map(c => `
      <button type="button" class="filter-chip ${state.category === c ? 'is-active' : ''}"
        data-action="filter" data-category="${esc(c)}" aria-pressed="${state.category === c}">${esc(c)}</button>
    `).join('');
    els.favToggle.classList.toggle('is-active', state.favoritesOnly);
    els.favToggle.setAttribute('aria-pressed', String(state.favoritesOnly));
    els.favCount.textContent = state.favorites.length;
  }

  function visibleProducts() {
    const q = state.query.toLocaleLowerCase('tr-TR');
    const list = PRODUCTS.filter(p => {
      const inCategory = state.category === 'Tümü' || p.category === state.category;
      const inFavorites = !state.favoritesOnly || state.favorites.includes(p.id);
      const inSearch = !q || `${p.name} ${p.short} ${p.category}`.toLocaleLowerCase('tr-TR').includes(q);
      return inCategory && inFavorites && inSearch;
    });
    if (state.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (state.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    return list;
  }

  function productCard(p) {
    const fav = state.favorites.includes(p.id);
    const sale = p.badge === 'İndirim';
    return `
      <article class="product-card">
        <button type="button" class="product-media" data-action="detail" data-id="${p.id}" aria-label="${esc(p.name)} detaylarını gör">
          <img src="${p.image}" alt="${esc(p.name)}" loading="lazy">
          ${p.badge ? `<span class="product-badge ${sale ? 'is-sale' : ''}">${esc(p.badge)}</span>` : ''}
        </button>
        <button type="button" class="fav-btn ${fav ? 'is-active' : ''}" data-action="fav" data-id="${p.id}"
          aria-label="${fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}: ${esc(p.name)}" aria-pressed="${fav}">
          ${icon('heart')}
        </button>
        <div class="product-body">
          <span class="product-category">${esc(p.category)}</span>
          <h3 class="product-name"><a href="#" data-action="detail" data-id="${p.id}">${esc(p.name)}</a></h3>
          <p class="product-desc">${esc(p.short)}</p>
          <div class="product-rating">${icon('star', 'star')} <b>${String(p.rating).replace('.', ',')}</b> <span>(${p.reviews} değerlendirme)</span></div>
          <div class="product-bottom">
            <div class="price"><strong>${fmt(p.price)}</strong>${p.oldPrice ? `<del>${fmt(p.oldPrice)}</del>` : ''}</div>
            <button type="button" class="add-btn" data-action="add" data-id="${p.id}">${icon('plus')} Sepete ekle</button>
          </div>
        </div>
      </article>`;
  }

  function renderProducts() {
    const list = visibleProducts();
    els.grid.innerHTML = list.map(productCard).join('');
    els.empty.hidden = list.length > 0;
    const parts = [`${list.length} ürün gösteriliyor`];
    if (state.category !== 'Tümü') parts.push(state.category);
    if (state.favoritesOnly) parts.push('favoriler');
    if (state.query) parts.push(`“${state.query}” araması`);
    els.resultCount.textContent = parts.join(' · ');
  }

  function renderAll() { renderFilters(); renderProducts(); }

  function setQuery(value) {
    state.query = value.trim();
    els.search.value = value;
    els.headerSearchInput.value = value;
    renderProducts();
  }

  function resetFilters() {
    state.category = 'Tümü';
    state.sort = 'featured';
    state.favoritesOnly = false;
    els.sort.value = 'featured';
    setQuery('');
    renderAll();
  }

  /* ---------------- Sepet ---------------- */
  function updateCartBadge() {
    els.cartCount.textContent = cartQty();
    els.cartButton.setAttribute('aria-label', `Sepeti aç, ${cartQty()} ürün`);
    els.cartButton.classList.remove('bump');
    void els.cartButton.offsetWidth;
    els.cartButton.classList.add('bump');
  }

  function addToCart(id, qty = 1) {
    const p = productById(id);
    if (!p) return;
    const line = state.cart.find(x => x.id === id);
    if (line) line.qty = Math.min(99, line.qty + qty);
    else state.cart.push({ id, qty });
    save(CART_KEY, state.cart);
    updateCartBadge();
    renderCart();
    toast(`${p.name} sepete eklendi`);
  }

  function changeQty(id, delta) {
    const line = state.cart.find(x => x.id === id);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) state.cart = state.cart.filter(x => x.id !== id);
    else line.qty = Math.min(99, line.qty);
    save(CART_KEY, state.cart);
    updateCartBadge();
    renderCart();
  }

  function removeLine(id) {
    state.cart = state.cart.filter(x => x.id !== id);
    save(CART_KEY, state.cart);
    updateCartBadge();
    renderCart();
    toast('Ürün sepetten çıkarıldı');
  }

  function renderCart() {
    const count = cartQty();
    els.cartItemCount.textContent = `${count} ürün`;

    if (!state.cart.length) {
      els.cartBody.innerHTML = `
        <div class="cart-empty">
          <span class="empty-icon">${icon('cart')}</span>
          <h3>Sepetiniz boş</h3>
          <p>Atölyeden çıkanlara göz atıp beğendiklerinizi ekleyebilirsiniz.</p>
          <button type="button" class="btn btn-outline" data-action="browse">Ürünlere göz at</button>
        </div>`;
      els.cartFoot.hidden = true;
      return;
    }

    els.cartBody.innerHTML = state.cart.map(line => {
      const p = productById(line.id);
      if (!p) return '';
      return `
        <div class="cart-line">
          <img src="${p.image}" alt="${esc(p.name)}">
          <div class="cart-line-info">
            <strong>${esc(p.name)}</strong>
            <span>${esc(p.category)} · ${fmt(p.price)} / adet</span>
            <div class="line-controls">
              <button type="button" data-action="qty" data-id="${p.id}" data-delta="-1" aria-label="${esc(p.name)} adedini azalt">${icon('minus')}</button>
              <b>${line.qty}</b>
              <button type="button" data-action="qty" data-id="${p.id}" data-delta="1" aria-label="${esc(p.name)} adedini artır">${icon('plus')}</button>
            </div>
          </div>
          <div class="cart-line-side">
            <strong>${fmt(p.price * line.qty)}</strong>
            <button type="button" class="cart-remove" data-action="remove" data-id="${p.id}" aria-label="${esc(p.name)} ürününü sepetten çıkar">${icon('trash')}</button>
          </div>
        </div>`;
    }).join('');

    const total = cartTotal();
    const remaining = Math.max(0, FREE_SHIPPING - total);
    els.cartFoot.hidden = false;
    els.cartFoot.innerHTML = `
      <p class="shipping-note">${icon('truck')} ${remaining > 0 ? `Ücretsiz kargo için <strong>${fmt(remaining)}</strong> kaldı` : 'Ücretsiz kargo kazandınız!'}</p>
      <div class="shipping-bar"><i style="width:${Math.min(100, (total / FREE_SHIPPING) * 100)}%"></i></div>
      <div class="cart-total"><span>Ara toplam</span><strong>${fmt(total)}</strong></div>
      <button type="button" class="btn btn-primary btn-block" data-action="checkout">Siparişi tamamla ${icon('arrow')}</button>
      <p class="demo-note">Demo mağaza: ödeme alınmaz, sipariş kaydı oluşturulmaz.</p>`;
  }

  function checkout() {
    const total = cartTotal();
    if (!total) return;
    state.cart = [];
    save(CART_KEY, state.cart);
    updateCartBadge();
    renderCart();
    closeAll();
    toast(`Sipariş talebiniz alındı (demo) · Toplam ${fmt(total)}`);
  }

  /* ---------------- Ürün detayı ---------------- */
  function renderModalContent() {
    const p = productById(modalId);
    if (!p) return;
    els.modalContent.innerHTML = `
      <span class="product-category">${esc(p.category)}</span>
      <h2 id="modalTitle">${esc(p.name)}</h2>
      <div class="modal-rating">${icon('star', 'star')} <b>${String(p.rating).replace('.', ',')}</b> · ${p.reviews} değerlendirme</div>
      <div class="modal-price"><strong>${fmt(p.price)}</strong>${p.oldPrice ? `<del>${fmt(p.oldPrice)}</del>` : ''}</div>
      <p class="modal-desc">${esc(p.description)}</p>
      <ul class="modal-details">${p.details.map(d => `<li>${icon('check')}<span>${esc(d)}</span></li>`).join('')}</ul>
      <div class="modal-actions">
        <div class="qty-picker">
          <button type="button" data-action="modal-qty" data-delta="-1" aria-label="Adedi azalt">${icon('minus')}</button>
          <b id="modalQty">${modalQty}</b>
          <button type="button" data-action="modal-qty" data-delta="1" aria-label="Adedi artır">${icon('plus')}</button>
        </div>
        <button type="button" class="btn btn-primary" data-action="modal-add">${icon('cart')} Sepete ekle · ${fmt(p.price * modalQty)}</button>
      </div>
      <p class="stock-note">Stokta ${p.stock} adet · 24 saat içinde kargoya verilir</p>`;
  }

  function openProduct(id) {
    const p = productById(id);
    if (!p) return;
    modalId = id;
    modalQty = 1;
    els.modalImage.src = p.image;
    els.modalImage.alt = p.name;
    renderModalContent();
    openLayer('modal');
  }

  /* ---------------- Katmanlar ---------------- */
  function openLayer(which) {
    lastFocus = document.activeElement;
    els.overlay.classList.add('is-open');
    els.overlay.setAttribute('aria-hidden', 'false');
    if (which === 'cart') {
      els.modal.classList.remove('is-open');
      els.modal.setAttribute('aria-hidden', 'true');
      els.cartDrawer.classList.add('is-open');
      els.cartDrawer.setAttribute('aria-hidden', 'false');
      els.cartDrawer.querySelector('[data-close]').focus();
    } else {
      els.cartDrawer.classList.remove('is-open');
      els.cartDrawer.setAttribute('aria-hidden', 'true');
      els.modal.classList.add('is-open');
      els.modal.setAttribute('aria-hidden', 'false');
      els.modal.querySelector('[data-close]').focus();
    }
    document.body.classList.add('no-scroll');
  }

  function closeAll() {
    els.overlay.classList.remove('is-open');
    els.overlay.setAttribute('aria-hidden', 'true');
    els.cartDrawer.classList.remove('is-open');
    els.cartDrawer.setAttribute('aria-hidden', 'true');
    els.modal.classList.remove('is-open');
    els.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  function toast(message) {
    els.toastText.textContent = message;
    els.toast.classList.add('is-open');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove('is-open'), 3200);
  }

  /* ---------------- Olaylar ---------------- */
  document.addEventListener('click', event => {
    if (event.target.closest('[data-close]')) { closeAll(); return; }

    const target = event.target.closest('[data-action]');
    if (!target) return;
    const { action, id, delta, category } = target.dataset;

    switch (action) {
      case 'filter':
        state.category = category;
        renderAll();
        break;
      case 'favorites':
        state.favoritesOnly = !state.favoritesOnly;
        renderAll();
        break;
      case 'fav': {
        const i = state.favorites.indexOf(id);
        if (i > -1) state.favorites.splice(i, 1);
        else state.favorites.push(id);
        save(FAV_KEY, state.favorites);
        const p = productById(id);
        toast(i > -1 ? `${p.name} favorilerden çıkarıldı` : `${p.name} favorilere eklendi`);
        renderAll();
        break;
      }
      case 'detail':
        event.preventDefault();
        openProduct(id);
        break;
      case 'add':
        addToCart(id, 1);
        break;
      case 'reset':
        resetFilters();
        break;
      case 'browse':
        closeAll();
        document.getElementById('urunler').scrollIntoView({ behavior: 'smooth' });
        break;
      case 'qty':
        changeQty(id, Number(delta));
        break;
      case 'remove':
        removeLine(id);
        break;
      case 'checkout':
        checkout();
        break;
      case 'modal-qty':
        modalQty = Math.max(1, Math.min(99, modalQty + Number(delta)));
        renderModalContent();
        break;
      case 'modal-add':
        if (modalId) { addToCart(modalId, modalQty); openLayer('cart'); }
        break;
      default:
        break;
    }
  });

  els.cartButton.addEventListener('click', () => { renderCart(); openLayer('cart'); });
  els.overlay.addEventListener('click', closeAll);
  els.search.addEventListener('input', e => setQuery(e.target.value));
  els.headerSearchInput.addEventListener('input', e => setQuery(e.target.value));
  els.sort.addEventListener('change', e => { state.sort = e.target.value; renderProducts(); });
  els.favToggle.addEventListener('click', () => {
    state.favoritesOnly = !state.favoritesOnly;
    renderAll();
  });
  $('resetFilters').addEventListener('click', resetFilters);
  $('headerSearchClose').addEventListener('click', () => toggleHeaderSearch(false));
  els.searchToggle.addEventListener('click', () => toggleHeaderSearch(els.headerSearch.hidden));

  function toggleHeaderSearch(open) {
    els.headerSearch.hidden = !open;
    els.searchToggle.setAttribute('aria-expanded', String(open));
    if (open) els.headerSearchInput.focus();
    else setQuery('');
  }

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (els.modal.classList.contains('is-open') || els.cartDrawer.classList.contains('is-open')) closeAll();
    else if (!els.headerSearch.hidden) toggleHeaderSearch(false);
  });

  els.contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = $('cfName').value.trim();
    toast(`Teşekkürler ${name || ''}! Mesajınız alındı (demo).`);
    els.contactForm.reset();
  });

  /* ---------------- Başlangıç ---------------- */
  $('year').textContent = new Date().getFullYear();
  renderAll();
  renderCart();
  els.cartCount.textContent = cartQty();
})();
