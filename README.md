# K9 Cloners Pet Shop

Example NextJS app with Stripe

## Getting Started

Set up your environment variables:

```bash
cp .env.local.example .env.local
vim .env.local
```

Start a Redis container:

```bash
docker run --rm -p 6379:6379 --name k9cloner-redis redis
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to buy some puppies.
