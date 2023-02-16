import * as React from 'react'; 
import { Category } from 'sketch-icons';
import {
  Flex,
  Heading,
  Box,
  Spacer,
  Button,
  Image,
  Code,
  Stack,
  LinkOverlay,
  Link,
  Menu,
  IconButton,
  MenuList,
  MenuItem,
  MenuButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useMediaQuery } from '@chakra-ui/react';
import Logo from "./assets/dev-craftsman.png";

export const Nav = () => {

  const [isTablet] = useMediaQuery('(max-width: 768px)');

  const menuStyle = {
    fontFamily: 'system-ui',
    color: 'gray.100',
    fontSize: '16px',
  };

  const logoutAdmin = async() => {
    try {
      await localStorage.removeItem("_dev_token");
      await localStorage.removeItem("_gh_token");
      return window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Flex as="header" p="5">
      <Box p={2} ml={isTablet ? '2' : '5'}>
        <Stack direction="row" isInline>
          <Image
            boxSize={{ base: '30px', md: '40px' }}
            objectFit="contain"
            src={Logo}
            alt="React-icons"
          />
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Heading
              fontSize={{ base: '20px', md: '25px', lg: '30px' }}
              fontFamily="system-ui"
            >
              Dev-Craftsman &nbsp;
              <span>
                <Code>v1.0.0</Code>
              </span>
            </Heading>
          </Link>
        </Stack>
      </Box>
      <Spacer />
      {isTablet ? (
        <Menu>
          <MenuButton
            mr="3"
            as={IconButton}
            bg="gray.100"
            aria-label="Options"
            icon={<Category width={20} height={20} />}
            variant="outline"
          />
          <MenuList>
            <MenuItem style={menuStyle} as={Link} href="/">
              Home
            </MenuItem> 
            <MenuItem 
            onClick={logoutAdmin}
            style={menuStyle} as={Link} href="/">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Box>
          <Button color="current" mr="5">
            <LinkOverlay href="/">Home</LinkOverlay>
          </Button> 

          <Button color="current" mr="5">
            <LinkOverlay 
            onClick={logoutAdmin}
            href="/">Logout</LinkOverlay>
          </Button>
        </Box>
      )}
      <ColorModeSwitcher mr="5" justifySelf="flex-end" />
    </Flex>
  );
};
