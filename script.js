
// ── HEADER SCROLL
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── HAMBURGER / MOBILE MENU
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobile-menu');
ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
}));

// ── PRODUCTS RENDER
const productGrid = document.getElementById('product-grid');

const products = [
    {
        name: 'Architectural Oversized Tee',
        color: 'Vintage Black',
        price: 48,
        originalPrice: null,
        badge: 'new',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH_prHpWXwfQKjjMl-W_TpHSoQxhunizc55Pffc6biWxXQkG73yNLsa0olhj1HXJBg9mN2aA0VA3xAprWalFe0G36-4Xx_VDtMZEoUukV0WQsZXOMGIQYnNn2LH0tfOpgw_CiovyFpdLfS_9G8GTYui6dBXaBsH1eAK6v9wlOciRNAaK3kKxI-RvBsNpQkX4JPnTKVl87Mny-huw_c_DEyG6mWHLF-rNNSb7OGMc9USylcfT4CVpmvP8YIclGCOvz888_p5LPCaJM',
        
    },
    {
        name: 'Signature Essential Tee',
        color: 'Pure White',
        price: 32,
        originalPrice: null,
        badge: null,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv4NPYfDx2U62G69d-R8aSkRWseGDgtZFtuRQyg_cfkKcnZW55TQLb5uzghSZQjzJOgZtVrCHevSm9FDWXnxN6r2cKi3D3WGRu7cSV6EAE1UQmeCdPEF-Ne_4Dzaaf4xsibEfCl-qFEDwr_vBC0lGoVONY_uqHXd8u8Rwefc5JNFEqjeWoq-BTCjLZ_0eAWdiNa8iVRJt1kS1WGpfOZlX479te3JSgAI3ygqgdK4wxzNVS_cBsxVIqG8qXCVew5hLPIFO0UYATwsg',
    },
    {
        name: 'Urban Core Graphic',
        color: 'Slate Grey',
        price: 54,
        originalPrice: null,
        badge: null,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5PWsSNfRiHItFdUMDvfl2v4wFBgMD0NQWZ8oxQw3-Vqg2TmAtbQT3_Uq4NJRr3qyZh4KgDjwOYvZAxE97L4Z8jLmYpXIOrxAuCJJ8Rihx7jv89mX_varP8wYmkNcQferIm6-nVGE5NOwDmjVngWd3lOBqAu3WO07L5E3E8om3yDc32VuVT_-I8igmME9XToPNUC-ysKv_C-ANjd1B4LOoXlGx2uZkfZ2mY5FZUf0lQAaBXowU6GHNVSBoSPYTXSKhltHu8Kvb3Cc',
        
    },
    {
        name: 'Earth Tones Basic',
        color: 'Olive Drab',
        price: 28,
        originalPrice: 40,
        badge: 'sale',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdoc_MkbhgHry-jnnX7_jR0ejp1qhx0J43ebNtRD0ujy5qRCBOM-yTcHyJtv96yzfvui7J7nABivoi4_Y--dXZdM11qG93BJL3FjjnDzZtCi4INSwPy-VGBdPYqNeF9EgeU_INgLTsf_Fy8-Cjv0WvylIn7rlIE1fXRWKgpBJiYbRp8eIGZaNErBBxqyRhwv-carz-0t_NDfbaKPHBC6yPNhMlXAOhqI2L-jWKhL6DRnpB_AzG5qUKIZ618AKs3NvGpdcR64lkBAY',
    }
];

const formatCurrency = (value) => `$${value.toFixed(2)}`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return entities[char] || char;
});

const sanitizeHttpUrl = (value, fallback = 'https://via.placeholder.com/120x150/f5f0e8/222?text=AURAC') => {
    try {
        const url = new URL(String(value));
        return /^https?:$/.test(url.protocol) ? url.toString() : fallback;
    } catch {
        return fallback;
    }
};

