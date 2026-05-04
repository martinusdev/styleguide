/*
 * Integration tests for product and media components:
 * `carousel`, `product-card`, `product-cover`.
 */

import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.MARTINUS_STYLEGUIDE_APP_DIR) {
  process.env.MARTINUS_STYLEGUIDE_APP_DIR = resolve(__dirname, '..', '..', 'app');
}

let StyleguideServer;
let server;

before(async () => {
  ({ StyleguideServer } = await import('../src/index.js'));
  server = new StyleguideServer();
});

async function render(args) {
  const res = await server.getComponent(args);
  return JSON.parse(res.content[0].text);
}

// ---------------------------------------------------------------------------
// carousel

test('carousel renders basic swiper structure', async () => {
  const slides = '<div class="swiper-slide"><img src="cover.jpg" alt="book"></div>';
  const { html } = await render({ name: 'carousel', slides });
  assert.ok(html.includes('class="carousel"'));
  assert.ok(html.includes('class="swiper"'));
  assert.ok(html.includes('class="swiper-wrapper"'));
  assert.ok(html.includes(slides));
});

test('carousel with fade_outside applies .carousel--fade-outside', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', fade_outside: true });
  assert.ok(html.includes('carousel carousel--fade-outside'));
});

test('carousel with fade_inside applies .carousel--fade-inside', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', fade_inside: true });
  assert.ok(html.includes('carousel--fade-inside'));
});

test('carousel combines fade_inactive + disable_inactive (banner pattern)', async () => {
  const { html } = await render({
    name: 'carousel',
    slides: '<div class="swiper-slide"></div>',
    fade_inactive: true,
    disable_inactive: true,
  });
  assert.ok(html.includes('carousel--fade-inactive'));
  assert.ok(html.includes('carousel--disable-inactive'));
});

test('carousel with fan applies .carousel--fan', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', fan: true });
  assert.ok(html.includes('carousel--fan'));
});

test('carousel with shelf and lazy applies their modifiers', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', shelf: true, lazy: true });
  assert.ok(html.includes('carousel--shelf'));
  assert.ok(html.includes('carousel--lazy'));
});

test('carousel with white_surface + fade_outside adds --fade-outside-white', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', fade_outside: true, white_surface: true });
  assert.ok(html.includes('carousel--fade-outside'));
  assert.ok(html.includes('carousel--fade-outside-white'));
});

test('carousel with white_surface + fade_inside adds --fade-inside-white', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', fade_inside: true, white_surface: true });
  assert.ok(html.includes('carousel--fade-inside'));
  assert.ok(html.includes('carousel--fade-inside-white'));
});

test('carousel with white_surface alone emits no -white modifier (no fade variant)', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', white_surface: true });
  assert.ok(!html.includes('-white'));
});

test('carousel without white_surface omits -white modifier', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', fade_outside: true });
  assert.ok(!html.includes('fade-outside-white'));
});

test('carousel with fade_color emits --ms-fade-color inline style', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', fade_outside: true, fade_color: '#9967a7' });
  assert.ok(html.includes('style="--ms-fade-color: #9967a7"'));
});

test('carousel without fade_color omits inline style', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', fade_outside: true });
  assert.ok(!html.includes('--ms-fade-color'));
});

test('carousel with carousel_cards adds .carousel-cards root modifier', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', carousel_cards: true });
  assert.ok(html.includes('carousel-cards'));
});

test('carousel with swiper_options emits data-swiper-options attribute', async () => {
  const opts = '{"slidesPerView":4,"spaceBetween":16}';
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', swiper_options: opts });
  assert.ok(html.includes(`data-swiper-options='${opts}'`));
});

test('carousel without swiper_options omits data-swiper-options', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>' });
  assert.ok(!html.includes('data-swiper-options'));
});

test('carousel with show_buttons renders prev and next buttons inside .swiper', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', show_buttons: true });
  assert.ok(html.includes('carousel__btn--prev'));
  assert.ok(html.includes('carousel__btn--next'));
  // Production button styling — matches showcase / homepage / mixins.
  assert.ok(html.includes('btn btn--carousel btn--large btn--equal'));
  assert.ok(html.includes('fa-arrow-left'));
  assert.ok(html.includes('fa-arrow-right'));
  // Buttons MUST be inside the `.swiper` element so Carousel.js can bind them
  // via swiper.querySelector('.carousel__btn--prev/next'). The closing
  // `</div></div>` after the buttons closes `.swiper` then `.carousel`.
  assert.ok(/<button [^>]*carousel__btn--next[^>]*>.*?<\/button><\/div><\/div>$/s.test(html));
});

test('carousel without show_buttons omits nav buttons', async () => {
  const { html } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>' });
  assert.ok(!html.includes('carousel__btn'));
});

test('carousel with show_buttons adds font-awesome to requires', async () => {
  const { requires } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>', show_buttons: true });
  assert.ok(requires.includes('font-awesome'));
});

test('carousel without show_buttons has empty requires', async () => {
  const { requires } = await render({ name: 'carousel', slides: '<div class="swiper-slide"></div>' });
  assert.deepEqual(requires, []);
});

test('carousel rejects unknown parameter', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'carousel', slides: '<div>', variant: 'fade-outside' }),
    /Unknown parameter\(s\) for component "carousel": variant/
  );
});

test('carousel requires slides', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'carousel' }),
    /Missing required parameter "slides"/
  );
});

// ---------------------------------------------------------------------------
// product-card

test('product-card renders article with product--responsive', async () => {
  const { html } = await render({ name: 'product-card', title: 'Harry Potter' });
  assert.ok(html.includes('class="product product--responsive"'));
  assert.ok(html.includes('Harry Potter'));
});

