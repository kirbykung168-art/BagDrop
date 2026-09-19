import {
  COPY, company, product, paymentMarks, esc, eyebrow, row, tariffCell,
  moneyText, hrefFor, urlFor, thb,
} from './render.mjs';

const statusLine = (copy) => `<p class="status">${esc(copy.status)}</p>`;

const lineAndCall = (copy) => `<div class="btn-row">
        <a class="btn" href="${company.lineUrl}" rel="noopener">${esc(copy.ui.lineCta)}</a>
        <a class="btn btn--ghost" href="${company.tel.href}">${esc(copy.ui.callCta)}</a>
      </div>`;

/* ---------------------------------------------------------------- HOME */
export function home(lang) {
  const c = COPY[lang], p = c.home;
  const price = product.price;

  const steps = c.how.steps
    .map((s) => `<li>
          <div class="steps__n" aria-hidden="true">${esc(s.n)}</div>
          <div class="steps__b"><h3 class="h3">${esc(s.h)}</h3></div>
        </li>`)
    .join('\n        ');

  return `
<section class="section section--open section--lead">
  <div class="wrap">
    <h1 class="h1 prose">${esc(p.h1)}</h1>
    <p class="lede">${esc(p.lede)}</p>

    <div class="tariff">
      <div class="tariff__grid">
        ${tariffCell(lang, c.pricing.hourLabel, price.hourly, '')}
        ${tariffCell(lang, c.pricing.capLabel, price.dailyCap, '')}
      </div>
    </div>
    <p class="tariff__note small muted">${esc(p.priceCaption)}</p>

    ${statusLine(c)}
    ${lineAndCall(c)}
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.operator)}
    <h2 class="h2 prose" lang="en">${esc(company.legalNameEn)}</h2>
    <p class="body">${esc(p.companyLede)}</p>

    <dl class="dl">
      ${row(c.company.rows.legalNameEn, `<span lang="en">${esc(company.legalNameEn)}</span>`)}
      ${row(c.company.rows.legalNameTh, `<span lang="th">${esc(company.legalNameTh)}</span>`)}
      ${row(c.company.rows.regNo, esc(company.regNo), c.company.rows.regNoNote, true)}
      ${row(c.company.rows.director, `${esc(company.director.name)} &mdash; ${esc(company.director.role[lang] || company.director.role.en)}`)}
      ${row(c.footer.contact, `<a href="${company.tel.href}">${esc(company.tel.display[lang] || company.tel.display.en)}</a>`, '', true)}
    </dl>

    <div class="btn-row">
      <a class="cta" href="${hrefFor(lang, 'company')}">${esc(p.companyMore)}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.steps)}
    <h2 class="h2 prose">${esc(p.stepsTitle)}</h2>
    <ol class="steps">
        ${steps}
    </ol>
    <div class="btn-row">
      <a class="cta" href="${hrefFor(lang, 'how')}">${esc(p.stepsMore)}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.site)}
    <h2 class="h2 prose">${esc(p.venueTitle)}</h2>
    <p class="body">${esc(p.specLede)}</p>
    <p class="body">${esc(p.venueLede)}</p>

    <dl class="dl">
      ${row(c.venues.specRows.footprint, esc(product.spec.footprint[lang] || product.spec.footprint.en), '', true)}
      ${row(c.venues.specRows.power, esc(product.spec.power[lang] || product.spec.power.en))}
      ${row(c.venues.specRows.faultResponse, esc(product.spec.faultResponse[lang] || product.spec.faultResponse.en))}
    </dl>

    <div class="btn-row">
      <a class="cta" href="${hrefFor(lang, 'venues')}">${esc(p.venueCta)}</a>
    </div>
  </div>
</section>`;
}