const renderProducts = () => {
    if (!productGrid) return;

    productGrid.innerHTML = products.map((product, index) => {
        const delayClass = `d${(index % 4) + 1}`;
        const safeName = escapeHtml(product.name);
        const safeColor = escapeHtml(product.color);
        const safeImage = sanitizeHttpUrl(product.image);
        const badgeHtml = product.badge === 'new'
            ? '<span class="product-badge badge-new">New</span>'
            : product.badge === 'sale'
                ? '<span class="product-badge badge-sale">Sale</span>'
                : '';
        const originalPriceHtml = product.originalPrice
            ? `<span class="price-original">${formatCurrency(product.originalPrice)}</span>`
            : '';
        const currentPriceClass = product.originalPrice ? 'price-current price-sale' : 'price-current';
        
        return `
            <div class="product-card reveal ${delayClass}">
                <div class="product-img-wrap">
                    <img src="${safeImage}" alt="${safeName}" />
                    ${badgeHtml}
                    <button class="quick-add add-to-cart" data-name="${safeName}" data-price="${formatCurrency(product.price)}">
                        <span class="material-symbols-outlined" style="font-size:16px">shopping_cart</span>
                        Quick Add
                    </button>
                </div>
                <div class="product-info">
                    <div class="product-name">${safeName}</div>
                    <div class="product-color">${safeColor}</div>
                    <div class="product-price">
                        <span class="${currentPriceClass}">${formatCurrency(product.price)}</span>
                        ${originalPriceHtml}
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

renderProducts();

// ── CART
const cartDrawer = document.getElementById('cart-drawer');
const cartBackdrop = document.getElementById('cart-backdrop');
const openCart = document.getElementById('open-cart');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartTitle = document.getElementById('cart-title');
const cartTotal = document.getElementById('cart-total');
const cartItemsEl = document.getElementById('cart-items');
const cartEmptyEl = document.getElementById('cart-empty');
const cartCheckout = document.getElementById('cart-checkout');
const toast = document.getElementById('toast');

const cartMap = new Map();

const openCartDrawer = () => {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
};

const closeCartDrawer = () => {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
    document.body.style.overflow = '';
};

openCart?.addEventListener('click', openCartDrawer);
closeCart?.addEventListener('click', closeCartDrawer);
cartBackdrop?.addEventListener('click', closeCartDrawer);

const parsePrice = (value) => {
    const parsed = Number(String(value).replace(/[^\d.-]/g, ''));
    if (!Number.isFinite(parsed) || parsed < 0) return 0;
    return Math.min(parsed, 100000);
};

const getTotals = () => {
    let items = 0;
    let total = 0;
    cartMap.forEach((entry) => {
        items += entry.qty;
        total += entry.qty * entry.price;
    });
    return { items, total };
};

const renderCart = () => {
    const entries = Array.from(cartMap.values());
    if (!entries.length) {
        cartItemsEl.innerHTML = '';
        cartEmptyEl.style.display = 'block';
        cartCheckout.disabled = true;
    } else {
        cartItemsEl.innerHTML = entries.map((entry) => {
            const safeName = escapeHtml(entry.name);
            const safeVariant = escapeHtml(entry.variant);
            const safeImage = sanitizeHttpUrl(entry.image);
            return `
                    <article class="cart-item" data-name="${safeName}">
                        <img src="${safeImage}" alt="${safeName}" />
                        <div class="cart-item-info">
                            <div class="cart-item-name">${safeName}</div>
                            <div class="cart-item-var">${safeVariant}</div>
                            <div class="cart-item-meta">
                                <div class="cart-item-price">$${entry.price.toFixed(2)}</div>
                                <div class="cart-qty" aria-label="Quantity controls">
                                    <button type="button" class="qty-btn" data-action="decrease" data-name="${safeName}" aria-label="Decrease quantity">−</button>
                                    <span>${entry.qty}</span>
                                    <button type="button" class="qty-btn" data-action="increase" data-name="${safeName}" aria-label="Increase quantity">+</button>
                                </div>
                            </div>
                            <button type="button" class="cart-remove" data-action="remove" data-name="${safeName}">Remove</button>
                        </div>
                    </article>
                `;
        }).join('');
        cartEmptyEl.style.display = 'none';
        cartCheckout.disabled = false;
    }

    const { items, total } = getTotals();
    cartCount.textContent = String(items);
    cartTitle.textContent = `Your Bag (${items})`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
};

const flashToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1600);
};

const buildWhatsAppCheckoutUrl = () => {
    const rawNumber = cartCheckout?.dataset.whatsapp || '';
    const whatsappNumber = rawNumber.replace(/\D/g, '');
    if (!/^\d{6,15}$/.test(whatsappNumber)) return null;

    const entries = Array.from(cartMap.values());
    const { total } = getTotals();

    const itemsText = entries
        .map((entry, idx) => `${idx + 1}. ${entry.name} x${entry.qty} - $${(entry.price * entry.qty).toFixed(2)}`)
        .join('\n');

    const message = [
        'Hi AURAC, I would like to place this order:',
        '',
        itemsText,
        '',
        `Total: $${total.toFixed(2)}`,
        'Please confirm availability and delivery details.'
    ].join('\n');

    const checkoutUrl = new URL(`https://wa.me/${whatsappNumber}`);
    checkoutUrl.searchParams.set('text', message);
    return checkoutUrl.toString();
};

const upsertCartItem = ({ name, price, image }) => {
    const key = name;
    if (cartMap.has(key)) {
        cartMap.get(key).qty += 1;
    } else {
        cartMap.set(key, {
            name,
            price,
            image,
            qty: 1,
            variant: 'Selected size / default color'
        });
    }
    renderCart();
};

document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', () => {
        const name = String(btn.dataset.name || 'Selected item').slice(0, 120);
        const price = parsePrice(btn.dataset.price || '$0.00');
        const cardImage = btn.closest('.product-card, .editorial')?.querySelector('img')?.src;
        const image = sanitizeHttpUrl(cardImage);

        upsertCartItem({ name, price, image });

        openCartDrawer();
        flashToast(`${name} added to bag`);
    });
});

