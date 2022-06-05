import { useState } from "react";

function Button() {
  const [metamaskAccount, setMetamaskAccount] = useState(null);

  const handleMetamaskAccount = (accounts) => {
    if (accounts.length > 0) {
      setMetamaskAccount(accounts[0]);
      console.log(accounts[0]);
    } else {
      setMetamaskAccount(null);
      alert("No metamask account found or is disconnected.");
    }
  };

  const enableMetamask = () => {
    if (metamaskAccount !== null) {
      alert("Metamask account is already connected.");
      return;
    }
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((response) => {
          handleMetamaskAccount(response);
        })
        .catch((error) => {
          console.log(error);
        });

      window.ethereum.on("accountsChanged", (accounts) => {
        handleMetamaskAccount(accounts);
      });
    } else {
      alert("Please install MetaMask.");
    }
  };

  return (
    <div className="button">
      <button className="metamask-button" onClick={() => enableMetamask()}>
        {metamaskAccount === null ? "Enable Metamask" : "Metamask Enabled"}
      </button>
    </div>
  );
}

export default Button;