/* ----------------------------------------------------------- HOW IT WORKS */
export function how(lang) {
  const c = COPY[lang], p = c.how;

  const steps = p.steps
    .map((s) => `<li>
        <div class="steps__n" aria-hidden="true">${esc(s.n)}</div>
        <div class="steps__b"><h2 class="h3">${esc(s.h)}</h2><p>${esc(s.p)}</p></div>
      </li>`)
    .join('\n      ');

  const trouble = p.trouble
    .map((t) => `<div class="item"><h3 class="h3">${esc(t.h)}</h3><p>${esc(t.p)}</p></div>`)
    .join('\n      ');

  return `
<section class="section section--open section--lead">
  <div class="wrap">
    <h1 class="h1 prose">${esc(p.h1)}</h1>
    <p class="lede">${esc(p.lede)}</p>
    ${statusLine(c)}
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.steps)}
    <h2 class="h2 prose">${esc(c.home.stepsTitle)}</h2>
    <ol class="steps">
      ${steps}
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.support)}
    <h2 class="h2 prose">${esc(p.troubleTitle)}</h2>
    <div class="grid grid--2">
      ${trouble}
    </div>
    <p class="body">${esc(p.prohibitedNote)}</p>
    <div class="btn-row">
      <a class="cta" href="${hrefFor(lang, 'legal')}#prohibited">${esc(p.prohibitedCta)}</a>
      <a class="cta" href="${company.lineUrl}" rel="noopener">${esc(c.ui.lineCta)}</a>
    </div>
  </div>
</section>`;
}

/* ---------------------------------------------------------------- PRICING */
export function pricing(lang) {
  const c = COPY[lang], p = c.pricing;
  const price = product.price;

  const examples = product.examples
    .map((e) => {
      const raw = e.hours * price.hourly;
      const calc = e.total < raw
        ? `${thb(e.hours)} &times; ${thb(price.hourly)} = ${thb(raw)} &rarr; ${esc(p.capLabel)}`
        : `${thb(e.hours)} &times; ${thb(price.hourly)}`;
      return `<tr>
          <th scope="row" class="num">${esc(p.hoursWord(e.hours))}</th>
          <td class="num">${calc}</td>
          <td class="num">${esc(moneyText(lang, e.total))}</td>
        </tr>`;
    })
    .join('\n        ');

  const marks = paymentMarks.map((m) => `<li>${esc(m)}</li>`).join('');

  return `
<section class="section section--open section--lead">
  <div class="wrap">
    <h1 class="h1 prose">${esc(p.h1)}</h1>
    <p class="lede">${esc(p.lede)}</p>

    <div class="tariff">
      <div class="tariff__grid">
        ${tariffCell(lang, p.hourLabel, price.hourly, '')}
        ${tariffCell(lang, p.capLabel, price.dailyCap, '')}
      </div>
    </div>
    <p class="tariff__note small muted">${esc(p.capNote)}</p>
    ${statusLine(c)}
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.examples)}
    <h2 class="h2 prose">${esc(p.examplesTitle)}</h2>
    <div class="table-scroll">
      <table class="table--pairs">
        <thead>
          <tr>
            <th scope="col">${esc(p.examplesHead.duration)}</th>
            <th scope="col">${esc(p.examplesHead.calc)}</th>
            <th scope="col">${esc(p.examplesHead.total)}</th>
          </tr>
        </thead>
        <tbody>
        ${examples}
        </tbody>
      </table>
    </div>
    <p class="body small muted">${esc(p.examplesNote)}</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.payment)}
    <h2 class="h2 prose">${esc(p.payTitle)}</h2>
    <p class="body">${esc(p.payLede)}</p>
    <ul class="marks">${marks}</ul>
    <p class="body small muted">${esc(p.payNote)}</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.refunds)}
    <h2 class="h2 prose">${esc(p.refundTitle)}</h2>
    <p class="body">${esc(p.refundLede)}</p>
    <div class="btn-row">
      <a class="cta" href="${hrefFor(lang, 'legal')}#refunds">${esc(p.refundCta)}</a>
    </div>
  </div>
</section>`;
}

