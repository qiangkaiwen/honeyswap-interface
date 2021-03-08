import React from 'react'
import styled from 'styled-components'
import { AutoRow } from '../Row'
import Badge from '../Badge'
import { ChainId } from 'dxswap-sdk'

const InfoCard = styled.button<{ active?: boolean }>`
  background-color: transparent;
  padding: 1rem;
  outline: none;
  border: none;
  border-radius: 8px;
  width: 100% !important;
  margin: 0.5em 0;
`

const OptionCard = styled(InfoCard as any)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`

const OptionCardLeft = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  height: 100%;
`

const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean }>`
  margin-top: 0;
  cursor: ${({ clickable, disabled }) => (clickable && !disabled ? 'pointer' : 'not-allowed')};
  transition: border 0.3s ease;
  background-color: ${({ theme, clickable, disabled }) => (!clickable || disabled ? theme.purple5 : theme.primary1)};
  color: ${({ theme, disabled }) => (disabled ? theme.darkest : 'white')};
  opacity: ${disabled => (disabled ? '0.75' : '1')};
`

const HeaderText = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  font-size: 1rem;
  font-weight: 500;
  margin-left: 1rem;
`

const IconWrapper = styled.div<{ size?: number | null }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '30px')};
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`

const BadgeWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 10%;
`

export default function Option({
  clickable = true,
  header,
  logoSrc,
  active = false,
  disabled = false,
  chainId
}: {
  clickable?: boolean
  onClick?: null | (() => void)
  color: string
  header: React.ReactNode
  logoSrc: string
  active?: boolean
  disabled?: boolean
  chainId: ChainId
}) {
  const selectNetwork = () => {
    console.log('select network: ', chainId)

    /**
     * TODO:
     * Check Metamask connected -> (true, false)
     * true:
     *  Check Network added -> (true, false)
     *   false:
     *     add network
     *   connect to network
     * false:
     *  alert Metamask not available
     *
     */
  }

  return (
    <OptionCardClickable
      chainId={chainId}
      onClick={selectNetwork}
      clickable={clickable && !active}
      disabled={disabled}
      active={active}
    >
      <OptionCardLeft>
        <AutoRow>
          <IconWrapper>
            <img src={logoSrc} alt={'Icon'} />
          </IconWrapper>
          <HeaderText>{header}</HeaderText>
          <BadgeWrapper>{disabled ? <Badge label="COMING SOON" /> : ''}</BadgeWrapper>
        </AutoRow>
      </OptionCardLeft>
    </OptionCardClickable>
  )
}
