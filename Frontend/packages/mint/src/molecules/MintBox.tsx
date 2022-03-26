import { Spinner, SpinnerSize } from '@fluentui/react';
import {
    FormatTimeOffset,
    ZERO,
    BASE,
    roundAndDisplay,
    MOBILE,
    useProvider,
    useThemeContext,
    GlowButton,
    useCurrentTime,
    FadeInOut,
} from '@gac/shared';
import BigDecimal from 'js-big-decimal';
import React from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useStyletron } from 'styletron-react';
import { useProofGetter } from '../api/hooks/useProofGetter';
import { TransactionButton } from '../atoms/TransactionButton';
import { useContractContext } from '../contexts/ContractContext';
import { useMintData } from '../hooks/useMintData';
import { useMintTimes } from '../hooks/useMintTimes';
import { useNumberMinted } from '../hooks/useNumberMinted';
import { useWhitelisted } from '../hooks/useWhitelisted';
import { MintType } from '../models/MintType';

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

    const { data: mintTimeData, isLoading: mintTimeLoading } = useMintTimes();
    const { data: whitelistData, isLoading: whitelistLoading } = useWhitelisted(
        accounts?.[0]
    );

    if (mintTimeLoading || whitelistLoading)
        return <Spinner size={SpinnerSize.large} />;

    if (!mintTimeData) return <div>Error Loading...</div>;

    const { private: privateMint, public: publicMint } = mintTimeData;
    const { start: publicStart } = publicMint;
    const {
        start: privateStart,
        end: privateEnd,
        reset: privateReset,
    } = privateMint;

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
                innerclass={css({ minHeight: '70px', padding: '20px' })}
                onClick={(): void => setMintType(MintType.Private)}
            >
                <div>
                    <div
                        className={css({
                            fontSize: '30px',
                            fontFamily: theme.fonts.buttons,
                        })}
                    >
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
                    {privateStart <= currentTime && privateReset > currentTime && (
                        <div
                            className={css({
                                fontFamily: theme.fonts.body,
                                fontSize: '10px',
                                lineHeight: 'normal',
                            })}
                        >
                            {whitelistData?.isWhitelisted
                                ? `${FormatTimeOffset(
                                      privateReset - currentTime
                                  )} Until Reset`
                                : 'Not Eligible'}
                        </div>
                    )}
                    {privateEnd > currentTime &&
                        privateStart <= currentTime &&
                        privateReset < currentTime && (
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
                disabled={publicStart >= currentTime}
                innerclass={css({ minHeight: '70px', padding: '20px' })}
                onClick={(): void => setMintType(MintType.Public)}
            >
                <div>
                    <div
                        className={css({
                            fontSize: '30px',
                            fontFamily: theme.fonts.buttons,
                        })}
                    >
                        Public Mint
                    </div>
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
        useMintTimes();
    const { data: mintData, isLoading: mintDataLoading } = useMintData();
    const { data: numMinted, isLoading: numMintedLoading } = useNumberMinted(
        mintType,
        accounts?.[0]
    );

    const { tokenContract } = useContractContext();
    const [amount] = React.useState(1);

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
                    alignItems: 'center',
                    justifyContent: 'center',
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
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '1',
                    width: '100%',
                })}
            >
                Error loading...
            </div>
        );

    const { private: privateMint, public: publicMint } = mintTimeData;
    const {
        end: privateEnd,
        start: privateStart,
        reset: privateReset,
    } = privateMint;
    const { start: publicStart } = publicMint;

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
                        fontFamily: theme.fonts.headers,
                        fontSize: '35px',
                        fontWeight: '900',
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
                    {mintType === MintType.Private &&
                        privateReset <= currentTime &&
                        privateEnd > currentTime && (
                            <div>
                                {FormatTimeOffset(privateEnd - currentTime)}{' '}
                                Remaining
                            </div>
                        )}
                    {mintType === MintType.Private &&
                        privateReset > currentTime && (
                            <div>
                                {FormatTimeOffset(privateReset - currentTime)}{' '}
                                Until Reset
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
                    className={css({
                        minHeight: '60px',
                        fontSize: '20px',
                        fontFamily: theme.fonts.buttons,
                    })}
                >
                    Back
                </GlowButton>
                {tokenContract && mintType === MintType.Public && (
                    <TransactionButton
                        disabled={!accounts?.[0] || disabled}
                        contract={tokenContract}
                        bypassError={(err): boolean => {
                            const errString = err.message;

                            // an inactive error within the first 2 minutes is probably a fluke...
                            if (
                                errString.toLowerCase().includes('inactive') &&
                                Math.abs(currentTime - publicStart) <= 120
                            ) {
                                toast(
                                    'Since the mint just began, your client might claim the transaction will fail for up to 2 minutes after mint opening (due to delays in block generation). In most scenarios, you should still be safe to mint.',
                                    { type: 'warning', position: 'bottom-left' }
                                );
                                return true;
                            }

                            return false;
                        }}
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
                            fontFamily: theme.fonts.buttons,
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
                            fontFamily: theme.fonts.buttons,
                        })}
                        bypassError={(err): boolean => {
                            const errString = err.message;

                            // an inactive error within the first 2 minutes is probably a fluke...
                            if (
                                errString.toLowerCase().includes('inactive') &&
                                Math.abs(currentTime - privateStart) <= 120
                            ) {
                                toast(
                                    'Since the mint just began, your client might claim the transaction will fail for up to 2 minutes after mint opening (due to delays in block generation). In most scenarios, you should still be safe to mint.',
                                    { type: 'warning', position: 'bottom-left' }
                                );
                                return true;
                            }

                            return false;
                        }}
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

    const { web3 } = useProvider();

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
            {!web3 && <Spinner size={SpinnerSize.large} />}
            {web3 && (
                <>
                    <FadeInOut
                        visible={mintType === undefined}
                        onExited={(): void => setShowMintStuffs(true)}
                        onEnter={(): void => setShowMintStuffs(false)}
                    >
                        <SelectMintBox
                            setMintType={setMintType}
                            mintType={mintType}
                        />
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
                </>
            )}
        </div>
    );
};

export default MintBox;
