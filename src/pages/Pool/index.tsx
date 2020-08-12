import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { Pair } from 'dxswap-sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

import Question from '../../components/QuestionHelper'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, TYPE } from '../../theme'
import { Text } from 'rebass'
import { LightCard } from '../../components/Card'
import { RowBetween } from '../../components/Row'
import { ButtonPrimary, ButtonSecondary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toDXSwapLiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import AppBody from '../AppBody'
import { Dots } from '../../components/swap/styleds'

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked DXSwap LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toDXSwapLiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [dxSwapPairsBalances, fetchingDXSwapPairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all DXSwap pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        dxSwapPairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, dxSwapPairsBalances]
  )

  const dxSwapPairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const dxSwapIsLoading =
    fetchingDXSwapPairBalances || dxSwapPairs?.length < liquidityTokensWithBalances.length || dxSwapPairs?.some(DXSwapPair => !DXSwapPair)

  const allDXSwapPairsWithLiquidity = dxSwapPairs.map(([, pair]) => pair).filter((dxSwapPair): dxSwapPair is Pair => Boolean(dxSwapPair))

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'pool'} />
        <AutoColumn gap="lg" justify="center">
          <ButtonPrimary id="join-pool-button" as={Link} style={{ padding: 16 }} to="/add/ETH">
            <Text fontWeight={500} fontSize={20}>
              Add Liquidity
            </Text>
          </ButtonPrimary>

          <AutoColumn gap="12px" style={{ width: '100%' }}>
            <RowBetween padding={'0 8px'}>
              <Text color={theme.text1} fontWeight={500}>
                Your Liquidity
              </Text>
              <Question text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below." />
            </RowBetween>

            {!account ? (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  Connect to a wallet to view your liquidity.
                </TYPE.body>
              </LightCard>
            ) : dxSwapIsLoading ? (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>Loading</Dots>
                </TYPE.body>
              </LightCard>
            ) : allDXSwapPairsWithLiquidity?.length > 0 ? (
              <>
                {allDXSwapPairsWithLiquidity.map(dxSwapPair => (
                  <FullPositionCard key={dxSwapPair.liquidityToken.address} pair={dxSwapPair} />
                ))}
              </>
            ) : (
              <LightCard padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  No liquidity found.
                </TYPE.body>
              </LightCard>
            )}

          </AutoColumn>
        </AutoColumn>
      </AppBody>
    </>
  )
}
