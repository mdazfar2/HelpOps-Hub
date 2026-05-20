# HelpOps-Hub Website 4.0

This workspace is the TypeScript migration foundation for the HelpOps-Hub frontend.

## Scope

- Uses Next.js + TypeScript + Tailwind CSS
- Keeps the legacy `website3.0` app untouched
- Starts the migration inside the required root folder: `website4.0`
- Migrates the homepage landing sections into typed `.tsx` components and `.ts` data/types

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Notes

- Future page migrations should continue inside this workspace.
- Per the repository migration plan, additional pages/features should land through dedicated issues.
