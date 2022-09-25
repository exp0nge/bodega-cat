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

export default function NftCard(nftData) {
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
                <Button
                    w={'full'}
                    mt={8}
                    bg={'rgba(171, 191, 244, 1)'}
                    color={'white'}
                    rounded={'md'}
                    onClick={() => navigate(nftData.id)}
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    }}>
                    View
                </Button>
            </Box>
        </Center>
    );
}