test('product-card with href renders title as anchor link', async () => {
  const { html } = await render({ name: 'product-card', title: 'Duna', href: '/duna' });
  assert.ok(html.includes('<a class="product__title link link--black" href="/duna"'));
  assert.ok(html.includes('Duna'));
});

test('product-card without href renders title as div', async () => {
  const { html } = await render({ name: 'product-card', title: 'Duna' });
  assert.ok(html.includes('<div class="product__title">Duna</div>'));
  assert.ok(!html.includes('<a '));
});

test('product-card with cover_url sets img src', async () => {
  const { html } = await render({ name: 'product-card', title: 'X', cover_url: 'https://example.com/cover.jpg' });
  assert.ok(html.includes('src="https://example.com/cover.jpg"'));
});

test('product-card with author renders author text', async () => {
  const { html } = await render({ name: 'product-card', title: 'X', author: 'J.K. Rowling' });
  assert.ok(html.includes('J.K. Rowling'));
  assert.ok(html.includes('text-color-grey'));
});

test('product-card without author omits author element', async () => {
  const { html } = await render({ name: 'product-card', title: 'X' });
  assert.ok(!html.includes('text-color-grey'));
});

test('product-card with price renders transparent badge', async () => {
  const { html } = await render({ name: 'product-card', title: 'X', price: '9,99 €' });
  assert.ok(html.includes('badge--transparent'));
  assert.ok(html.includes('9,99 €'));
});

test('product-card without price omits price badge', async () => {
  const { html } = await render({ name: 'product-card', title: 'X' });
  assert.ok(!html.includes('badge--transparent'));
});

test('product-card with discount renders primary badge', async () => {
  const { html } = await render({ name: 'product-card', title: 'X', discount: '-20%' });
  assert.ok(html.includes('badge--primary'));
  assert.ok(html.includes('-20%'));
});

test('product-card with rating renders star icon and rating value', async () => {
  const { html } = await render({ name: 'product-card', title: 'X', rating: '4.5' });
  assert.ok(html.includes('thumbnail__info'));
  assert.ok(html.includes('fa-star'));
  assert.ok(html.includes('4.5'));
});

test('product-card with rating adds font-awesome to requires', async () => {
  const { requires } = await render({ name: 'product-card', title: 'X', rating: '4.5' });
  assert.ok(requires.includes('font-awesome'));
});

test('product-card without rating has empty requires', async () => {
  const { requires } = await render({ name: 'product-card', title: 'X' });
  assert.deepEqual(requires, []);
});

test('product-card title is HTML-escaped', async () => {
  const { html } = await render({ name: 'product-card', title: '<script>alert(1)</script>' });
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(!html.includes('<script>'));
});

test('product-card requires title', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'product-card' }),
    /Missing required parameter "title"/
  );
});

// ---------------------------------------------------------------------------
// product-cover

test('product-cover renders anchor with img', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'https://example.com/cover.jpg' });
  assert.ok(html.startsWith('<a class="product-cover"'));
  assert.ok(html.includes('src="https://example.com/cover.jpg"'));
  assert.ok(html.includes('loading="lazy"'));
});

test('product-cover with type applies .product-cover--{type}', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg', type: 'book' });
  assert.ok(html.includes('product-cover--book'));
});

test('product-cover with size applies .product-cover--{size}', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg', size: 'large' });
  assert.ok(html.includes('product-cover--large'));
});

test('product-cover with href sets anchor href', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg', href: '/detail' });
  assert.ok(html.includes('href="/detail"'));
});

test('product-cover without href omits href attribute', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg' });
  assert.ok(!html.includes('href='));
});

test('product-cover with badge_text renders .product-cover__badge', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg', badge_text: 'E-kniha' });
  assert.ok(html.includes('product-cover__badge--medium'));
  assert.ok(html.includes('E-kniha'));
});

test('product-cover without badge_text omits badge element', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg' });
  assert.ok(!html.includes('product-cover__badge'));
});

test('product-cover in collection mode renders collection_images slot', async () => {
  const imgs = '<img src="a.jpg" class="d-block"><img src="b.jpg" class="d-block">';
  const { html } = await render({ name: 'product-cover', cover_url: '', type: 'collection', collection: true, collection_images: imgs });
  assert.ok(html.includes(imgs));
  assert.ok(!html.includes('<img src=""'));
});

test('product-cover in collection mode omits single img when collection=true', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg', collection: true, collection_images: '<img src="a.jpg">' });
  assert.ok(!html.includes('src="x.jpg"'));
});

test('product-cover non-collection mode omits collection_images', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg', collection_images: '<img src="extra.jpg">' });
  assert.ok(!html.includes('extra.jpg'));
  assert.ok(html.includes('src="x.jpg"'));
});

test('product-cover has empty requires', async () => {
  const { requires } = await render({ name: 'product-cover', cover_url: 'x.jpg' });
  assert.deepEqual(requires, []);
});

test('product-cover rejects invalid type', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'product-cover', cover_url: 'x.jpg', type: 'video' }),
    /Invalid value "video" for "type"/
  );
});

test('product-cover rejects invalid size', async () => {
  await assert.rejects(
    () => server.getComponent({ name: 'product-cover', cover_url: 'x.jpg', size: 'giant' }),
    /Invalid value "giant" for "size"/
  );
});

test('product-cover cover_alt sets img alt', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg', cover_alt: 'Harry Potter' });
  assert.ok(html.includes('alt="Harry Potter"'));
});

test('product-cover combines type and size modifiers', async () => {
  const { html } = await render({ name: 'product-cover', cover_url: 'x.jpg', type: 'ebook', size: 'medium' });
  assert.ok(html.includes('product-cover--ebook'));
  assert.ok(html.includes('product-cover--medium'));
});
