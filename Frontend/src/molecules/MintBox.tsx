import { Spinner, SpinnerSize } from '@fluentui/react';
import BigDecimal from 'js-big-decimal';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useStyletron } from 'styletron-react';
import { useProofGetter } from '../api/hooks/useProofGetter';
import FadeInOut from '../atoms/FadeInOut';
import GlowButton from '../atoms/GlowButton';
import TransactionButton from '../atoms/TransactionButton';
import { useContractContext } from '../contexts/ContractContext';
import { useProvider } from '../contexts/ProviderContext';
import { useThemeContext } from '../contexts/ThemeContext';
import useCurrentTime from '../hooks/useCurrentTime';
import useMintData from '../hooks/useMintData';
import useMintTimes from '../hooks/useMintTimes';
import useNumberMinted from '../hooks/useNumberMinted';
import useWhitelisted from '../hooks/useWhitelisted';
import MintType from '../models/MintType';
import { MOBILE } from '../utilties/MediaQueries';
import { BASE, roundAndDisplay, ZERO } from '../utilties/Numbers';
import FormatTimeOffset from '../utilties/TimeFormatter';

const SelectMintBox = ({
    setMintType,
    mintType,
}: {
    setMintType: React.Dispatch<React.SetStateAction<MintType | undefined>>;
    mintType?: MintType;
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();

    const { accounts } = useProvider();

    const currentTime = useCurrentTime();

    const { data: mintTimeData, isLoading: mintTimeLoading } = useMintTimes(60);
    const { data: whitelistData, isLoading: whitelistLoading } = useWhitelisted(
        accounts?.[0]
    );

    if (mintTimeLoading || whitelistLoading)
        return <Spinner size={SpinnerSize.large} />;

    if (!mintTimeData) return <div>Error Loading...</div>;

    const { private: privateMint, public: publicMint } = mintTimeData;
    const { start: publicStart } = publicMint;
    const { start: privateStart, end: privateEnd } = privateMint;

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
            })}
        >
            <GlowButton
                disabled={
                    !whitelistData?.isWhitelisted ||
                    privateStart > currentTime ||
                    privateEnd <= currentTime
                }
                className={css({ margin: '2px' })}
                innerclass={css({ minHeight: '70px', padding: '10px' })}
                onClick={(): void => setMintType(MintType.Private)}
            >
                <div>
                    <div className={css({ fontSize: '30px' })}>
                        Whitelist Mint
                    </div>
                    {privateStart > currentTime && (
                        <div
                            className={css({
                                fontFamily: theme.fonts.body,
                                fontSize: '10px',
                                lineHeight: 'normal',
                            })}
                        >
                            {whitelistData?.isWhitelisted
                                ? FormatTimeOffset(privateStart - currentTime)
                                : 'Not Eligible'}
                        </div>
                    )}
                    {privateEnd > currentTime && privateStart <= currentTime && (
                        <div
                            className={css({
                                fontFamily: theme.fonts.body,
                                lineHeight: 'normal',
                                fontSize: '10px',
                            })}
                        >
                            {whitelistData?.isWhitelisted
                                ? `${FormatTimeOffset(
                                      privateEnd - currentTime
                                  )} Remaining`
                                : 'Not Eligible'}
                        </div>
                    )}
                    {privateEnd < currentTime && (
                        <div
                            className={css({
                                fontFamily: theme.fonts.body,
                                fontSize: '10px',
                            })}
                        >
                            Ended
                        </div>
                    )}
                </div>
            </GlowButton>
            <GlowButton
                className={css({ margin: '2px' })}
                disabled={!publicStart || publicStart >= currentTime}
                innerclass={css({ minHeight: '70px', padding: '10px' })}
                onClick={(): void => setMintType(MintType.Public)}
            >
                <div>
                    <div className={css({ fontSize: '30px' })}>Public Mint</div>
                    {publicStart > currentTime && (
                        <div
                            className={css({
                                fontFamily: theme.fonts.body,
                                fontSize: '10px',
                            })}
                        >
                            {FormatTimeOffset(publicStart - currentTime)}
                        </div>
                    )}
                </div>
            </GlowButton>
        </div>
    );
};

