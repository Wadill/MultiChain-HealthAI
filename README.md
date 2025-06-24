# MultiChain HealthAI

**A decentralized application (dApp) that computes a wallet health score based on activity, diversification, profitability, and security behaviors across Ethereum, Polygon, and Aptos, with AI-generated insights powered by Nodit’s Model Context Protocol (MCP).**

MultiChain HealthAI leverages **Nodit’s Web3 Data API** and **MCP** to deliver a multi-chain wallet analytics platform. The app features a modern, animated front end using **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, providing an engaging and intuitive user experience.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Nodit Integration](#nodit-integration)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [WaveHack/Buildathon Alignment](#wavehackbuildathon-alignment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
MultiChain HealthAI analyzes a wallet’s health across Ethereum, Polygon, and Aptos, computing a **health score** (0–100) based on:
- **Activity (30%)**: Transaction frequency and recency.
- **Diversification (25%)**: Number and variety of tokens.
- **Profitability (25%)**: Estimated profit/loss and ROI.
- **Security (20%)**: Multi-signature wallet usage and absence of suspicious activity.

The app uses **Nodit’s Web3 Data API** to fetch real-time blockchain data and **Nodit’s MCP** to generate AI-driven natural language explanations for each metric. The front end, built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, offers animated progress bars and a responsive design.

## Features
- **Multi-Chain Support**: Analyzes wallets on Ethereum, Polygon, and Aptos.
- **Dynamic Health Score**: Weighted scoring algorithm based on activity (30%), diversification (25%), profitability (25%), and security (20%).
- **AI-Driven Insights**: Natural language explanations for each metric, powered by Nodit’s MCP.
- **Engaging UI**: Animated progress bars and transitions using Framer Motion and Tailwind CSS.
- **Error Handling**: Displays user-friendly messages for invalid inputs or API errors.
- **Scalable Architecture**: Leverages Nodit’s real-time infrastructure for reliable data retrieval.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **API Integration**: Axios (for Nodit Web3 Data API)
- **Blockchain**: Nodit (Web3 Data API, MCP)
- **Supported Chains**: Ethereum, Polygon, Aptos
- **Build Tools**: Create React App, npm
- **Environment**: Node.js

## Nodit Integration
MultiChain HealthAI leverages Nodit’s platform for multi-chain data and AI capabilities:
- **Web3 Data API**: Fetches real-time data for:
  - Token transfers (activity metrics).
  - Token balances (diversification metrics).
  - Transaction history (profitability estimation).
  - Contract interactions (security analysis).
  ```bash
  curl --request POST \
    --url https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount \
    --header 'X-API-KEY: <your-api-key>' \
    --data '{"accountAddress": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "fromDate": "2025-01-01T00:00:00+00:00", "toDate": "2025-06-10T00:00:00+00:00"}'
Model Context Protocol (MCP): Processes API data to generate dynamic, AI-driven explanations (e.g., “High transaction count indicates active DeFi participation”). Example MCP configuration:
json
{
  "mcpServers": {
    "nodit": {
      "command": "npx",
      "args": ["@noditlabs/nodit-mcp-server@latest"],
      "env": {
        "NODIT_API_KEY": "<your-api-key>"
      }
    }
  }
}

Multi-Chain Scalability: Supports Ethereum, Polygon, and Aptos with Nodit’s 99.9% uptime infrastructure.
Note: The current build uses mock data for demonstration. To enable live data, configure a Nodit API key in .env.
Getting Started
Prerequisites
Node.js: Version 18 or higher
npm: Version 8 or higher
Nodit API Key: Sign up at nodit.io to obtain an API key.
Installation
Clone the Repository:
bash
https://github.com/Wadill/MultiChain-HealthAI.git
cd multichain-healthai
Install Dependencies:
bash
npm install
Configure Environment Variables:
Create a .env file in the root directory:
env
REACT_APP_NODIT_API_KEY=your-api-key-here
Running the App
Start the Development Server:
bash
npm start
Open http://localhost:3000 in your browser.
Test the App:
Enter a wallet address (e.g., 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045).
Select a blockchain (Ethereum, Polygon, or Aptos).
View the health score and AI-generated insights.
Usage
Input Wallet Details: Enter a wallet address and select a blockchain.
View Health Score: See the overall score and individual metrics (activity, diversification, profitability, security) with animated progress bars.
Read AI Insights: Review AI-generated explanations for each metric.
Enable Live Data: Uncomment Nodit API calls in src/App.tsx and provide a valid API key.
WaveHack/Buildathon Alignment
MultiChain HealthAI aligns with the buildathon’s goals:
AI + Data Analytics: Uses Nodit’s MCP to generate dynamic, AI-driven insights from blockchain data.
Multi-Chain Innovation: Queries data across Ethereum, Polygon, and Aptos using Nodit’s Web3 Data API.
Robust Scoring: Implements a weighted scoring algorithm (30% activity, 25% diversification, 25% profitability, 20% security) for comprehensive wallet analysis.
Engaging UI: Features animated progress bars and a responsive design with Tailwind CSS and Framer Motion.
Scalability: Leverages Nodit’s real-time, high-uptime infrastructure for reliable performance.
Future Enhancements
Live API Integration: Fully implement Nodit’s Web3 Data API for real-time data.
Advanced AI: Integrate an LLM (e.g., Claude) via Nodit’s MCP for richer insights.
Enhanced Metrics: Add metrics like DeFi participation or NFT rarity scores.
UI Improvements: Add hover animations and toast notifications for errors.
Deployment: Host on IPFS, Vercel, or Netlify for public access.
Expanded Chains: Support additional Nodit-compatible chains (e.g., XRPL, Bitcoin).
Contributing
Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
License
MIT License. See LICENSE for details.
Built with ❤️ for the WaveHack/Buildathon by [Your Name/Team Name].
Contact: [your-email@example.com (mailto:your-email@example.com)]

---

### Steps to Implement and Test
1. **Resolve `TS2746` Error**:
   - Replace `src/components/HealthScoreCard.tsx` with the updated version.
2. **Integrate Nodit APIs**:
   - Replace `src/App.tsx` with the updated version.
   - Sign up at [nodit.io](https://nodit.io) to get an API key.
   - Add the key to `.env`:
     ```env
     REACT_APP_NODIT_API_KEY=your-api-key-here
     ```
   - Uncomment the API calls in `fetchWalletData` and test with a valid wallet address (e.g., `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`).
3. **Update README**:
   - Replace `README.md` with the updated version, customizing placeholders (e.g., repository URL, contact info).
4. **Verify Dependencies**:
   - Ensure `package.json` includes:
     ```json
     {
       "dependencies": {
         "react": "^18.2.0",
         "react-dom": "^18.2.0",
         "framer-motion": "^11.2.0",
         "axios": "^1.6.8"
       },
       "devDependencies": {
         "typescript": "^4.9.5",
         "tailwindcss": "^3.4.1",
         "postcss": "^8.4.31",
         "autoprefixer": "^10.4.16"
       }
     }
     ```
   - If issues persist, clear dependencies:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```
5. **Run and Test**:
   - Start the app:
     ```bash
     npm start
     ```
   - Test with a wallet address and each chain (Ethereum, Polygon, Aptos).
   - Verify health scores, explanations, and error messages display correctly.


- **Clearer Nodit Integration**: The updated `App.tsx` includes Nodit API calls (commented out for testing) and simulates MCP-driven explanations, with clear instructions in the README.
- **Enhanced Scoring Metrics**: The new `calculateHealthScore` function uses a weighted algorithm with dynamic thresholds, making the scoring more robust and distinctive.
- **Alignment with Nodit’s Services**: The app leverages Nodit’s multi-chain APIs and MCP, emphasizing scalability and AI capabilities in the README and code comments.

---

### Next Steps
- **Test API Integration**: Use a valid Nodit API key to test live data retrieval.
- **Add Animations**: Introduce hover effects on score cards:
  ```tsx
  <motion.div whileHover={{ scale: 1.02 }} ... />
Enhance Error UI: Use a library like react-toastify for toast 

notifications:
bash
npm install react-toastify


