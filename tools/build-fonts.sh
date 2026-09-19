#!/usr/bin/env bash
# Regenerate the subset webfonts in public/fonts/.
#
# Only needed when the copy introduces new characters — above all for Chinese,
# where the subset contains exactly the glyphs the site renders. Run:
#   node build.mjs && node tools/collect-glyphs.mjs && bash tools/build-fonts.sh
# (or: npm run fonts)
#
# Requires python3 and network access. The HTML build needs neither.
set -euo pipefail
cd "$(dirname "$0")/.."

VENV=".fontenv"
CACHE=".fontcache"
OUT="static/fonts"
mkdir -p "$CACHE" "$OUT"

if [ ! -x "$VENV/bin/pyftsubset" ]; then
  echo "→ creating $VENV"
  python3 -m venv "$VENV"
  "$VENV/bin/pip" install -q --upgrade pip
  "$VENV/bin/pip" install -q "fonttools[woff]" brotli
fi
PY="$VENV/bin/python"
SUB="$VENV/bin/pyftsubset"

fetch() { # url dest
  [ -s "$2" ] && return 0
  echo "→ downloading $(basename "$2")"
  curl -sSL --retry 3 -m 300 -o "$2" "$1"
}
fetch "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf"            "$CACHE/Inter-var.ttf"
fetch "https://raw.githubusercontent.com/google/fonts/main/ofl/notosansthai/NotoSansThai%5Bwdth%2Cwght%5D.ttf" "$CACHE/NotoSansThai-var.ttf"
fetch "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf"         "$CACHE/NotoSansSC-var.ttf"

# Thai tone marks require mark/mkmk/ccmp to survive subsetting, or vowels and
# tone marks stack wrongly. Keep them for every face.
FEATURES="ccmp,locl,kern,liga,clig,mark,mkmk,rlig"

instance() { # src dest axes...
  local src="$1" dest="$2"; shift 2
  "$PY" -m fontTools.varLib.instancer -q -o "$dest" "$src" "$@"
}

subset_unicodes() { # src dest unicodes
  "$SUB" "$1" --output-file="$2" --flavor=woff2 --unicodes="$3" \
    --layout-features="$FEATURES" --drop-tables+=DSIG --name-IDs='0,1,2,3,4,5,6' --no-hinting
}
subset_text() { # src dest textfile
  "$SUB" "$1" --output-file="$2" --flavor=woff2 --text-file="$3" \
    --layout-features="$FEATURES" --drop-tables+=DSIG --name-IDs='0,1,2,3,4,5,6' --no-hinting
}

# Latin: the full Latin-1 + punctuation ranges rather than only the characters
# currently used, so English and Thai copy can be edited without rebuilding fonts.
LATIN="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0E3F,U+2010-2027,U+2030-205E,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD"
# Thai: the whole Thai block, for the same reason. It is only a few KB.
THAI="U+0E01-0E3A,U+0E3F-0E5B"

for W in 400 700; do
  echo "→ Inter $W"
  instance "$CACHE/Inter-var.ttf" "$CACHE/inter-$W.ttf" "wght=$W" "opsz=14"
  subset_unicodes "$CACHE/inter-$W.ttf" "$OUT/inter-$W.woff2" "$LATIN"

  echo "→ Noto Sans Thai $W"
  instance "$CACHE/NotoSansThai-var.ttf" "$CACHE/thai-$W.ttf" "wght=$W" "wdth=100"
  subset_unicodes "$CACHE/thai-$W.ttf" "$OUT/thai-$W.woff2" "$THAI"

  # Chinese is subset to the EXACT characters the site renders (17MB source).
  # If Chinese copy changes, this must be re-run or glyphs will be missing.
  echo "→ Noto Sans SC $W"
  instance "$CACHE/NotoSansSC-var.ttf" "$CACHE/sc-$W.ttf" "wght=$W"
  subset_text "$CACHE/sc-$W.ttf" "$OUT/sc-$W.woff2" "tools/charsets/cjk.txt"
done

# The language switcher shows "中文" on English and Thai pages. Without this,
# those two characters drag in the full ~50KB Simplified Chinese face on every
# non-Chinese page. A 2-glyph micro subset costs well under 1KB instead.
printf '%s' '中文' > "$CACHE/navcjk.txt"
for W in 400 700; do
  echo "→ Noto Sans SC (switcher micro-subset) $W"
  subset_text "$CACHE/sc-$W.ttf" "$OUT/sc-nav-$W.woff2" "$CACHE/navcjk.txt"
done

echo
ls -l "$OUT" | awk 'NR>1 {printf "  %-20s %7.1f KB\n", $9, $5/1024}'
echo "  ---"
du -sh "$OUT" | awk '{print "  total:", $1}'
