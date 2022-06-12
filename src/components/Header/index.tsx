import { Flex, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'
import { Icon } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri'

export function Header(){
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    const { onOpen } = useSidebarDrawer()

    return(
        <Flex
          as="header"
          w="100%"
          maxWidth={1280}
          h="20"
          mx="auto"
          mt="4"
          px="6"
          align="center"
          >

            {
                !isWideVersion &&
                <IconButton 
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                />
            }
            <Logo />

            {
                isWideVersion &&
                <SearchBox />
            }

            <Flex
                align="center"
                ml="auto"
            >               
                <NotificationsNav />

                <Profile
                  showProfileData={isWideVersion}
                  name="Warlike Richard"
                  email="warlikerichard@hotmail.com"
                  avatar="https://github.com/warlikerichard.png" 
                  />               
            </Flex>
        </Flex>
    )
}