import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface WalletInputProps {
  onSubmit: (address: string, chain: string) => void;
}

const WalletInput: React.FC<WalletInputProps> = ({ onSubmit }) => {
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('Ethereum');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      onSubmit(address, chain);
      setAddress('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Wallet Health Check</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Wallet Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter wallet address (e.g., 0x...)"
            className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Blockchain</label>
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value)}
            className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          >
            <option value="Ethereum">Ethereum</option>
            <option value="Polygon">Polygon</option>
            <option value="Aptos">Aptos</option>
          </select>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Check Health Score
        </motion.button>
      </form>
    </motion.div>
  );
};

export default WalletInput;