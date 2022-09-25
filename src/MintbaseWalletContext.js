import { Chain, Network, Wallet } from 'mintbase';
import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useContext,
    useCallback,
    useMemo,
} from 'react';
import { WalletKeys } from './constants';


export const WalletContext = createContext({
    wallet: undefined,
    details: {
        accountId: '',
        balance: '',
        allowance: '',
        contractName: '',
    },
    isConnected: false,
    loading: true,
    signIn: () => Promise.resolve(),
    signOut: () => null,
});

export function WalletProvider({
    network = Network.testnet,
    chain,
    apiKey,
    children,
}) {
    const [walletInfo, setWallet] = useState();

    const [details, setDetails] = useState({
        accountId: '',
        balance: '',
        allowance: '',
        contractName: '',
    });


    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    const initWallet = useCallback(async () => {
        const accountId = "";
        const nearKeystore = `near-api-js:keystore:${accountId}:${network}`;

        if (
            accountId
            && localStorage.getItem(nearKeystore)
            && localStorage.getItem(WalletKeys.AUTH_KEY)
        ) {
            localStorage.removeItem(WalletKeys.AUTH_KEY);
            localStorage.removeItem(nearKeystore);
        }

        const { data: walletData, error } = await new Wallet().init({
            networkName: network ?? Network.testnet,
            chain,
            apiKey,
        });

        if (error) {
            console.error(error);
            return;
        }

        const { wallet, isConnected } = walletData;

        setWallet(wallet);

        if (isConnected) {
            try {
                const { data: detailsData } = await wallet.details();
                setDetails(detailsData);
                setConnected(true);
            } catch (err) {
                console.error(err);
            }
        }
        setLoading(false);
    }, [apiKey, chain, network]);

    const signIn = useCallback(async () => {
        console.log("walletInfo", walletInfo);
        if (!walletInfo) {
            return;
        }
        await walletInfo.connect({ requestSignIn: true });
    }, [walletInfo]);

    const signOut = useCallback(async () => {
        if (!walletInfo) {
            return;
        }
        walletInfo.disconnect();

        window.location.reload();
    }, [walletInfo]);

    useEffect(() => {
        initWallet();
    }, [initWallet, network]);

    const walletContextData = useMemo(() => {
        const obj = {
            wallet: walletInfo,
            details,
            isConnected: connected,
            signIn,
            signOut,
            loading,
        };

        return obj;
    }, [connected, details, loading, signIn, signOut, walletInfo]);

    return (
        <WalletContext.Provider value={walletContextData}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);