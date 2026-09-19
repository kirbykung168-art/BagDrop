#!/usr/bin/env bash
# Regenerate the subset webfonts in static/fonts/.
#
#   node build.mjs && bash tools/build-fonts.sh        (or: npm run fonts)
#
# Families (brief §3): Inter Tight for headings, numerals and the wordmark;
# Inter for body; IBM Plex Sans Thai for Thai. Two weights per family. Chinese
# no longer has pages of its own, so Noto Sans SC is reduced to the four
# characters that appear as a language sample ("你好" and "中文").
#
# Requires python3 and network access on first run. The HTML build needs neither.
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
GF="https://raw.githubusercontent.com/google/fonts/main/ofl"
fetch "$GF/inter/Inter%5Bopsz%2Cwght%5D.ttf"                 "$CACHE/Inter-var.ttf"
fetch "$GF/intertight/InterTight%5Bwght%5D.ttf"              "$CACHE/InterTight-var.ttf"
fetch "$GF/ibmplexsansthai/IBMPlexSansThai-Regular.ttf"      "$CACHE/IBMPlexSansThai-400.ttf"
fetch "$GF/ibmplexsansthai/IBMPlexSansThai-SemiBold.ttf"     "$CACHE/IBMPlexSansThai-600.ttf"
fetch "$GF/notosanssc/NotoSansSC%5Bwght%5D.ttf"              "$CACHE/NotoSansSC-var.ttf"

# Thai tone marks require mark/mkmk/ccmp to survive subsetting, or vowels and
# tone marks stack wrongly. Keep them for every face.
FEATURES="ccmp,locl,kern,liga,clig,mark,mkmk,rlig,tnum"

instance() { # src dest axes...
  local src="$1" dest="$2"; shift 2
  "$PY" -m fontTools.varLib.instancer -q -o "$dest" "$src" "$@"
}
subset_unicodes() { # src dest unicodes
  "$SUB" "$1" --output-file="$2" --flavor=woff2 --unicodes="$3" \
    --layout-features="$FEATURES" --drop-tables+=DSIG --name-IDs='0,1,2,3,4,5,6' --no-hinting
}
subset_text() { # src dest text
  "$SUB" "$1" --output-file="$2" --flavor=woff2 --text="$3" \
    --layout-features="$FEATURES" --drop-tables+=DSIG --name-IDs='0,1,2,3,4,5,6' --no-hinting
}

# Latin: the full Latin-1 + punctuation ranges rather than only the characters
# currently used, so English and Thai copy can be edited without rebuilding.
# The baht sign U+0E3F lives here so it matches the Latin numerals beside it.
LATIN="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0E3F,U+2010-2027,U+2030-205E,U+20AC,U+2122,U+2190-2199,U+2212,U+2215,U+2248,U+2264-2265,U+FEFF,U+FFFD"
# Thai: the whole block minus the baht sign, which Inter serves.
THAI="U+0E01-0E3A,U+0E40-0E5B"

rm -f "$OUT"/*.woff2

for W in 400 600; do
  echo "→ Inter $W"
  instance "$CACHE/Inter-var.ttf" "$CACHE/inter-$W.ttf" "wght=$W" "opsz=14"
  subset_unicodes "$CACHE/inter-$W.ttf" "$OUT/inter-$W.woff2" "$LATIN"

  echo "→ IBM Plex Sans Thai $W"
  subset_unicodes "$CACHE/IBMPlexSansThai-$W.ttf" "$OUT/thai-$W.woff2" "$THAI"
done

for W in 600 700; do
  echo "→ Inter Tight $W"
  instance "$CACHE/InterTight-var.ttf" "$CACHE/intertight-$W.ttf" "wght=$W"
  subset_unicodes "$CACHE/intertight-$W.ttf" "$OUT/intertight-$W.woff2" "$LATIN"
done

# The language sample on How it works and the "中文" interface label. Four
# glyphs, one weight, well under 2 KB — instead of a 50 KB face.
echo "→ Noto Sans SC 500 (language sample only)"
instance "$CACHE/NotoSansSC-var.ttf" "$CACHE/sc-500.ttf" "wght=500"
subset_text "$CACHE/sc-500.ttf" "$OUT/sc-sample-500.woff2" "你好中文"

echo
ls -l "$OUT" | awk 'NR>1 {printf "  %-24s %7.1f KB\n", $9, $5/1024}'
echo "  ---"
du -sh "$OUT" | awk '{print "  total:", $1}'
