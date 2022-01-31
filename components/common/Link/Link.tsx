import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import {
  Link as ChakraLink,
  LinkOverlay as ChakraLinkOverlay, LinkProps,
} from '@chakra-ui/react';

const isButton = (linkProps: StrRecord<any>) =>
  !!Object.values(linkProps).find(
    (p) => typeof p === 'string' && p.indexOf('chakra-button') !== -1,
  );

type CombinedLinkProps = LinkProps & {
  nextLinkProps?: Partial<NextLinkProps>,
  _useChakraLinkOverlay?: boolean,
};
const Link = ({
  children,
  href,
  nextLinkProps = {},
  _useChakraLinkOverlay = false,
  ...linkProps
}: CombinedLinkProps) => {
  const forceNoUnderline = isButton(linkProps);
  const innerLinkEle = _useChakraLinkOverlay ? (
    <ChakraLinkOverlay {...linkProps} href={href}>
      <span className="linkElement">{children}</span>
    </ChakraLinkOverlay>
  ) : (
    <ChakraLink
      {...linkProps}
      {...(forceNoUnderline && { variant: 'noUnderline' })}
      href={href}
    >
      {children}
    </ChakraLink>
  );
  return href?.[0] === '#' ? (
    innerLinkEle
  ) : (
    <NextLink {...nextLinkProps} href={href || ''} passHref>
      {innerLinkEle}
    </NextLink>
  );
};

export const LinkOverlay = (props: CombinedLinkProps) => <Link _useChakraLinkOverlay {...props} />;

export default Link;
