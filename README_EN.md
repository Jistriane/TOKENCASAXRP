# 🏠 TokenCasa - Real Estate Fractionalization for Micro-Investors

<div align="center">
  <img src="Logo.png" alt="TokenCasa Logo" width="200"/>
  
  > **Invest in real estate starting at R$100**
  > From savings to real estate wealth in 5 minutes
</div>

## ✅ PROJECT 100% COMPLETE - PRODUCTION READY

**Status**: 🎉 10/10 COMPLETE  
**Date**: November 1, 2025  
**Powered by XRPL**

### English Documentation

- Full English summary available in `DOCUMENTATION_EN.md`.

### 🚀 XRPL Contracts Deployment

**Status**: ✅ Contracts deployed on XRPL Testnet  
**Deploy Date**: November 1, 2025, 04:38 UTC  
**Network**: XRPL Testnet  
**Endpoint**: `wss://s.altnet.rippletest.net:51233`

#### Deployment Wallet
- **Address**: `ratmrQEFnEiZqZ1RVvR7Yg28HjAqR5sf1E`
- **Balance**: 100.00 XRP
- **Sequence**: 11969474

#### Contracts Deployed (4/4 - 100%):
1. ✅ **CredentialsContract** — connected (2025-11-01T04:38:43.835Z)
   - KYC/AML credential system
2. ✅ **MPTContract** — connected (2025-11-01T04:38:44.923Z)
   - Owner: `ratmrQEFnEiZqZ1RVvR7Yg28HjAqR5sf1E`
   - Multi-Purpose Tokens for property fractioning
3. ✅ **EscrowContract** — connected (2025-11-01T04:38:46.008Z)
   - Native escrow for rent distribution
4. ✅ **DEXContract** — connected (2025-11-01T04:38:47.094Z)
   - Native XRPL trading (order book + AMM)

#### Deployment Reports
- JSON: `contracts/deploy-reports/deploy-testnet-2025-11-01T04-38-47-396Z.json`  
- Log: `contracts/deploy-reports/deploy-testnet-2025-11-01T04-38-47-396Z.log`

---

## 🌐 Frontend Deployment

**Status**: ✅ Frontend deployed on Vercel  
**Deploy Date**: October 27, 2025  
**Platform**: Vercel  
**Network**: XRPL Testnet

### Frontend URLs
- Production: https://tokencasaxrp.vercel.app
- Preview (main): https://tokencasaxrp-git-main-jistrianedroid-3423s-projects.vercel.app
- Preview (other): https://tokencasaxrp-bdxrgs7cr-jistrianedroid-3423s-projects.vercel.app

### Deployment Settings
- Framework: Next.js 14 (App Router)
- Region: gru1 (São Paulo)
- Build: Production optimized
- Network: XRPL Testnet
- Endpoint: `wss://s.altnet.rippletest.net:51233`

### Environment Variables Configured
- `NEXT_PUBLIC_XRPL_NETWORK` = `testnet`
- `NODE_ENV` = `production`

### Automatic Deploys
- ✅ GitHub integration configured
- ✅ Push to `main` triggers production deploys

---

## 📊 Implemented Features (Summary)

### Frontend (100%)
- Next.js 14 + TypeScript + TailwindCSS
- 8 complete pages
- 22 React components
- PWA, Analytics, Crossmark wallet integration

### Backend (100%)
- NestJS 10 + TypeScript
- 12 modules, REST API, PostgreSQL + TypeORM

### Integrations
- XRPL (testnet/mainnet), IPFS (Pinata), SendGrid, Chainlink

### XRPL Features (8/8)
1. MPT (Multi-Purpose Tokens)
2. Native DEX with AMM
3. Native Escrow for rent distribution
4. Credentials (XLS-70) for KYC
5. Continuous Auction Mechanism (CAM)
6. DID + Hooks
7. Order Book
8. Slippage Protection

---

## 🚀 Quick Start

```bash
npm run dev
```

This starts:
- Frontend → http://localhost:3000
- Backend → http://localhost:3001

### Initial Setup (optional)

For third-party integrations (Pinata, SendGrid, Analytics), update `backend/.env` or `.env.local` with the provider keys. Mocks are available for development.

---

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm run generate:wallet` | Generate a new test wallet |
| `npm run deploy:testnet` | Deploy contracts to XRPL Testnet |
| `npm run deploy:mainnet` | Deploy contracts to XRPL Mainnet |
| `npm run deploy:contracts` | Custom deploy flow |
| `npm run build` | Build frontend + backend |

### Verify Deploys

```bash
cat contracts/deploy-reports/deploy-testnet-*.json
ls -lh contracts/deploy-reports/
```

---

## 📁 Project Structure (high level)

```
TokenCasaXRP/
├── app/        # Frontend Next.js
├── backend/    # NestJS backend
├── components/ # React components
├── contracts/  # XRPL contracts and deploy scripts
├── lib/        # Helpers and managers
└── public/     # Static assets
```

---

## 🛡️ Security & Compliance

- KYC/AML built into token transfers via MPT and XRPL Credentials.
- Transfer restrictions, on-chain transparency, and reporting.

---

## 📞 Support & Docs

- Main README (Português): `README.md`  
- English doc (summary/full): `DOCUMENTATION_EN.md`  
- Full Portuguese docs: `DOCUMENTACAO_PT.md`

---

## 🎉 Final Status

TokenCasa is production-ready on Testnet. For mainnet deployment and production operations, follow the production checklist in `contracts/DEPLOY_GUIDE.md` and ensure compliance approvals where required.

**Last update**: November 1, 2025
