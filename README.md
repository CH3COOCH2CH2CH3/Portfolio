# Mạnh Đức — Cybersecurity Portfolio

A two-route technical portfolio built with Next.js App Router and TypeScript.

## Pages

- `/` — portfolio homepage
- `/projects/mini-soc` — full Mini SOC technical case study

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Create a GitHub repository and push this folder.
2. Import the repository into Vercel.
3. Vercel detects Next.js automatically; no custom build configuration is required for this project.
4. Every GitHub push can produce a new deployment/preview depending on your Vercel project settings.

## Before publishing

- Verify `m134gold@gmail.com` is the public contact email you want to expose.
- Add LinkedIn only when you have a public profile URL.
- Do not upload the current raw CV PDF: it contains DOB, phone number and location. Create a sanitized public resume first.
- The `public/evidence` folder intentionally excludes the screenshot containing a Wazuh JWT and avoids raw evidence screenshots that expose infrastructure addresses.
- Keep the contribution boundary: this is a **Graduation Capstone — Team of 2**. The portfolio claims the SOC/security-engineering portion only; SDN and LLM implementation are teammate work.

## Content position

The case study intentionally states project boundaries:

- controlled research/lab environment;
- PB-03 is audit-only;
- no production-readiness claim;
- no broad behavioral-detection claim;
- no large-scale availability/load/FP-FN benchmark claim.
