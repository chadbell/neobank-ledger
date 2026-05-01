# neobank-ledger

Learning payments infrastructure by building it. Double-entry ledger, payment rails, and compliance flows using Python, FastAPI, and Stripe.

## Why

I read [this article](https://www.unite.ai/the-pattern-of-banking-disruption-ai-agentic-infrastructure/) about how AI is accelerating the decline of traditional banking. The stat that got me: only 4% of new checking accounts come from existing bank customers, down from 25% in 2018. And COBOL still powers 40% of core banking systems. I had to code in COBOL during my first internship in college. The fact that it's still running the financial system is wild. The argument is that the gap between legacy batch-processing architectures and what AI-native businesses need is architectural, not cosmetic. I wanted to understand how the infrastructure underneath actually works. Not the apps. The rails, the ledgers, the compliance layer. So I'm building one.

## What

A neobank-style payment ledger built against real APIs.

**Milestone 1: Double-Entry Ledger**
- Virtual accounts (merchant and consumer)
- Debit/credit transactions with idempotency keys
- Balance checks and reconciliation

**Milestone 2: Payment Rails**
- Stripe sandbox for ACH simulation, card payments, real-time transfers
- Webhook handling for async settlement events
- Transaction state machine (pending, authorized, settled, reconciled)

**Milestone 3: Compliance and Fraud**
- KYC verification flow
- Real-time transaction risk scoring using scikit-learn (score every transaction before it clears)
- Anomaly detection model (isolation forest) to catch unusual account behavior
- Velocity checks on top of model output
- Train on transaction history from Milestones 1 and 2

**Milestone 4: Multi-Platform Simulation**
- Merchant accounts, consumer accounts, refund deposit flows
- Internal transfers (same pool, ledger-only, instant, free)
- External transfers (ACH, card network, simulated settlement delay)

## How I'm Learning

I'm using Claude Code as a teacher. It explains payments concepts interactively, tests my understanding, and we build together. Each session covers domain knowledge and hands-on coding. I document what I learn as I go.

## Tech Stack

- **Python / FastAPI** — API layer
- **Stripe Sandbox** — Payment processing (real APIs, test mode)
- **SQLite** — Ledger storage (upgradeable to Postgres)
- **scikit-learn / pandas** — Transaction risk scoring and anomaly detection

## Session Log

Progress tracked here as I build.
