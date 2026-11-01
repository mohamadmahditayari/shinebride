$ErrorActionPreference = "Stop"

Write-Host "Cleaning stale Next.js and Node processes..."

Get-CimInstance Win32_Process |
  Where-Object { $_.Name -match 'node|next' } |
  ForEach-Object {
    try {
      Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
    } catch {}
  }

if (Test-Path ".next") {
  Remove-Item -Recurse -Force ".next"
}

if (Test-Path ".open-next") {
  Remove-Item -Recurse -Force ".open-next"
}

if (Test-Path "node_modules\.cache") {
  Remove-Item -Recurse -Force "node_modules\.cache"
}

if (Test-Path ".wrangler") {
  Remove-Item -Recurse -Force ".wrangler"
}

Write-Host "Starting Next.js dev server..."
& npx next dev --hostname 127.0.0.1 --port 3000
