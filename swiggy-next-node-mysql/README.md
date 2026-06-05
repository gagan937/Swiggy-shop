# Swiggy Next.js + Node.js + MySQL

## New update
- Any **Order Now** button opens `/order` page, no browser popup alert.
- Order page shows live delivery time based on distance.
- Type city in address like `Meerut`, `Delhi`, `Noida`, `Ghaziabad`, `Hapur` etc. ETA changes automatically.
- Confirm order saves `delivery_time`, `distance_km`, `vendor_location`, and `delivery_city` in MySQL.

## Backend run
```bash
cd backend
npm install
npm run init-db
npm start
```

## Frontend run
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
cd frontend
npm install
npm run dev
```

## Test backend
Open:
```txt
http://localhost:5000/api/health
```
