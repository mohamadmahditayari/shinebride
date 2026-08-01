# Deployment Guide

## Required GitHub Secrets

Add these secrets in GitHub repository settings -> Secrets and variables -> Actions:

- CLOUDFLARE_API_TOKEN
- CLOUDFLARE_ACCOUNT_ID

## Deploy

1. Push changes to the main branch, or
2. Open the Actions tab and run "Deploy to Cloudflare Pages" manually.

## Notes

- The workflow uses Node 24 and Wrangler 4.
- The build runs on Ubuntu, which avoids the Windows-specific OpenNext/Wrangler issue.