cartItemsEl?.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action]');
    if (!trigger) return;

    const action = trigger.dataset.action;
    const name = trigger.dataset.name;
    if (!name || !cartMap.has(name)) return;

    const item = cartMap.get(name);

    if (action === 'increase') {
        item.qty += 1;
        flashToast(`Increased ${name}`);
    }

    if (action === 'decrease') {
        item.qty -= 1;
        if (item.qty <= 0) {
            cartMap.delete(name);
            flashToast(`${name} removed from bag`);
        }
    }

    if (action === 'remove') {
        cartMap.delete(name);
        flashToast(`${name} removed from bag`);
    }

    renderCart();
});

cartCheckout?.addEventListener('click', () => {
    if (!cartMap.size) return;

    const url = buildWhatsAppCheckoutUrl();
    if (!url) {
        flashToast('Set WhatsApp number first');
        return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
    flashToast('Opening WhatsApp checkout');
});

renderCart();


// ── SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });
revealEls.forEach(el => io.observe(el));

// ── TESTIMONIALS
const testimonials = [
    { quote: '"The quality and fit of their oversized tees is unmatched. It\'s the perfect balance of premium weight and breathable comfort for the city."', author: 'Marcus V. — Verified Customer' },
    { quote: '"Aurac\'s graphic tees are unlike anything in the market. The weight, the fit — it just feels premium."', author: 'Priya S. — Verified Customer' },
    { quote: '"Ordered 3, kept all 3. Built for the streets, comfortable enough for every day."', author: 'Jay K. — Verified Customer' }
];
let tIdx = 0;
const tQuote = document.getElementById('t-quote');
const tAuthor = document.getElementById('t-author');
const dots = document.querySelectorAll('.tdot');

const setTestimonial = (i) => {
    tQuote.style.opacity = '0';
    tAuthor.style.opacity = '0';
    setTimeout(() => {
        tQuote.textContent = testimonials[i].quote;
        tAuthor.textContent = testimonials[i].author;
        tQuote.style.opacity = '1';
        tAuthor.style.opacity = '1';
    }, 300);
    dots.forEach((d, j) => d.classList.toggle('active', j === i));
    tIdx = i;
};
dots.forEach(d => d.addEventListener('click', () => setTestimonial(+d.dataset.i)));
setInterval(() => setTestimonial((tIdx + 1) % testimonials.length), 4500);

// ── FIT HELPER
const fitHeight = document.getElementById('fit-height');
const fitWeight = document.getElementById('fit-weight');
const fitBuild = document.getElementById('fit-build');
const fitStyle = document.getElementById('fit-style');
const fitForm = document.getElementById('fit-form');
const fitSizeMain = document.getElementById('fit-size-main');
const fitSizeAlt = document.getElementById('fit-size-alt');
const fitConfidence = document.getElementById('fit-confidence');
const fitNote = document.getElementById('fit-note');

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const sizeLabels = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const toConfidenceLabel = (score) => {
    if (score >= 88) return 'High';
    if (score >= 72) return 'Medium';
    return 'Low';
};

const getFitRecommendation = ({ height, weight, build, style }) => {
    const safeHeight = clamp(height, 140, 220);
    const safeWeight = clamp(weight, 35, 180);

    // Base index starts at M and shifts by physical metrics and fit preferences.
    let index = 2;

    if (safeHeight < 162) index -= 1;
    else if (safeHeight >= 178 && safeHeight < 186) index += 1;
    else if (safeHeight >= 186) index += 2;

    if (safeWeight < 55) index -= 1;
    else if (safeWeight >= 78 && safeWeight < 92) index += 1;
    else if (safeWeight >= 92) index += 2;

    if (build === 'slim') index -= 0.5;
    if (build === 'broad') index += 0.75;

    if (style === 'fitted') index -= 0.75;
    if (style === 'relaxed') index += 0.75;

    const bmi = safeWeight / ((safeHeight / 100) ** 2);
    if (bmi < 19 && style !== 'relaxed') index -= 0.5;
    if (bmi > 27) index += 0.5;

    const roundedIndex = clamp(Math.round(index), 0, sizeLabels.length - 1);
    const recommendation = sizeLabels[roundedIndex];

    const lowerAlt = sizeLabels[clamp(roundedIndex - 1, 0, sizeLabels.length - 1)];
    const upperAlt = sizeLabels[clamp(roundedIndex + 1, 0, sizeLabels.length - 1)];

    let confidenceScore = 95;
    if (safeHeight < 150 || safeHeight > 205) confidenceScore -= 14;
    if (safeWeight < 42 || safeWeight > 145) confidenceScore -= 14;
    confidenceScore = clamp(confidenceScore, 58, 98);

    const noteParts = [];
    noteParts.push(style === 'fitted' ? 'For a cleaner silhouette' : style === 'relaxed' ? 'For an oversized silhouette' : 'For a regular silhouette');
    noteParts.push(`and a ${build} build profile`);

    return {
        recommendation,
        alternatives: `${lowerAlt} / ${upperAlt}`,
        confidence: toConfidenceLabel(confidenceScore),
        note: `${noteParts.join(' ')}, ${recommendation} is the best starting point.`
    };
};

const updateFitResult = () => {
    if (!fitSizeMain || !fitSizeAlt || !fitConfidence || !fitNote) return;

    const height = Number(fitHeight?.value);
    const weight = Number(fitWeight?.value);
    const build = fitBuild?.value || 'regular';
    const style = fitStyle?.value || 'regular';

    if (!Number.isFinite(height) || !Number.isFinite(weight)) {
        fitNote.textContent = 'Enter valid height and weight to calculate your size.';
        fitConfidence.textContent = 'Low';
        return;
    }

    const result = getFitRecommendation({ height, weight, build, style });
    fitSizeMain.textContent = result.recommendation;
    fitSizeAlt.textContent = result.alternatives;
    fitConfidence.textContent = result.confidence;
    fitNote.textContent = result.note;
};

fitForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    updateFitResult();
});

