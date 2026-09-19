/**
 * images.mjs — which handoff illustration fills which slot.
 *
 * One entry per slot. `src` is a file in the handoff folder; `crop` is the
 * region of that file to keep, in source pixels (omit for the whole image);
 * `widths` are the WebP sizes tools/make-images.mjs writes to static/img/.
 * Alt text is copy, so it lives in the copy modules under `images.<slot>`.
 *
 * Deliberately left out of the handoff set:
 *   13, 14, 15, 16 — show parcel collection and a "Sabai Ink" brand: a
 *                    different product. BagDrop stores luggage.
 *   01             — character reference sheet, not a scene.
 *   02, 04, 06     — earlier takes of 20, 05 and 07.
 */
export const IMAGES = {
  /* Home hero */
  hero:        { src: '20_requested_visual_1_hero_variant.png', widths: [800, 1400] },

  /* Home — who it's for (desktop card heads, 2:1) */
  whoFlight:   { src: '19_requested_visual_7_checkout_late_flight.png', crop: [0, 100, 1536, 768], widths: [480, 960] },
  whoShopping: { src: '17_requested_visual_6_shopping_hands_free.png',  crop: [0, 90, 1536, 768],  widths: [480, 960] },
  whoEvening:  { src: '12_open_locker_backpack_visual.png',             crop: [300, 170, 1040, 520], widths: [480, 960] },

  /* How it works — one scene per step (4:3). Everything happens at the machine:
     she taps its screen to start; the phone in stepPay is her own banking app
     paying the PromptPay QR the terminal shows. */
  stepStart:   { src: '08_sequence_visual_C.png',      crop: [150, 0, 1365, 1024],  widths: [480, 960] },
  stepPay:     { src: '07_sequence_visual_B.png',      crop: [0, 180, 1254, 940],   widths: [480, 960] },
  stepStore:   { src: '09_store_visual.png',           crop: [100, 0, 1365, 1024],  widths: [480, 960] },
  stepCollect: { src: '10_collect_visual_man.png',     crop: [120, 0, 1365, 1024],  widths: [480, 960] },

  /* Venue partners — the unit on a retail floor (2:1, top of the unit kept) */
  venueFloor:  { src: '05_rebuilt_consistent_locker_visual.png', crop: [0, 30, 1536, 768], widths: [800, 1600] },
};

/** Output size of a slot at a given width, for width/height attributes. */
export function sizeOf(slot, width) {
  const { crop } = IMAGES[slot];
  const [w, h] = crop ? [crop[2], crop[3]] : [1536, 1024];
  return { width, height: Math.round((width * h) / w) };
}