/* --------------------------------------------------------- VENUE PARTNERS */
export function venues(lang) {
  const c = COPY[lang], p = c.venues, s = product.spec, r = p.specRows;
  const pick = (o) => esc(o[lang] || o.en);

  const props = p.proposition
    .map((i) => `<div class="item"><h3 class="h3">${esc(i.h)}</h3><p>${esc(i.p)}</p></div>`)
    .join('\n      ');

  const specRow = (k, v, num = false) =>
    `<tr><th scope="row">${esc(k)}</th><td${num ? ' class="num"' : ''}>${v}</td></tr>`;

  return `
<section class="section section--open section--lead">
  <div class="wrap">
    <h1 class="h1 prose">${esc(p.h1)}</h1>
    <p class="lede">${esc(p.lede)}</p>
    ${statusLine(c)}
    ${lineAndCall(c)}
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.offer)}
    <h2 class="h2 prose">${esc(p.propositionTitle)}</h2>
    <div class="grid grid--2">
      ${props}
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.benefit)}
    <h2 class="h2 prose">${esc(p.benefitTitle)}</h2>
    <p class="lede">${esc(p.benefitBody)}</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.spec)}
    <h2 class="h2 prose">${esc(p.specTitle)}</h2>
    <div class="table-scroll">
      <table class="table--stack">
        <thead>
          <tr><th scope="col">${esc(p.specHead.item)}</th><th scope="col">${esc(p.specHead.value)}</th></tr>
        </thead>
        <tbody>
          ${specRow(r.lockers, esc(r.lockersValue), true)}
          ${specRow(r.footprint, pick(s.footprint), true)}
          ${specRow(r.power, pick(s.power), true)}
          ${specRow(r.connectivity, pick(s.connectivity), true)}
          ${specRow(r.install, pick(s.install))}
          ${specRow(r.monitoring, pick(s.monitoring), true)}
          ${specRow(r.faultResponse, pick(s.faultResponse), true)}
          ${specRow(r.payment, esc(r.paymentValue))}
          ${specRow(r.interface, esc(r.interfaceValue))}
          ${specRow(r.access, esc(r.accessValue))}
          ${specRow(r.tariff, `${esc(moneyText(lang, product.price.hourly))} / ${esc(c.pricing.perUnit.hour)} &mdash; ${esc(moneyText(lang, product.price.dailyCap))} / ${esc(c.pricing.perUnit.day)}`, true)}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.documents)}
    <h2 class="h2 prose">${esc(p.profileTitle)}</h2>
    <p class="body">${esc(p.profileBody)}</p>
    <div class="btn-row">
      <a class="btn" href="mailto:${esc(company.email)}?subject=${encodeURIComponent('BagDrop company profile')}">${esc(p.profileCta)}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.contact)}
    <h2 class="h2 prose">${esc(p.contactTitle)}</h2>
    <p class="body">${esc(p.contactBody)}</p>
    <dl class="dl">
      ${row(c.company.rows.director, `${esc(company.director.name)} &mdash; ${esc(company.director.role[lang] || company.director.role.en)}`)}
      ${row(c.ui.callCta, `<a href="${company.tel.href}">${esc(company.tel.display[lang] || company.tel.display.en)}</a>`, '', true)}
      ${row(c.ui.emailCta, `<a href="mailto:${esc(company.email)}">${esc(company.email)}</a>`)}
      ${row(c.ui.lineShort, `<a href="${company.lineUrl}" rel="noopener">${esc(company.lineOaId)}</a>`)}
    </dl>
  </div>
</section>`;
}

