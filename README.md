# Weather App - Svelte

A modern, responsive weather application built with SvelteKit, TypeScript, and Tailwind CSS. Get current weather conditions and 7-day forecasts for cities worldwide.

## Features

- 🌤️ **Current Weather**: Real-time temperature, wind speed, and humidity
- 📅 **7-Day Forecast**: Extended weather predictions with min/max temperatures
- 🔍 **City Search**: Search and select cities globally with autocomplete
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Dynamic Backgrounds**: Weather-appropriate background images
- ⚡ **Fast Performance**: Built with modern Svelte 5 and optimized APIs
- 🧪 **Well Tested**: Comprehensive unit tests with Vitest

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) with Svelte 5
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **UI Components**: [shadcn/ui for Svelte](https://www.shadcn-svelte.com/) for accessible components
- **APIs**: 
  - [Open-Meteo Weather API](https://open-meteo.com/) for weather data
  - [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) for city search
- **Testing**: [Vitest](https://vitest.dev/) with unit tests

## Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (buttons, dialogs, etc.)
│   │   ├── Header.svelte
│   │   ├── SearchInput.svelte
│   │   ├── CurrentWeather.svelte
│   │   └── ForecastWeather.svelte
│   │   └── WeatherCard.svelte
│   │   └── WeatherLocation.svelte
│   ├── services/           # API services
│   │   ├── weather.ts
│   │   └── geocoding.ts
│   ├── stores/             # Svelte stores for state management
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── routes/                 # SvelteKit routes
└── static/                 # Static assets (fonts, images, icons)
    ├── backgrounds/        # Weather background images
    └── weather/           # Weather condition icons
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/weather-app-svelte.git
   cd weather-app-svelte
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start development server**
   ```sh
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```sh
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run check        # Type check with svelte-check
```

## Usage

1. **Search for a city**: Use the search input in the header to find any city worldwide
2. **View current weather**: See real-time temperature, wind speed, and humidity
3. **Check forecast**: Browse the 7-day weather forecast with daily highs and lows
4. **Responsive experience**: The app adapts to your device screen size

## API Integration

This app uses the free [Open-Meteo APIs](https://open-meteo.com/):

- **Weather API**: Provides current conditions and forecasts
- **Geocoding API**: Enables city search and location data
- **No API key required**: Open-Meteo offers free access without registration

## Testing

The project includes comprehensive unit tests:

```sh
npm run test                    # Run all tests
npm run test src/lib/services   # Test specific directory
npm run test weather.test.ts    # Test specific file
```

Test coverage includes:
- API services ([weather.test.ts](src/lib/services/weather.test.ts), [geocoding.test.ts](src/lib/services/geocoding.test.ts))
- Utility functions ([weatherUtils.test.ts](src/lib/utils/weatherUtils.test.ts), [formatUtils.test.ts](src/lib/utils/formatUtils.test.ts))
- Edge cases and error handling

## Building for Production

```sh
npm run build
```

The built app will be in the `build/` directory, ready for deployment to any static hosting provider.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Weather icons sourced from external providers and stored locally
- Built with [SvelteKit](https://kit.svelte.dev/)
