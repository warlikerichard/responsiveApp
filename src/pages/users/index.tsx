import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from '../../components/Header'
import Pagination from "../../components/Pagination";
import { Sidebar } from '../../components/Sidebar'
import { useQuery } from 'react-query'

export default function UserList(){
    const {data, isLoading, error} = useQuery('users', async () => {
        const response = await fetch('/api/users')
        const data = await response.json()

        const users =  data.users.map(user => {
            return{
                ...user,
                createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }
        });

        return users;
    })

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return(
        <Box>
            <Header/>

            <Flex
              w="100%"
              my="6"
              maxW={1280}
              mx="auto"
              px="6"
              >
                  <Sidebar/>

                  <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Listagem de usuários
                        </Heading>
                        <Link href="/users/create" passHref>
                            <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon
                            as={RiAddLine}
                            fontSize="20"
                            />}>
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner/>
                        </Flex>
                    ) : error ?(
                        <Flex justify="center" align="center">
                            Falha ao obter dados dos usuários.
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink"/>
                                        </Th>
                                        <Th>Usuários</Th>
                                        {isWideVersion && <Th>Data de cadastro</Th>}
                                        <Th width="6"></Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {data.map(user => {
                                        return(
                                            <Tr key={user.id}>
                                                <Td px={["4", "4", "6"]}>
                                                    <Checkbox colorScheme="pink"/>
                                                </Td>
                                                <Td>
                                                    <Box>
                                                        <Text fontWeight="bold">{user.name}</Text>
                                                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                                    </Box>
                                                </Td>
                                                {isWideVersion && <Td>
                                                    {user.createdAt}
                                                </Td>}
                                                    {isWideVersion &&
                                                    <Td>
                                                        <Button
                                                            as="a"
                                                            size="sm"
                                                            fontSize="sm"
                                                            colorScheme="purple"
                                                            leftIcon={<Icon
                                                            as={RiPencilLine}
                                                            fontSize="16"
                                                            />}>
                                                                Editar
                                                        </Button>
                                                    </Td>
                                                }                              
                                            </Tr>
                                        )
                                    })}

                                </Tbody>

                            </Table>

                            <Pagination />
                        </>
                    )}
            </Box>
            </Flex>
        </Box>
    );
}