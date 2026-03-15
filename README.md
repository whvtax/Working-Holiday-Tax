# Working Holiday Tax — Static Website

## Deploy to Vercel via GitHub

```bash
# 1. Unzip and enter folder
unzip working-holiday-tax-final.zip
cd wht-final

# 2. Init git and push to GitHub
git init
git add .
git commit -m "Initial commit"
gh repo create working-holiday-tax --public --push --source=.

# 3. Deploy to Vercel
npm install -g vercel
vercel
```

Or drag the folder to https://app.netlify.com/drop for instant deployment.

## Pages
| Page | URL |
|---|---|
| Home | / |
| TFN | /tfn |
| ABN | /abn |
| Tax Return | /tax-return |
| Superannuation | /superannuation |
| Medicare | /medicare |
| Contact | /contact |
| Privacy Policy | /privacy-policy |
| Client Agreement | /client-agreement |
