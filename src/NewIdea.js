import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";

const NewIdea = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [c3, setC3] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
           {" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(name, summary, description, price, c1, c2, c3);
    setStatus(status);
    if (success) {
      setName("");
      setSummary("");
      setDescription("");
      setPrice("");
      setC1("");
      setC2("");
      setC3("");
    }
  };

  return (
  <div className="new-idea">
    <h1 id="title">New Idea</h1>

    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <form>
      <h2>Name: </h2>
      <input
        type="text"
        placeholder="e.g. Parlay"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>Summary: </h2>
      <input
        type="text"
        placeholder="e.g. A platform that lets people monetize ideas"
        onChange={(event) => setSummary(event.target.value)}
      />
      <h2>Description: </h2>
      <textarea id="description"
        placeholder="e.g. Parlay would allow people to collaborate and purchase other people’s ideas, concepts, and philosophies. This would include ideas for services, products, organizations, or just philosophy in general. Collaboration on ideas would be rewarded with a royalty on the idea in perpetuity. This would activate when the idea first sells."
        onChange={(event) => setDescription(event.target.value)}
      />
      <h2>Price: </h2>
      <input
        type="text"
        placeholder="e.g. .01 Eth"
        onChange={(event) => setPrice(event.target.value)}
      />
      <h2>Category 1: </h2>
      <select onChange={(event) => setC1(event.target.value)}>
        <option disabled selected value> -- select an option -- </option>
        <option>Science </option>
        <option>Tech </option>
        <option>Engineering </option>
        <option>Arts </option>
        <option>Business </option>
        <option>Lifestyle </option>
        <option>Wellness </option>
        <option>Entertainment </option>
        <option>Other </option>
      </select>
      <h2>Category 2: </h2>
      <input
        type="text"
        placeholder="e.g. Crypto"
        onChange={(event) => setC2(event.target.value)}
      />
      <h2>Category 3: </h2>
      <input
        type="text"
        placeholder="e.g. E-Commerce"
        onChange={(event) => setC3(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status" style={{ color: 'blue' }}>
      {status}
    </p>
  </div>
);
}

export default NewIdea;
