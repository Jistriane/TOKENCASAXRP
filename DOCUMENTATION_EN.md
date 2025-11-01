````markdown
# 📖 Complete Documentation - TokenCasa

> **Real Estate Tokenization for Micro-Investors**  
> Invest in real estate starting at R$100 on the XRPL blockchain

**Version**: 1.0  
**Date**: November 1, 2025  
**Status**: ✅ 100% Complete - Production Ready  
**Blockchain**: XRPL Testnet (Complete deployment)

---

## Overview

TokenCasa is a full-stack platform for tokenizing real estate, allowing anyone to invest in properties starting at R$100. It leverages the XRPL for fast, low-cost transactions, automatic rent distribution and on-chain compliance.

## Deploy status

**Deploy Date**: November 1, 2025, 04:38 UTC  
**Network**: XRPL Testnet  
**Endpoint**: `wss://s.altnet.rippletest.net:51233`

Deploy wallet:
- **Address**: `ratmrQEFnEiZqZ1RVvR7Yg28HjAqR5sf1E`
- **Balance**: 100.00 XRP

Deployed contracts (4/4 - 100%):

1. CredentialsContract — connected (2025-11-01T04:38:43.835Z)
2. MPTContract — connected (2025-11-01T04:38:44.923Z) — owner: `ratmrQEFnEiZqZ1RVvR7Yg28HjAqR5sf1E`
3. EscrowContract — connected (2025-11-01T04:38:46.008Z)
4. DEXContract — connected (2025-11-01T04:38:47.094Z)

Reports:
- JSON: `contracts/deploy-reports/deploy-testnet-2025-11-01T04-38-47-396Z.json`
- Log: `contracts/deploy-reports/deploy-testnet-2025-11-01T04-38-47-396Z.log`

````markdown
# 📖 Complete Documentation - TokenCasa

> **Real Estate Tokenization for Micro-Investors**  
> Invest in real estate starting at R$100 on the XRPL blockchain

**Version**: 1.0  
**Date**: November 1, 2025  
**Status**: ✅ 100% Complete - Production Ready  
**Blockchain**: XRPL Testnet (Complete deployment)

---

## Table of Contents

