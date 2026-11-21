#!/usr/bin/env bash
# Wraps index.html (artifact source, no <html>/<head> skeleton) into a standalone site in dist/.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
{
  cat <<'HEAD'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0E1F70">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Bospora Health">
<meta property="og:title" content="Bospora Health · Heal. Discover Istanbul.">
<meta property="og:description" content="Compare Google-rated dental and hair transplant clinics in Istanbul. Book with a 10% deposit, pay the rest at the clinic. By Markan Studio.">
<meta name="twitter:card" content="summary">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Crect width='36' height='36' rx='11' fill='%232243D0'/%3E%3Cpath d='M9.5 25c3.2-9.5 7.6-13 17-13' stroke='%23fff' stroke-width='2.8' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='9.5' cy='25' r='3.2' fill='%23D63D28'/%3E%3Cpath d='M22.5 8.5l4.2 3.5-4.2 3.5' stroke='%23fff' stroke-width='2.6' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
HEAD
  cat index.html
  printf '\n</body>\n</html>\n'
} > dist/index.html
echo "built dist/index.html"
