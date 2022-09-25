import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Image,
    Icon,
    useColorModeValue,
    Divider,
    Grid,
    GridItem,
    Skeleton
} from '@chakra-ui/react';
import NFTCard from './NftCard';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React, { useEffect, useState } from "react";
import { getAll, formattedDataFromRow } from './tableland-tools';
import * as L from "leaflet";
import { getMintbaseInfo } from './mintbase-tools';

const LeafIcon = L.Icon.extend({
    options: {}
});
const blueIcon = new LeafIcon({
    iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
})

function createNftCard(nftData) {
    const formattedData = formattedDataFromRow(nftData);
    console.log("nftData", nftData);
    const mintbaseUrl = nftData[11];
    return (
        <GridItem key={formattedData.id}>
            {NFTCard(formattedData, mintbaseUrl)}
        </GridItem>
    );
}

async function fetchNfts(setHasData) {
    const rows = await getAll();
    const mintbaseRows = await getMintbaseInfo();
    rows.forEach(function (part, index) {
        const mintbaseRow = mintbaseRows.filter(row => {
            const mintBaseTitle = row.meta.title;
            const catId = part[0];
            const catName = part[1].replaceAll(" ", "");
            const mintbaseCompare = mintBaseTitle.replaceAll(" ", "");
            const b = catName + catId;
            const result = mintbaseCompare === b || catName === mintbaseCompare;
            // console.log("mintbaseCompare === b", mintbaseCompare, b, result);
            return result;
        });
        if (mintbaseRow.length > 0) {
            this[index].push(mintbaseRow[0].url);
        } else {
            this[index].push("https://testnet.mintbase.io/contract/bodegacats.mintspace2.testnet");
        }
    }, rows);
    setHasData(rows);
}

export default function CallToAction() {
    const [map, setMap] = useState();
    const [hasData, setHasData] = useState(null);

    useEffect(() => {
        fetchNfts(setHasData);
    }, []);

    return (
        <Container maxW={'7xl'}>
            <Stack
                align={'center'}
                spacing={{ base: 8, sm: 12 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: 'column', md: 'row' }}>
                <Stack flex={1} spacing={{ base: 5, md: 12 }}>
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                        <Text as={'span'}>
                            Bodega Cat
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        A community (of real humans) to find cats and create NFTs of them! Share your local friendly (optional) bodega cat with your community 🐱
                    </Text>
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    w={'full'}>
                    <Appa
                        w={'150%'}
                        h={'150%'}
                        position={'absolute'}
                        top={'-20%'}
                        left={0}
                        zIndex={-1}
                        color={useColorModeValue('red.50', 'red.400')}
                    />
                    <Box
                        position={'relative'}
                        height={'300px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}
                        align={'center'}
                    >
                        <Image
                            objectFit='cover'
                            alt={'Appa cat'}
                            // fit={'cover'}
                            align={'right'}
                            w={'50%'}
                            h={'100%'}
                            src="/appa-1.png"
                        />
                    </Box>
                </Flex>
            </Stack>
            <Divider mt={12} mb={12} />
            <Skeleton isLoaded={hasData !== null}>
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)',
                    }}
                    gap={{ base: '1', sm: '12', md: '8' }}>
                    {!hasData && createNftCard([-1])}
                    {hasData && hasData.map(data => createNftCard(data))}
                </Grid>
            </Skeleton>
            <Divider mt={12} mb={12} />
            <Box
                position={'relative'}
                height={'800px'}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}
                align={'center'}
            >
                <div id="map">
                    <Skeleton isLoaded={hasData !== null}>

                        <MapContainer
                            height={"50%"} center={[40.74455614355644, -73.99624807055929]} zoom={30} scrollWheelZoom={true}
                            whenCreated={setMap}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker openOn={map} position={[40.74455614355644, -73.99624807055929]} icon={blueIcon}>
                                <Popup>
                                    Alpha House
                                </Popup>
                            </Marker>
                            {hasData && hasData.map(data =>
                                <Marker openOn={map} position={data[3].split(",")}>
                                    <Popup>
                                        {data[1]}
                                    </Popup>
                                </Marker>
                            )}
                        </MapContainer>
                    </Skeleton>
                </div>

            </Box>

        </Container>
    );
}

export const Appa = (props) => {
    return (
        <Icon
            width={'100%'}
            viewBox="0 0 578 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
                fill="currentColor"
            />
        </Icon>
    );
};
