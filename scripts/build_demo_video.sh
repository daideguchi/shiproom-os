#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FONT="/System/Library/Fonts/Supplemental/Arial.ttf"
EDGE_TTS_PYTHON="${EDGE_TTS_PYTHON:-python3.11}"
EDGE_TTS_VOICE="${EDGE_TTS_VOICE:-en-US-AvaNeural}"
EDGE_TTS_RATE="${EDGE_TTS_RATE:--6%}"
OUT="$ROOT/media/shiproom-os-demo.mp4"
DRAFT_OUT="$ROOT/media/shiproom-os-demo-draft.mp4"
TMP_DIR="$ROOT/media/.demo_video_tmp"

rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

make_text_slide() {
  local title="$1"
  local subtitle="$2"
  local footer="$3"
  local out="$4"

  magick -size 1920x1080 xc:"#f4f6f8" \
    -fill "#173044" -draw "rectangle 0,0 1920,250" \
    -fill "#1f7a4d" -draw "rectangle 78,328 1842,358" \
    -fill "#ffffff" -font "$FONT" -pointsize 74 -annotate +82+148 "$title" \
    -fill "#e9f7ef" -font "$FONT" -pointsize 34 -annotate +86+216 "$subtitle" \
    -fill "#ffffff" -stroke "#d7e0ea" -strokewidth 3 -draw "roundrectangle 120,420 1800,760 24,24" \
    -stroke none -fill "#17202a" -font "$FONT" -pointsize 44 -annotate +170+525 "$footer" \
    -fill "#617083" -font "$FONT" -pointsize 28 -annotate +170+652 "A verified public MVP with a visible proof ledger and no fake platform claims." \
    "$out"
}

make_screenshot_slide() {
  local src="$1"
  local title="$2"
  local subtitle="$3"
  local kicker="$4"
  local out="$5"

  magick "$src" \
    -resize 1920x \
    -crop 1920x1080+0+0 +repage \
    -fill "#10202ED9" -draw "rectangle 0,0 1920,164" \
    -fill "#000000CC" -draw "rectangle 0,790 1920,1080" \
    -font "$FONT" -fill "#BFE8FF" -pointsize 30 -annotate +72+64 "$kicker" \
    -font "$FONT" -fill white -pointsize 58 -annotate +72+126 "$title" \
    -font "$FONT" -fill white -pointsize 38 -annotate +72+900 "$subtitle" \
    "$out"
}

cat > "$TMP_DIR/narration.txt" <<'TEXT'
AI makes it easy to start. Shiproom OS is about finishing.

It helps a solo builder turn a rough product idea into a launch packet that can be reviewed, proven, and shipped.

The first thing it creates is a judge snapshot: who the product is for, what hurts, how the tool helps, what can be verified today, and what is still blocked.

Then it turns the idea into first-version scope, a proof checklist, launch copy, and a shipping timeline. This keeps the builder from confusing generated text with real product progress.

The evidence ledger is the important boundary. Public URL, user signal, demo video, build journey, human review, and Novus proof all have visible states.

Then the learning loop asks what should be measured after launch, what activation means, and what decision comes next.

Because Novus and Pendo proof is attached, the live-proof verifier passes. If that proof were missing, the tool would say so instead of pretending the platform requirement is complete.

The packet can be exported as JSON or Markdown, and the next-agent brief makes continuation clear for either a human teammate or an AI assistant.

Everyone can generate. Fewer people ship. Shiproom OS closes that last mile with proof, not vibes.
TEXT

"$EDGE_TTS_PYTHON" -m edge_tts \
  --voice "$EDGE_TTS_VOICE" \
  --rate="$EDGE_TTS_RATE" \
  --file "$TMP_DIR/narration.txt" \
  --write-media "$TMP_DIR/narration.mp3"

make_text_slide \
  "Shiproom OS" \
  "Idea to shipped product packet" \
  "Everyone can generate. Fewer people ship." \
  "$TMP_DIR/slide-0.png"

make_screenshot_slide "$ROOT/media/shiproom-os-pages-full.png" \
  "Start With The Builder" \
  "Idea, user, pain, timebox, public URL, user signal, and Novus status." \
  "1 / 6  Product intake" \
  "$TMP_DIR/slide-1.png"

make_screenshot_slide "$ROOT/media/shiproom-os-pages-full.png" \
  "Judge Snapshot First" \
  "Who it is for, what hurts, how it helps, what is verified, and what is blocked." \
  "2 / 6  Middle-school-clear framing" \
  "$TMP_DIR/slide-2.png"

make_screenshot_slide "$ROOT/media/shiproom-os-pages-full.png" \
  "Scope And Proof" \
  "The packet creates scope, proof checklist, launch copy, and shipping timeline." \
  "3 / 6  From idea to launch packet" \
  "$TMP_DIR/slide-3.png"

make_screenshot_slide "$ROOT/media/shiproom-os-pages-full.png" \
  "Evidence And Learning" \
  "Evidence states feed a learning loop: measure activation, decide the next experiment." \
  "4 / 6  No fake proof, no lost learning" \
  "$TMP_DIR/slide-4.png"

make_screenshot_slide "$ROOT/media/shiproom-os-mvp-full.png" \
  "Export The Handoff" \
  "JSON, Markdown, and next-agent briefs make the work reviewable and continuable." \
  "5 / 6  Human and AI handoff ready" \
  "$TMP_DIR/slide-5.png"

make_text_slide \
  "Honest Submission Boundary" \
  "Public MVP is verified. Novus/Pendo live proof is attached." \
  "The project is stronger because it names exactly what evidence exists." \
  "$TMP_DIR/slide-6.png"

ffmpeg -y \
  -loop 1 -t 13 -i "$TMP_DIR/slide-0.png" \
  -loop 1 -t 13 -i "$TMP_DIR/slide-1.png" \
  -loop 1 -t 13 -i "$TMP_DIR/slide-2.png" \
  -loop 1 -t 13 -i "$TMP_DIR/slide-3.png" \
  -loop 1 -t 13 -i "$TMP_DIR/slide-4.png" \
  -loop 1 -t 13 -i "$TMP_DIR/slide-5.png" \
  -loop 1 -t 13 -i "$TMP_DIR/slide-6.png" \
  -i "$TMP_DIR/narration.mp3" \
  -filter_complex "[0:v][1:v][2:v][3:v][4:v][5:v][6:v]concat=n=7:v=1:a=0,format=yuv420p[v];[7:a]loudnorm=I=-16:TP=-1.5:LRA=11,volume=0.92[a]" \
  -map "[v]" -map "[a]" -r 30 -c:v libx264 -preset veryfast -crf 23 -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"

cp "$OUT" "$DRAFT_OUT"
rm -rf "$TMP_DIR"
echo "$OUT"
