# Banking Frontend Architecture Lab

Interactive Angular learning application showing an enterprise frontend architecture and a simple NFR sizing calculator.

## Setup

```bash
ng new banking-frontend-architecture-lab --standalone --routing --style=css
cd banking-frontend-architecture-lab
```

Replace the generated `src` folder with this project's `src` folder.

```bash
npm install
ng serve --open
```

Build:

```bash
ng build
```

## Validate

1. Change estimated concurrent users.
2. Change average API calls per user per minute.
3. Observe estimated request rate.
4. Change the availability target and observe the monthly downtime budget.
5. Review the architecture flow and frontend NFR examples.
6. Confirm the layout works on mobile and desktop.

## Formula assumptions

- Estimated average RPS = concurrent users × API calls per user per minute ÷ 60.
- Monthly downtime budget uses a 30-day month (43,200 minutes) × (1 − availability fraction).
- This is a simple planning illustration. It does not model burstiness, retries, cache hit rates, traffic distribution, backend fan-out, or peak-to-average ratios.
