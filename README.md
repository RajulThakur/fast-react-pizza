# Fast React Pizza Co. 🍕

A modern React application for ordering pizzas online with real-time order tracking and location-based delivery.

## Features

- 🛒 Real-time cart management with Redux
- 📍 Geolocation-based delivery address detection
- 🔍 Order tracking and search functionality
- 💳 Priority ordering options
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Frontend Framework:** React 18
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Form Handling:** React Router Form Actions
- **API Integration:** REST APIs

## Getting Started

1. Clone the repository:

```bash
git clone [your-repo-url]
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Project Structure

- `/src`
  - `/features` - Feature-based modules (cart, menu, order, user)
  - `/services` - API services and external integrations
  - `/ui` - Reusable UI components
  - `/utils` - Helper functions and utilities

## Key Features Explained

### Cart Management
- Add/remove items
- Update quantities
- Calculate totals
- Priority ordering options

### User Experience
- Real-time order status
- Location-based delivery
- Responsive design
- Form validation
- Loading states

### Menu Management
- Dynamic menu loading
- Item availability status
- Price calculations
- Ingredient listings

## API Integration

The application integrates with:
- Restaurant API for menu and orders
- Geocoding API for address detection

## Acknowledgments

- Built with React + Vite
- Styled with Tailwind CSS
- State managed with Redux Toolkit
- Icons and UI components from various open-source projects