1. [Overview](#overview)
2. [Market Problem](#market-problem)
3. [Our Solution](#our-solution)
4. [How It Works](#how-it-works)
5. [Features](#features)
6. [Technical Architecture](#technical-architecture)
7. [XRPL Contracts](#xrpl-contracts)
8. [Technology Stack](#technology-stack)
9. [Use Cases](#use-cases)
10. [Implemented Features](#implemented-features)
11. [User Guide](#user-guide)
12. [Deployment & Installation](#deployment--installation)
13. [Security & Compliance](#security--compliance)
14. [Roadmap](#roadmap)

---

## Overview

TokenCasa is a full-stack platform for tokenizing real estate that allows anyone to invest in properties starting at R$100. Built on the XRPL, the platform provides fast, low-cost transactions, automatic rent distribution, and on-chain compliance.

### Mission

Democratize access to real estate wealth by enabling micro-investors to build assets through fractional ownership, with 24/7 liquidity and automated rent distribution.

### Tagline

"Invest in real estate starting at R$100" — From savings to real estate wealth in 5 minutes.

### Key Differentiators

- Low minimum investment: R$100
- 24/7 liquidity through an on-chain DEX
- Automatic, on-chain rent distribution
- Built-in compliance (KYC/AML) via XRPL Credentials and MPT
- Low costs and high throughput compared to other chains

---

## Market Problem

The Brazilian real estate market has high barriers to entry: expensive purchase prices, illiquidity, and high transaction costs. Traditional real estate investment products (e.g., REITs/FIIs) also have minimums and fees that limit access for small investors.

Opportunity: tokenization unlocks a multi-trillion BRL market by enabling fractional ownership, faster trading, and transparent, auditable on-chain operations.

---

## Our Solution

TokenCasa enables fractional ownership of real estate through Multi-Purpose Tokens (MPTs) on XRPL. Investors can buy small slices of properties, trade them on an on-chain DEX, and receive rent distributions automatically via escrow contracts.

Highlights:
- Minimum investment: R$100
- Fast execution (3–5s) and low fees on XRPL
- Native DEX + AMM + CAM for continuous liquidity
- Automated escrow-based rent distribution
- Integrations for IPFS (metadata), oracles (price feeds), and KYC (XRPL Credentials)

---

## How It Works

Typical investor flow (example):

1. Browse marketplace and select a tokenized property.
2. Connect wallet (Crossmark) and complete KYC.
3. Purchase tokens via the on-chain DEX or AMM.
4. Tokens appear in the investor portfolio instantly.
5. Rents collected by property owners are deposited into a time-locked escrow and distributed pro-rata to token holders.
6. Investors can sell tokens on the DEX at any time.

Example (Ana invests R$500):

- Property value: R$800,000; 1,000,000 tokens; price per token R$0.80
- Ana buys R$500 → 625 tokens
- Monthly rent allocation results in small periodic payouts, distributed automatically

---

## Features

### Marketplace

- Responsive property cards with images and metadata
- Advanced filters (location, type, yield, price)
- Detailed property pages with documents and IPFS metadata

### On-chain Trading (DEX)

- Native XRPL order book and AMM pools
- Continuous Auction Mechanism (CAM) for price discovery
- Market and limit orders + slippage protection

### Portfolio & Reporting

- Holdings overview, performance charts, and transaction history
- Rent receipts and automated payouts

### KYC & Credentials

- Two-step verification and document upload
- XRPL Credentials (XLS-70) issuance for verified investors
- Transfer restrictions for regulatory compliance

### Escrow Rental Distribution

- Time-locked escrow contracts on XRPL
- Pro-rata distribution by token holdings
- Transparent, auditable on-chain flows

### Notifications & Chatbot

- In-app notifications for rents, transactions, and KYC
- Integrated chatbot (elizaOS) for user help and suggestions

---

## Technical Architecture

Overview:

- Frontend: Next.js 14 (App Router), TypeScript, TailwindCSS
- Backend: NestJS 10, PostgreSQL, TypeORM
- Blockchain: XRPL Testnet (deployable to mainnet)
- Storage: IPFS (Pinata)
- Oracles: Chainlink for external price feeds

Components:
- Admin portal to onboard and tokenize properties (upload docs, valuation, token issuance)
- Marketplace and DEX for trading
- Escrow and distribution services for rent payouts
- KYC module emitting XRPL credentials

---

## XRPL Contracts

**Deploy date**: November 1, 2025, 04:38 UTC
**Network**: XRPL Testnet
**Endpoint**: `wss://s.altnet.rippletest.net:51233`

Deploy wallet:
- Address: `ratmrQEFnEiZqZ1RVvR7Yg28HjAqR5sf1E`

Deployed contracts (4/4):

1. CredentialsContract — KYC/AML credentials issuance and gating
2. MPTContract — Multi-Purpose Token issuance and metadata
3. EscrowContract — Time-locked escrow for rent distribution
4. DEXContract — Native XRPL trading surfaces (order book + AMM)

Reports:
- JSON: `contracts/deploy-reports/deploy-testnet-2025-11-01T04-38-47-396Z.json`
- Log: `contracts/deploy-reports/deploy-testnet-2025-11-01T04-38-47-396Z.log`

---

## Technology Stack

Frontend:
- Next.js 14 (App Router)
- TypeScript 5
- TailwindCSS
- Crossmark wallet integration

Backend:
- NestJS 10
- PostgreSQL 15
- TypeORM

Blockchain & infra:
- XRPL (altnet/testnet)
- IPFS (Pinata)
- Chainlink oracles

---

## Use Cases

1. Retail investor with R$500 diversifies across properties
2. Small investor builds passive income via rent distributions
3. Property owner tokenizes assets to unlock liquidity

---

## Implemented Features

- Frontend: 8 pages, 22 React components, PWA, analytics
- Backend: 12 modules, REST API, PostgreSQL integration
- Integrations: XRPL, IPFS, SendGrid, Chainlink
- XRPL features: MPT, DEX, AMM, CAM, Escrow, Credentials, DID + Hooks

---

## User Guide

### For Investors

1. Connect wallet (Crossmark)
2. Complete KYC and receive credentials
3. Browse marketplace and buy tokens
4. Receive rent payouts automatically
5. Sell tokens on the DEX when desired

### For Property Owners

1. Onboard property in admin portal
2. Upload documents and valuation
3. Tokenize and list on marketplace

---

## Deployment & Installation

Local development:

```bash
npm install
npm run dev
```

Contracts deploy (example):

```bash
# Set issuer secret
export XRPL_ISSUER_SECRET="sYOUR_SECRET_HERE"

# Deploy to testnet
npm run deploy:testnet
```

Generate a test wallet:

```bash
npm run generate:wallet
```

---

## Security & Compliance

- KYC/AML flows enforced via XRPL Credentials
- Transfer restrictions on MPT tokens for regulatory controls
- On-chain transparency for auditing and reporting

---

## Roadmap

Phase 1 (MVP): Complete — Frontend, Backend, Integrations, XRPL contracts deployed

Phase 2 (Production): Mainnet deployment, onboarding real properties, regulatory approvals

Phase 3 (Scale): International marketplace, advanced AMM pools, native mobile apps

---

## Metrics & Projections

- Target initial users: 200k
- AUM year 1 estimate: R$200M
- Trading volume estimate: R$20M/month

---

## Quick Links

- XRPL Testnet Explorer: https://testnet.xrpl.org
- TokenCasa frontend (production): https://tokencasaxrp.vercel.app

---

**Status**: ✅ Production-ready (Testnet deployed)  
**Last update**: November 1, 2025

````
