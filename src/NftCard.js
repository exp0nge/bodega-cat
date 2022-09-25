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
                <Text fontWeight={600} color={'gray.500'} mb={4}>
                    {nftData.coordinates}
                </Text>
                <Text
                    textAlign={'center'}
                    color={useColorModeValue('gray.700', 'gray.400')}
                    px={3}>
                    {nftData.cat_attributes}
                </Text>
            </Box>
        </Center>
    );
}
