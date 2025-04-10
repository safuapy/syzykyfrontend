import type { GridProps, HTMLChakraProps } from '@chakra-ui/react';
import { Box, Grid, Flex, Text, Link, VStack, useColorModeValue, Image } from '@chakra-ui/react';
import React from 'react';

import type { IconName } from 'ui/shared/IconSvg';

import config from 'configs/app';
import { copy } from 'lib/html-entities';
import { CONTENT_MAX_WIDTH } from 'ui/shared/layout/utils';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import FooterLinkItem from './FooterLinkItem';
import IntTxsIndexingStatus from './IntTxsIndexingStatus';

const MAX_LINKS_COLUMNS = 4;

interface FooterLink {
  icon: IconName;
  iconSize: string;
  text: string;
  url: string;
}

const Footer = () => {
  const SOCIAL_LINKS: FooterLink[] = [
    {
      icon: 'social/twitter',
      iconSize: '18px',
      text: 'Twitter',
      url: 'https://x.com/syzykyscan',
    },
    {
      icon: 'social/facebook_filled',
      iconSize: '18px',
      text: 'Facebook',
      url: 'https://www.facebook.com/syzykyscan',
    },
    {
      icon: 'social/medium_filled',
      iconSize: '18px',
      text: 'Medium',
      url: 'https://medium.com/@syzykyscan',
    },
    {
      icon: 'social/telega',
      iconSize: '18px',
      text: 'Telegram Group',
      url: 'https://t.me/syzykyblockchain',
    },
    {
      icon: 'social/telegram_filled',
      iconSize: '18px',
      text: 'Telegram Channel',
      url: 'https://t.me/syzykyblockchain_official',
    },
  ];

  const RESOURCE_LINKS: FooterLink[] = [
    {
      icon: 'link',
      iconSize: '18px',
      text: 'Website',
      url: 'https://syzyky.com/',
    },
    {
      icon: 'info',
      iconSize: '18px',
      text: 'About',
      url: 'https://syzyky.com/#about',
    },
    {
      icon: 'apps_list',
      iconSize: '18px',
      text: 'Use Cases',
      url: 'https://syzyky.com/#usecase',
    },
    {
      icon: 'checkered_flag',
      iconSize: '18px',
      text: 'Roadmap',
      url: 'https://syzyky.com/#Roadmap',
    },
    {
      icon: 'token',
      iconSize: '18px',
      text: 'Token',
      url: 'https://syzyky.com/#token',
    },
  ];

  const renderNetworkInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
    return (
      <Flex
        gridArea={ gridArea }
        flexWrap="wrap"
        columnGap={ 8 }
        rowGap={ 6 }
        mb={{ base: 5, lg: 10 }}
        _empty={{ display: 'none' }}
      >
        { !config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus/> }
        <NetworkAddToWallet/>
      </Flex>
    );
  }, []);

  const renderProjectInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
    const logoUrl = config.UI.footer.logo || process.env.NEXT_PUBLIC_NETWORK_LOGO_DARK;
    
    return (
      <Box gridArea={ gridArea }>
        {logoUrl && (
          <Flex alignItems="center" gap={2} mb={3}>
            <Image src={logoUrl} alt="Syzyky Network Logo" height="24px" width="auto" />
          </Flex>
        )}
        <Text mt={ 3 } fontSize="xs">
          The Syzyky Block Explorer serves as your gateway to seamlessly explore, monitor, and analyze transactions, blocks, wallet addresses, and smart contract activity across the Syzyky Network. By providing full transparency and real-time insights, it empowers users to gain a comprehensive understanding of the blockchain ecosystem.
        </Text>
        <Box mt={ 6 } alignItems="start" fontSize="xs" lineHeight={ 5 }>
          <Text>
            Copyright { copy } Syzyky Network { (new Date()).getFullYear() }
          </Text>
        </Box>
      </Box>
    );
  }, []);

  const containerProps: HTMLChakraProps<'div'> = {
    as: 'footer',
    borderTopWidth: '1px',
    borderTopColor: 'solid',
  };

  const contentProps: GridProps = {
    px: { base: 4, lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12, '2xl': 6 },
    py: { base: 4, lg: 8 },
    gridTemplateColumns: { base: '1fr', lg: 'minmax(auto, 470px) 1fr' },
    columnGap: { lg: '32px', xl: '100px' },
    maxW: `${ CONTENT_MAX_WIDTH }px`,
    m: '0 auto',
  };

  return (
    <Box { ...containerProps }>
      <Grid { ...contentProps }>
        <div>
          { renderNetworkInfo() }
          { renderProjectInfo() }
        </div>

        <Grid
          gap={{ base: 6, lg: 8, xl: 12 }}
          gridTemplateColumns={{
            base: 'repeat(auto-fill, 160px)',
            lg: 'repeat(2, 135px)',
            xl: 'repeat(2, 160px)',
          }}
          justifyContent={{ lg: 'flex-end' }}
          mt={{ base: 8, lg: 0 }}
        >
          <Box>
            <Text fontWeight={ 500 } mb={ 3 }>Social Media</Text>
            <VStack spacing={ 1 } alignItems="start">
              { SOCIAL_LINKS.map(link => <FooterLinkItem { ...link } key={ link.text }/>) }
            </VStack>
          </Box>
          <Box>
            <Text fontWeight={ 500 } mb={ 3 }>Resources</Text>
            <VStack spacing={ 1 } alignItems="start">
              { RESOURCE_LINKS.map(link => <FooterLinkItem { ...link } key={ link.text }/>) }
            </VStack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(Footer);
