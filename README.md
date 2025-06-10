# MultiChain HealthAI

A decentralized application (dApp) that computes a wallet health score based on activity, diversification, profitability, and security behaviors across Ethereum, Polygon, and Aptos — with AI-generated explanations for each metric.

MultiChain HealthAI leverages **Nodit’s Web3 Data API** and **Model Context Protocol (MCP)** to deliver an AI-powered, multi-chain wallet analytics platform. The app features a sleek, animated front end using **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, providing an engaging user experience.

---

## 📑 Table of Contents

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

---

## 🚀 Project Overview

**MultiChain HealthAI** is a decentralized application that analyzes a wallet’s health across multiple blockchains (Ethereum, Polygon, and Aptos). It computes a health score based on four key metrics:

- **Activity**: Transaction frequency and recency.
- **Diversification**: Variety of tokens and asset types.
- **Profitability**: Total profit and return on investment (ROI).
- **Security**: Use of multi-sig wallets and absence of suspicious behavior.

Using **Nodit’s Web3 Data API**, the app fetches on-chain data. **Nodit’s MCP** powers AI-driven analysis that generates natural language explanations for each metric.

---

## 🌟 Features

- 🔗 **Multi-Chain Wallet Analysis**: Ethereum, Polygon, Aptos support
- 📊 **Health Score Calculation**: Score from 0–100 based on key metrics
- 🤖 **AI-Generated Insights**: Powered by Nodit MCP
- 🎨 **Interactive UI**: Animated and responsive UI with Tailwind & Framer Motion
- 🔍 **Wallet Input Form**: Input wallet + chain selector
- 🧪 **Mock Data Integration**: Simulated data for testing with placeholders for Nodit API calls

---

## 🧰 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion  
- **API Integration**: Axios  
- **Blockchain & Data**: Nodit (Web3 Data API, MCP)  
- **Supported Chains**: Ethereum, Polygon, Aptos  
- **Build Tools**: Create React App, npm  
- **Environment**: Node.js  

---

## 🔌 Nodit Integration

### Web3 Data API

Fetches structured blockchain data for wallet analysis. Example:

```bash
curl --request POST \
  --url https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount \
  --header 'X-API-KEY: <your-api-key>' \
  --data '{"accountAddress": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", "fromDate": "2025-01-01T00:00:00+00:00", "toDate": "2025-06-10T00:00:00+00:00"}'
````

### Model Context Protocol (MCP)

Enables AI-driven score generation using LLMs:

```json
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
```

> **Note**: The current implementation uses mock data. To enable live data, configure your Nodit API key in the `.env` file.

---

## ⚙️ Getting Started

### Prerequisites

* **Node.js**: v18+
* **npm**: v8+
* **Nodit API Key**: [Sign up at nodit.io](https://nodit.io)

### Installation

Clone the repository:

```bash
git clone https://github.com/Wadill/MultiChain-HealthAI.git
cd multichain-healthai
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
REACT_APP_NODIT_API_KEY=your-api-key-here
```

### Running the App

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧪 Usage

1. **Input Wallet Details**
   Enter a wallet address and select a blockchain.

2. **Check Health Score**
   Click “Check Health Score” to compute the analysis.

3. **View Results**

   * Health score (0–100)
   * Activity, diversification, profitability, security breakdowns
   * AI-generated explanations (simulated)

4. **Integrate Live API**
   Modify `src/App.tsx` (`fetchWalletData`) to replace mock data with real API calls.

---


## 🔮 Future Enhancements

* ✅ **Live API Integration**: Use real-time data from Nodit
* 🧠 **Advanced AI**: Connect to LLMs like Claude via MCP
* 🚨 **Error Handling**: Add toast notifications for invalid wallets or API errors
* 🎨 **Enhanced UI Effects**: Hover and transition animations
* 🚀 **Deployment**: Deploy to IPFS, Vercel, or other platforms
* 🔁 **Expanded Chains**: Add XRPL, Bitcoin, etc.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo

2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit and push:

   ```bash
   git commit -m "Add your feature"
   git push origin feature/your-feature
   ```

4. Open a pull request

> Please follow project TypeScript and ESLint standards.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