/* --------------------------------------------------------------- COMPANY */
export function companyPage(lang) {
  const c = COPY[lang], p = c.company, r = p.rows;
  const addr = (company.addressLines[lang] || company.addressLines.en).map(esc).join('<br>');

  return `
<section class="section section--open section--lead">
  <div class="wrap">
    <h1 class="h1 prose">${esc(p.h1)}</h1>
    <p class="lede">${esc(p.lede)}</p>
    ${statusLine(c)}
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.registry)}
    <h2 class="h2 prose">${esc(p.tableTitle)}</h2>
    <dl class="dl">
      ${row(r.legalNameEn, `<span lang="en">${esc(company.legalNameEn)}</span>`)}
      ${row(r.legalNameTh, `<span lang="th">${esc(company.legalNameTh)}</span>`)}
      ${row(r.tradingName, 'BagDrop')}
      ${row(r.regNo, esc(company.regNo), r.regNoNote, true)}
      ${row(r.registered, esc(company.registeredDate[lang] || company.registeredDate.en), '', true)}
      ${row(r.capital, esc(company.registeredCapital[lang] || company.registeredCapital.en), '', true)}
      ${row(r.office, `<span lang="${lang === 'th' ? 'th' : 'en'}">${addr}</span>`)}
      ${row(r.director, `${esc(company.director.name)} &mdash; ${esc(company.director.role[lang] || company.director.role.en)}`)}
      ${company.vatPending ? row(r.vat, esc(r.vatValue)) : ''}
    </dl>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(c.labels.verify)}
    <h2 class="h2 prose">${esc(p.verifyTitle)}</h2>
    <p class="body">${esc(company.dbdRecordLive ? p.verifyBodyLive : p.verifyBodyPending)}</p>
    <div class="btn-row">
      <a class="cta" href="${company.dbdUrl}" rel="noopener">${esc(p.verifyCta)}</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    ${eyebrow(p.contactTitle)}
    <h2 class="h2 prose">${esc(p.contactTitle)}</h2>
    <p class="body">${esc(p.contactBody)}</p>
    <dl class="dl">
      ${row(r.director, `${esc(company.director.name)} &mdash; ${esc(company.director.role[lang] || company.director.role.en)}`)}
      ${row(c.ui.callCta, `<a href="${company.tel.href}">${esc(company.tel.display[lang] || company.tel.display.en)}</a>`, '', true)}
      ${row(c.ui.emailCta, `<a href="mailto:${esc(company.email)}">${esc(company.email)}</a>`)}
      ${row(c.ui.lineShort, `<a href="${company.lineUrl}" rel="noopener">${esc(company.lineOaId)}</a>`)}
    </dl>
  </div>
</section>`;
}

/* ----------------------------------------------------------------- LEGAL */
export function legal(lang) {
  const c = COPY[lang], p = c.legal;

  const toc = p.sections.map((s) => `<li><a href="#${s.id}">${esc(s.h)}</a></li>`).join('\n      ');

  const sections = p.sections
    .map((s) => {
      const paras = (s.paras || []).map((t) => `<p>${esc(t)}</p>`).join('\n      ');
      const list = s.list ? `<ul class="list">${s.list.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : '';
      const after = s.after ? `<p>${esc(s.after)}</p>` : '';
      const subs = (s.subs || [])
        .map((x) => `<div class="sub"><h3 class="h3">${esc(x.h)}</h3><p>${esc(x.p)}</p></div>`)
        .join('\n      ');
      return `<section class="legal-sec" id="${s.id}">
      <h2 class="h2">${esc(s.h)}</h2>
      ${paras}
      ${list}
      ${after}
      ${subs}
    </section>`;
    })
    .join('\n    ');

  return `
<section class="section section--open section--lead">
  <div class="wrap">
    <h1 class="h1 prose">${esc(p.h1)}</h1>
    <p class="lede">${esc(p.lede)}</p>
    <div class="notice"><p class="small">${esc(p.reviewNotice)}</p></div>

    <nav aria-label="${esc(p.toc)}">
      <h2 class="foot__h" style="margin-top:var(--s-7)">${esc(p.toc)}</h2>
      <ul class="toc">
      ${toc}
      </ul>
    </nav>
  </div>
</section>

<div class="wrap">
  <div class="prose">
    ${sections}
  </div>
</div>`;
}

/* ------------------------------------------------------------------- 404 */
export function notFound(lang) {
  const c = COPY[lang], p = c.notFound;
  const links = ['home', 'how', 'pricing', 'venues', 'company', 'legal']
    .map((k) => `<li><a href="${hrefFor(lang, k)}">${esc(c.nav[k])}</a></li>`)
    .join('\n        ');

  return `
<section class="section section--open section--lead">
  <div class="wrap">
    <h1 class="h1 prose">${esc(p.h1)}</h1>
    <p class="lede">${esc(p.lede)}</p>
    <h2 class="foot__h" style="margin-top:var(--s-7)">${esc(p.helpTitle)}</h2>
    <ul class="toc">
        ${links}
    </ul>
  </div>
</section>`;
}

export const RENDERERS = { home, how, pricing, venues, company: companyPage, legal, notFound };
