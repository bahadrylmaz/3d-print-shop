#!/bin/bash
# Favicon setini logodan üretir. Kaynak: public/crystal.png (1024 px, siyah zeminli kristal).
# Çıktılar (public/): favicon.ico (16+32+48, PNG girişli), favicon-32x32.png, favicon-192x192.png,
# favicon-512.png (JSON-LD logosu), apple-touch-icon.png (180, köşesiz), logo-kristal.jpg (menü simgesi).
# Gerekenler: ffmpeg, python3. Çalıştırma (proje kökünden): bash scripts/favicon.sh
# Logo değişirse: yeni görseli public/crystal.png üstüne yazın, betiği çalıştırın ve index.html'deki
# ikon bağlantılarında ?v= sayısını bir artırın (tarayıcılar favicon'u adresine göre uzun süre saklar).
set -euo pipefail
cd "$(dirname "$0")/.."
G="$(mktemp -d)"; trap 'rm -rf "$G"' EXIT
ff() { ffmpeg -hide_banner -loglevel error -y "$@"; }

# 1) Kare ana görsel: kristal ortada, lacivert zemin (siyah zemin ekran harmanıyla laciverte döner)
ff -i public/crystal.png -f lavfi -i "color=c=0x1B1740:s=640x640" \
  -filter_complex "[0]crop=640:640:190:192,format=gbrp[c];[1]format=gbrp[b];[b][c]blend=all_mode=screen,scale=1024:1024:flags=lanczos,format=rgba" \
  -frames:v 1 "$G/kare.png"
# 2) Yuvarlak köşeli sürüm (yarıçap %22), köşeler saydam
ff -i "$G/kare.png" \
  -vf "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='if(gt(abs(X-511.5),511.5-225)*gt(abs(Y-511.5),511.5-225),if(lte(hypot(abs(X-511.5)-(511.5-225),abs(Y-511.5)-(511.5-225)),225),255,0),255)'" \
  -frames:v 1 "$G/yuvarlak.png"

for b in 16 32 48 192 512; do ff -i "$G/yuvarlak.png" -vf "scale=$b:$b:flags=lanczos" -frames:v 1 "$G/$b.png"; done
cp "$G/32.png" public/favicon-32x32.png
cp "$G/192.png" public/favicon-192x192.png
cp "$G/512.png" public/favicon-512.png
ff -i "$G/kare.png" -vf "scale=180:180:flags=lanczos,format=rgb24" -frames:v 1 public/apple-touch-icon.png
ff -i "$G/kare.png" -vf "scale=192:192:flags=lanczos,format=yuvj444p" -frames:v 1 -q:v 2 public/logo-kristal.jpg

# 3) favicon.ico: 16, 32 ve 48 px PNG girişleri tek dosyada
python3 - "$G" <<'PY'
import struct, sys
g = sys.argv[1]
boylar = [16, 32, 48]
veriler = [open(f"{g}/{b}.png", "rb").read() for b in boylar]
bas = struct.pack("<HHH", 0, 1, len(boylar))
konum = 6 + 16 * len(boylar)
girisler = b""
for b, v in zip(boylar, veriler):
    girisler += struct.pack("<BBBBHHII", b, b, 0, 0, 1, 32, len(v), konum)
    konum += len(v)
open("public/favicon.ico", "wb").write(bas + girisler + b"".join(veriler))
PY
echo "favicon seti yazıldı"
