import React, { useState } from "react";
import Lottie from "lottie-react";
import { ethers } from "ethers";
import blockchainAnim from "./assets/blockchain.json"; // Lottie animation
import logo from "./assets/logo.jpg"; // Logo image

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletInfoVisible, setWalletInfoVisible] = useState(false);
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address);

        const balanceBigInt = await provider.getBalance(address);
        setBalance(ethers.formatEther(balanceBigInt));

        const networkInfo = await provider.getNetwork();
        setNetwork(networkInfo.name);
      } catch (error) {
        console.error("User rejected the connection", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-xl px-6 py-4 flex justify-between items-center backdrop-blur-md border-b border-blue-500">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-md" />
          <h1 className="text-2xl font-extrabold text-blue-400 hover:text-pink-500 transition-all duration-300">Pixelity Technologies</h1>
        </div>
        <div className="space-x-6 text-sm hidden md:flex">
          {['Home', 'About', 'Services', 'Projects', 'Team', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group transition-all duration-300"
            >
              <span className="text-gray-300 group-hover:text-blue-400">{item}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4 relative">
          {walletAddress ? (
            <div
              className="text-sm text-green-400 font-mono cursor-pointer hover:scale-105 transition"
              onMouseEnter={() => setWalletInfoVisible(true)}
              onMouseLeave={() => setWalletInfoVisible(false)}
            >
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              {walletInfoVisible && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 p-4 rounded-lg shadow-lg text-left z-50 border border-blue-500">
                  <p><strong>Address:</strong> {walletAddress}</p>
                  <p><strong>Balance:</strong> {balance} ETH</p>
                  <p><strong>Network:</strong> {network}</p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white text-sm px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Hero Section */}
      <header className="flex flex-col justify-center items-center text-center py-24 px-4 bg-gradient-to-r from-blue-800 to-indigo-900">
        <h2 className="text-5xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 animate-text">Empowering the Future with Blockchain</h2>
        <p className="text-lg max-w-3xl mb-6 text-gray-300 hover:text-white transition-all duration-300">
          Pixelity Technologies is revolutionizing crypto solutions using Bitcoin, blockchain infrastructure, and Web3 integrations for next-gen financial systems.
        </p>
        <button className="bg-gradient-to-br from-blue-600 to-purple-600 px-8 py-3 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg">
          Learn More
        </button>
        {/* Lottie Animation */}
        <div className="w-full max-w-xl mt-12 animate-bounce-slow">
          <Lottie animationData={blockchainAnim} loop={true} />
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 px-6 text-center">
        <h3 className="text-4xl font-bold mb-6 text-pink-400">About Us</h3>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg">
          Pixelity Technologies is a leading crypto-tech company focused on secure Bitcoin transactions, blockchain-based applications, and decentralized ecosystem development. We are passionate about transforming digital finance for the future.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-800 text-center">
        <h3 className="text-4xl font-bold mb-6 text-blue-300">Our Services</h3>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {["Crypto Wallet Integration", "Bitcoin APIs", "Blockchain Audits", "Smart Contracts", "Web3 Integration", "Consulting"].map((service, index) => (
            <div key={index} className="p-8 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-blue-400 transition duration-300 transform hover:scale-105">
              <h4 className="text-2xl font-bold mb-2 text-blue-400">{service}</h4>
              <p className="text-gray-300">{`Learn more about ${service.toLowerCase()}`}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 text-center">
        <h3 className="text-4xl font-bold mb-6 text-green-400">Featured Projects</h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-green-400 transition-transform hover:scale-105">
            <h4 className="text-xl font-bold mb-2 text-blue-300">Decentralized Voting App</h4>
            <p>A secure on-chain voting platform built on Ethereum smart contracts.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-pink-400 transition-transform hover:scale-105">
            <h4 className="text-xl font-bold mb-2 text-blue-300">Pixelity Wallet</h4>
            <p>A cross-platform wallet for Bitcoin and Ethereum with NFT support.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6 bg-gray-800 text-center">
        <h3 className="text-4xl font-bold mb-6 text-yellow-300">Our Team</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Ayush Parmar", "Riya Shah", "Kunal Patel"].map((name, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-yellow-300 transition-all duration-300 transform hover:-translate-y-2">
              <h4 className="text-xl font-bold text-blue-400">{name}</h4>
              <p>{["Full Stack & Blockchain Developer", "UI/UX Designer", "Smart Contract Auditor"][index]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 text-center">
        <h3 className="text-4xl font-bold mb-6 text-purple-400">Get in Touch</h3>
        <p className="mb-2 hover:text-blue-400 transition">Email: <span className="text-blue-400">contact@pixelity.tech</span></p>
        <p className="hover:text-blue-400 transition">Phone: <span className="text-blue-400">+91 98765 43210</span></p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-500 border-t border-gray-700">
        &copy; 2025 Pixelity Technologies. Built in 2 hours. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
