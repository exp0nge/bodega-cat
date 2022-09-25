import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Link,
    Image,
    Text,
    Divider,
    Button,
    Skeleton,
    Code,
    Container,
    VStack,
} from '@chakra-ui/react';
import { get, formattedDataFromRow } from './tableland-tools';


async function fillInDetails(setDetail) {
    const query = new URLSearchParams(window.location.search);
    console.log("query", query);
    const row = await get(query.get("id"));
    setDetail(formattedDataFromRow(row));
}


const ArticleList = () => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fillInDetails(setDetails)
    }, []);

    return (
        <Container maxW={'7xl'} p="12">
            <Skeleton isLoaded={details !== null}>
                {details &&
                    <div>
                        <Heading as="h1">{details.cat_name}</Heading>
                        <Box
                            marginTop={{ base: '1', sm: '5' }}
                            display="flex"
                            flexDirection={{ base: 'column', sm: 'row' }}
                            justifyContent="space-between">
                            <Box
                                display="flex"
                                flex="1"
                                marginRight="3"
                                position="relative"
                                alignItems="center">
                                <Box
                                    width={{ base: '100%', sm: '85%' }}
                                    zIndex="2"
                                    marginLeft={{ base: '0', sm: '5%' }}
                                    marginTop="5%">
                                    <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                        <Image
                                            borderRadius="lg"
                                            src={"https://ipfs.io/ipfs/" + details.picture_href + "/file.jpeg"}
                                            alt="some good alt text"
                                            objectFit="contain"
                                        />
                                    </Link>
                                </Box>
                                <Box zIndex="1" width="100%" position="absolute" height="100%">
                                    <Box
                                        bgGradient={'radial(orange.600 1px, transparent 1px)'}
                                        backgroundSize="20px 20px"
                                        opacity="0.4"
                                        height="100%"
                                    />
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                flex="1"
                                flexDirection="column"
                                justifyContent="center"
                                marginTop={{ base: '3', sm: '0' }}>
                                <Text
                                    as="p"
                                    marginTop="2"
                                    color={'gray.700'}
                                    fontSize="lg">
                                    {details.cat_attributes}
                                </Text>
                                <Divider marginTop="5" />
                                <Button colorScheme='green'>
                                    <Link href={'https://www.google.com/maps/place/' + details.coordinates} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                        Navigate: {details.coordinates}
                                    </Link>
                                </Button>
                            </Box>
                        </Box>

                        <Divider marginTop="5" />
                        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
                            <Heading as="h2">Raw Data</Heading>

                            <Heading as="h4">NFTPort</Heading>
                            <Text as="p" fontSize="lg">
                                <Code overflowWrap={"anywhere"}>
                                    {JSON.stringify(details.nftport_blob)}
                                </Code>
                            </Text>

                            <Heading as="h4">Skale</Heading>
                            <Text as="p" fontSize="lg">
                                <Code overflowWrap={"anywhere"}>{details.skale_link}</Code>
                            </Text>
                        </VStack>
                    </div>}
            </Skeleton>
        </Container>
    );
};

export default ArticleList;
