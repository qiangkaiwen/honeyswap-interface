import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import Card from '../../components/Card'
import { AutoRow } from '../../components/Row'
import { Text } from 'rebass'
import CurrencyLogo from '../../components/CurrencyLogo'
import DoubleCurrencyLogo from '../../components/DoubleLogo'
import { transparentize } from 'polished'
import { Currency } from 'dxswap-sdk'

const LightCardWrap = styled(Card)`
  border: 1px solid ${({ theme }) => transparentize(0.3, theme.bg2)};
  background-color: ${({ theme }) => transparentize(0.3, theme.bg1)};
  padding: 0.8rem;
  width: calc(25% - 6px);
  height: 96px;
  display: flex;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: calc(33% - 4px);
  `};
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: calc(50% - 4px);
  `};
`

const StyledText = styled(Text)``

interface CardProps {
  name: string
  pairs: number
  proposals?: number
  currency?: Currency
}

export const GovernanceCard = ({ name, pairs, proposals, currency }: CardProps) => {
  const theme = useContext(ThemeContext)
  const shittyCounter = 2
  return (
    <LightCardWrap>
      <AutoRow align="flex-end" justify="center">
        {shittyCounter !== 2 ? <DoubleCurrencyLogo size={26.25} /> : <CurrencyLogo size="20px" currency={currency} />}
        <Text
          width={shittyCounter !== 2 ? '100%' : 'auto'}
          marginTop={shittyCounter !== 2 ? '8px' : '0'}
          marginLeft={shittyCounter !== 2 ? '0' : '6px'}
          fontWeight={600}
          fontSize="16px"
          lineHeight="20px"
        >
          {name}
        </Text>
      </AutoRow>
      <AutoRow align="flex-start" justify="center">
        <StyledText
          marginTop={shittyCounter !== 2 ? '10px' : '7px'}
          color={theme.text4}
          letterSpacing="0.02em"
          fontWeight={600}
          fontSize="9px"
          lineHeight="11px"
          textAlign="center"
        >
          {pairs + (pairs > 1 ? ' PAIRS' : ' PAIR')}
          {proposals && ' | ' + proposals + (proposals > 1 ? ' PROPOSALS' : ' PROPOSAL')}
        </StyledText>
      </AutoRow>
    </LightCardWrap>
  )
}
