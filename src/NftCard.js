import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

function navigate(id) {
    if (id > 0) window.location.href = 'view?id=' + id;
}

export default function NftCard(nftData, mintbaseUrl) {
    return (
        <Center py={6}>
            <Box
                maxW={'320px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}>
                <Avatar
                    size={'xl'}
                    src={"https://ipfs.io/ipfs/" + nftData.picture_href + "/file.jpeg"}
                    alt={nftData.cat_name}
                    mb={4}
                    pos={'relative'}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {nftData.cat_name}
                </Heading>
                <Text fontWeight={300} color={'gray.500'} mb={4}>
                    {nftData.coordinates}
                </Text>
                <Text
                    textAlign={'center'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}>
                    {nftData.cat_attributes}
                </Text>
                <Stack mt={8} direction={'row'} spacing={4}>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        onClick={() => navigate(nftData.id)}
                        _focus={{
                            bg: 'gray.200',
                        }}>
                        View
                    </Button>
                    <Button
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        _hover={{
                            bg: 'blue.500',
                        }}
                        _focus={{
                            bg: 'blue.500',
                        }}>
                        <Link href={mintbaseUrl}>Buy</Link>
                    </Button>
                </Stack>
            </Box>
        </Center>
    );
}
