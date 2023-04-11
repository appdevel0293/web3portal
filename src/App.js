import './App.css';
import Web3 from 'web3';

function App() {

  var account_client = null;

  


  var phantomProviderEVM = null;

  const quicknodeRPCConfig = {
    chainId: '0x13881',
    chainName: 'Polygon',
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    nativeCurrency: {symbol: 'MATIC', decimals: 18},
    rpcUrls: ['https://red-multi-valley.matic-testnet.discover.quiknode.pro/61b21728fa928158390362bfe247eab7ee8c68e7/'],
  };

  const isPhantomInstalled = window?.phantom?.ethereum?.isPhantom;
  console.log(isPhantomInstalled);


  const getProvider = async () => {
    
    if (!isPhantomInstalled) {
      window.open('https://phantom.app/', '_blank');
      return;
    }
      
      const anyWindow = window;
      const provider = anyWindow.phantom?.ethereum;
      
     
      if (provider) {
         provider.request({
          method: 'eth_requestAccounts'
        }).then((accounts) => {
          
          account_client = accounts[0];

          provider.request({
            method: 'wallet_switchEthereumChain',
            params: [quicknodeRPCConfig]
          }).then(() => {
            
            console.log(account_client);

            if(phantomProviderEVM===null){
              phantomProviderEVM = provider;
              console.log("asignProvider",phantomProviderEVM);
            }
            

          }).catch((error) => {
            console.error(error);
          });

        }).catch((error) => {
          console.error(error);
        });
      }
    
  };
  
  getProvider();
  
  
  async function testingtx () {
    console.log("send tx",account_client);
    console.log("phantomprovider=>",phantomProviderEVM);
    let web3 = new Web3(phantomProviderEVM); 
    const result = await phantomProviderEVM.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: account_client,
          to: '0x75e01f1Ebd58302B5b67e67825fa6917749b5896',
          value: web3.utils.toHex(web3.utils.toWei('0.001', 'gwei')),
          gasLimit: web3.utils.toHex(web3.utils.toWei('0.001', 'gwei')),
          gasPrice: web3.utils.toHex(web3.utils.toWei('0.001', 'gwei')),
        },
      ],
    });

    console.log("result_tx=>",result);
  }

  return (
    
    <div className="App">
      <header className="App-header">
        <p>
          WELCOME TO WEB3 PORTAL
        </p>
        <button onClick={testingtx} >Send TX </button>
      </header>
    </div>
  );
}

export default App;
