#!/usr/bin/env python3
"""Download all posts from @vonlovi on Instagram and refresh data/archives.json.

Instagram requires an authenticated session. Choose one method:

  1. Browser cookies (easiest if logged in):
     python3 scripts/fetch-instagram.py --browser chrome

  2. Instaloader login:
     INSTAGRAM_USER=you INSTAGRAM_PASS=secret python3 scripts/fetch-instagram.py --login

  3. gallery-dl with cookies file (Netscape format):
     python3 scripts/fetch-instagram.py --cookies cookies.txt
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARCH = ROOT / "assets" / "archives"
MANIFEST = ROOT / "data" / "archives.json"
PROFILE = "https://www.instagram.com/vonlovi/"
USERNAME = "vonlovi"

GALLERY_DL = Path.home() / "Library/Python/3.9/bin/gallery-dl"
if not GALLERY_DL.exists():
    GALLERY_DL = shutil.which("gallery-dl")


def image_size(path: Path) -> tuple[int | None, int | None]:
    try:
        from PIL import Image

        with Image.open(path) as im:
            return im.size
    except Exception:
        return None, None


def build_manifest() -> dict:
    images = []
    for path in sorted(ARCH.iterdir()):
        if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        w, h = image_size(path)
        images.append(
            {
                "src": f"assets/archives/{path.name}",
                "width": w,
                "height": h,
                "alt": "Vonlovi — archives",
            }
        )
    return {
        "source": PROFILE,
        "username": USERNAME,
        "count": len(images),
        "images": images,
    }


def write_manifest(data: dict) -> None:
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"Manifest: {len(data['images'])} images → {MANIFEST}")


def download_with_gallery_dl(browser: str | None, cookies: str | None) -> None:
    if not GALLERY_DL:
        sys.exit("gallery-dl not found. Install: pip3 install gallery-dl")

    ARCH.mkdir(parents=True, exist_ok=True)
    cmd = [str(GALLERY_DL), "-d", str(ARCH), "--filename", "{num:>03}_{id}.{extension}"]

    if browser:
        cmd.extend(["--cookies-from-browser", browser])
    elif cookies:
        cmd.extend(["--cookies", cookies])

    cmd.append(PROFILE)
    print("Running:", " ".join(cmd))
    result = subprocess.run(cmd)
    if result.returncode != 0:
        print(
            "gallery-dl failed. Log into Instagram in your browser, then retry with --browser chrome",
            file=sys.stderr,
        )
        sys.exit(result.returncode)


def download_with_instaloader() -> None:
    try:
        import instaloader
    except ImportError:
        sys.exit("instaloader not found. Install: pip3 install instaloader")

    user = os.environ.get("INSTAGRAM_USER")
    password = os.environ.get("INSTAGRAM_PASS")
    if not user or not password:
        sys.exit("Set INSTAGRAM_USER and INSTAGRAM_PASS for --login")

    ARCH.mkdir(parents=True, exist_ok=True)
    loader = instaloader.Instaloader(
        dirname_pattern=str(ARCH),
        filename_pattern="{shortcode}",
        download_video_thumbnails=False,
        download_geotags=False,
        download_comments=False,
        save_metadata=False,
        compress_json=False,
        post_metadata_txt_pattern="",
    )
    loader.login(user, password)
    profile = instaloader.Profile.from_username(loader.context, USERNAME)

    for i, post in enumerate(profile.get_posts(), 1):
        loader.download_post(post, target=str(ARCH))
        print(f"[{i}] {post.shortcode}")


def normalize_downloads() -> None:
    """Flatten nested gallery-dl folders and dedupe by content hash."""
    seen: set[str] = set()
    counter = 1

    for path in sorted(ARCH.rglob("*")):
        if not path.is_file():
            continue
        if path.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue

        digest = hashlib.md5(path.read_bytes()).hexdigest()[:10]
        if digest in seen:
            path.unlink(missing_ok=True)
            continue
        seen.add(digest)

        dest = ARCH / f"{counter:03d}-{digest}{path.suffix.lower()}"
        counter += 1
        if path != dest:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(path), str(dest))

    for path in sorted(ARCH.rglob("*"), reverse=True):
        if path.is_dir() and path != ARCH and not any(path.iterdir()):
            path.rmdir()


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch @vonlovi Instagram archive")
    parser.add_argument("--browser", help="Browser for cookies (chrome, safari, firefox)")
    parser.add_argument("--cookies", help="Path to Netscape cookies.txt")
    parser.add_argument("--login", action="store_true", help="Use instaloader login")
    parser.add_argument("--manifest-only", action="store_true", help="Rebuild JSON only")
    args = parser.parse_args()

    if args.manifest_only:
        write_manifest(build_manifest())
        return

    if args.login:
        download_with_instaloader()
    else:
        download_with_gallery_dl(args.browser, args.cookies)

    normalize_downloads()
    write_manifest(build_manifest())


if __name__ == "__main__":
    main()