['change', 'input'].forEach((eventName) => {
    [fitHeight, fitWeight, fitBuild, fitStyle].forEach((field) => {
        field?.addEventListener(eventName, updateFitResult);
    });
});

updateFitResult();

const newsletterForm = document.getElementById('newsletter-form');
newsletterForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = String(emailInput?.value || '').trim();
    const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    flashToast(looksValid ? 'You are subscribed' : 'Enter a valid email');
    if (looksValid && emailInput) {
        emailInput.value = '';
    }
});

// ── FAQ
document.querySelectorAll('.faq-q').forEach((q) => {
    q.addEventListener('click', () => {
        const item = q.closest('.faq-item');
        const answer = item.querySelector('.faq-a');
        const icon = q.querySelector('.material-symbols-outlined');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item').forEach((other) => {
            other.classList.remove('open');
            other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            other.querySelector('.material-symbols-outlined').textContent = 'add';
        });

        if (!isOpen) {
            item.classList.add('open');
            q.setAttribute('aria-expanded', 'true');
            icon.textContent = 'remove';
            answer.style.maxHeight = `${answer.scrollHeight}px`;
        } else {
            answer.style.maxHeight = null;
        }
    });
});

window.addEventListener('resize', () => {
    document.querySelectorAll('.faq-item.open .faq-a').forEach((openA) => {
        openA.style.maxHeight = `${openA.scrollHeight}px`;
    });
});