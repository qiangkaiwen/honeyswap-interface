import React, { useCallback } from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import Option from './Option'
import { useToggleNetworkSwitcherModalToggle } from '../../state/application/hooks'
import { transparentize } from 'polished'
import { ReactComponent as Close } from '../../assets/images/x.svg'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import XDAILogo from '../../assets/images/xdai-stake-logo.png'
import ArbitrumLogo from '../../assets/images/arbitrum-logo.png'

const UpperSection = styled.div`
  position: relative;
  background-color: ${({ theme }) => transparentize(0.45, theme.bg2)};
`

const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => transparentize(0.25, theme.bg1)};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  cursor: pointer;
`

const CloseColor = styled(Close)`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.text5};
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  font-size: 20px;
  padding: 1rem 1.125rem 0 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text4};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const ContentWrapper = styled.div`
  padding: 16px 18px 32px 16px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: auto;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const OptionGrid = styled.div`
  padding: 0.5em 1em 2em 0.75rem;
  display: grid;
  grid-gap: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 10px;
  `};
`

const NetworkInfo = styled.div`
  margin: 2em 1em 1em 1em
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text3};
`
const CurrentNetwork = styled.span`
  font-weight: 700;
`

const BottomLink = styled.a`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.purple4};
  text-decoration: underline;
`

export default function NetworkSwitcherModal({ isOpen }: { isOpen: boolean }) {
  const handleDismiss = useCallback(() => null, [])

  // Debug
  const currentNetwork = 'Ethereum Mainnet'

  return (
    <Modal isOpen={isOpen} onDismiss={handleDismiss} maxHeight={90}>
      <ContentWrapper>
        <UpperSection>
          <CloseIcon onClick={handleDismiss}>
            <CloseColor />
          </CloseIcon>
          <HeaderRow>Choose a network</HeaderRow>
          <NetworkInfo>
            Your wallet is connected to <CurrentNetwork>{currentNetwork}</CurrentNetwork>.
          </NetworkInfo>
          <OptionGrid>
            <Option id={`networkselect-mainnet`} color={'#E8831D'} header={'Ethereum'} logoSrc={EthereumLogo} />
            <Option id={`networkselect-xDai`} color={'#E8831D'} header={'xDai'} logoSrc={XDAILogo} />
            <Option
              id={`networkselect-arbitrum`}
              color={'#333333'}
              header={'Arbitrum'}
              logoSrc={ArbitrumLogo}
              disabled={true}
              clickable={false}
            />
          </OptionGrid>
        </UpperSection>
        <LowerSection>
          <BottomLink href="/swap">Learn more about the different networks.</BottomLink>
        </LowerSection>
      </ContentWrapper>
    </Modal>
  )
}
