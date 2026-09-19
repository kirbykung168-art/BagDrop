import { company, product, site, thb } from '../src/content/facts.mjs';
console.log('facts.mjs OK');
console.log(' reg :', company.regNo);
console.log(' name:', company.legalNameEn, '/', company.legalNameTh);
console.log(' price:', product.price.symbol + thb(product.price.hourly), '/hr, cap', product.price.symbol + thb(product.price.dailyCap));
console.log(' langs:', site.langs.join(', '), '| x-default:', site.defaultLang);