const ActiveMintBox = ({
    setMintType,
    mintType,
    onBack,
}: {
    setMintType: React.Dispatch<React.SetStateAction<MintType | undefined>>;
    mintType: MintType;
    onBack: () => void;
}): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const { accounts } = useProvider();

    // requests
    const { data: mintTimeData, isLoading: mintTimeDataLoading } =
        useMintTimes(60);
    const { data: mintData, isLoading: mintDataLoading } = useMintData();
    const { data: numMinted, isLoading: numMintedLoading } = useNumberMinted(
        mintType,
        accounts?.[0]
    );

    const { tokenContract } = useContractContext();
    const [amount, setAmount] = React.useState(1);

    const currentTime = useCurrentTime();

    const disabled = React.useMemo(() => {
        if (!mintData || numMinted === undefined) return true;
        const { maxPerWallet } = mintData;

        return numMinted >= maxPerWallet;
    }, [mintData, numMinted]);

    const proofGetter = useProofGetter();

    const transactionCost = React.useMemo(() => {
        if (!mintData) return ZERO;
        const { mintPrice } = mintData;

        if (!mintPrice) return ZERO;
        return mintPrice.multiply(new BigDecimal(amount));
    }, [amount, mintData]);

    const value = React.useMemo(() => {
        return transactionCost.multiply(BASE).getValue();
    }, [transactionCost]);

    const queryClient = useQueryClient();

    if (mintDataLoading || mintTimeDataLoading || numMintedLoading)
        return (
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    flex: '1',
                    width: '100%',
                })}
            >
                <Spinner size={SpinnerSize.large} />
            </div>
        );

    if (!mintTimeData || !mintData)
        return (
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    flex: '1',
                    width: '100%',
                })}
            >
                Error loading...
            </div>
        );

    const { private: privateMint } = mintTimeData;
    const { end: privateEnd } = privateMint;

    const { maxPerWallet } = mintData;

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                flex: '1',
                width: '100%',
            })}
        >
            <div className={css({ margin: '10px' })}>
                <div
                    className={css({
                        fontFamily: theme.fonts.title,
                        fontSize: '35px',
                        textAlign: 'center',
                    })}
                >
                    {mintType === MintType.Private ? 'Whitelist' : 'Public'}{' '}
                    Mint
                </div>

                <div
                    className={css({
                        fontFamily: theme.fonts.body,
                        textAlign: 'center',
                        fontSize: '12px',
                    })}
                >
                    {mintType === MintType.Private && privateEnd && (
                        <div>
                            {FormatTimeOffset(privateEnd - currentTime)}{' '}
                            Remaining
                        </div>
                    )}
                    <div>
                        Max {maxPerWallet} Per Wallet | You&apos;ve Minted{' '}
                        {numMinted}
                    </div>
                </div>
            </div>
            <div
                className={css({
                    margin: 'auto 10px 10px 10px',
                    display: 'flex',
                })}
            >
                <GlowButton
                    onClick={onBack}
                    className={css({ minHeight: '60px' })}
                >
                    Back
                </GlowButton>
                {tokenContract && mintType === MintType.Public && (
                    <TransactionButton
                        disabled={!accounts?.[0] || disabled}
                        contract={tokenContract}
                        method="mint"
                        params={[1]}
                        tx={{ from: accounts?.[0], value }}
                        onTransact={(tx): void => {
                            tx.then((): void => queryClient.clear());
                        }}
                        className={css({
                            flex: '1',
                            minHeight: '60px !important',
                            fontSize: '20px !important',
                        })}
                    >
                        Mint {amount} ({roundAndDisplay(transactionCost)} ETH)
                    </TransactionButton>
                )}
                {tokenContract && mintType === MintType.Private && (
                    <TransactionButton
                        disabled={!accounts?.[0] || disabled}
                        contract={tokenContract}
                        method="premint"
                        onTransact={(tx): void => {
                            tx.then((): void => queryClient.clear());
                        }}
                        params={async (): Promise<[number, string[]]> => [
                            1,
                            await proofGetter(accounts?.[0] as string),
                        ]}
                        tx={{ from: accounts?.[0], value }}
                        className={css({
                            flex: '1',
                            minHeight: '60px !important',
                            fontSize: '20px !important',
                        })}
                    >
                        Mint {amount} ({roundAndDisplay(transactionCost)} ETH)
                    </TransactionButton>
                )}
            </div>
        </div>
    );
};

export const MintBox = (): JSX.Element => {
    const [css] = useStyletron();
    const theme = useThemeContext();
    const [mintType, setMintType] = React.useState<MintType>();
    const [showMintStuffs, setShowMintStuffs] = React.useState(false);

    return (
        <div
            className={css({
                background: theme.backgroundGradients.purpleBlue,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                minHeight: '200px',
                minWidth: '350px',
                color: theme.fontColors.light.toRgbaString(1),
                [MOBILE]: {
                    minWidth: 'unset',
                    width: '80%',
                },
            })}
        >
            <FadeInOut
                visible={mintType === undefined}
                onExited={(): void => setShowMintStuffs(true)}
                onEnter={(): void => setShowMintStuffs(false)}
            >
                <SelectMintBox setMintType={setMintType} mintType={mintType} />
            </FadeInOut>
            <FadeInOut
                visible={showMintStuffs && mintType !== undefined}
                onExited={(): void => {
                    setShowMintStuffs(false);
                    setMintType(undefined);
                }}
            >
                <ActiveMintBox
                    setMintType={setMintType}
                    mintType={mintType as MintType}
                    onBack={(): void => setShowMintStuffs(false)}
                />
            </FadeInOut>
        </div>
    );
};

export default MintBox;
