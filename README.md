# Vault Activity Dashboard

A React component that displays AI-managed vault activities in real-time. This component is designed to visualize transaction history and activities in a DeFi vault.

## Features

- Real-time activity updates that simulate AI-managed transactions
- Filter transactions by type (All, Swap, Add Liquidity, Remove Liquidity)
- Responsive design that works on desktop and mobile
- Visual indication that the AI vault is running
- Dynamic data simulation with randomized values
- Token pair support for DEEP-SUI, SUI-USDC, and CETUS-SUI

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The app will be available at http://localhost:3000

## Usage

Import the VaultActivity component in your React application:

```jsx
import VaultActivity from './VaultActivity';

function App() {
  return (
    <div>
      <VaultActivity />
    </div>
  );
}
```

## Technologies

- React
- Styled Components
- Font families: DM Sans and IBM Plex Mono

## Customization

The component can be customized by modifying the styled components and the data generation logic in the `VaultActivity.jsx` file.

- Change colors and styles in the styled components
- Modify the token pairs in the `tokenPairs` array
- Adjust the update interval (currently set to 5 seconds)
- Add additional transaction types beyond swap, add, and remove

## License

MIT 