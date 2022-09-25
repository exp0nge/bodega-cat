import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    Icon,
    createIcon,
    IconProps,
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
            const originalRow = this[index];
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

const PlayIcon = createIcon({
    displayName: 'PlayIcon',
    viewBox: '0 0 58 58',
    d:
        'M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z',
});

export const Appa = (props: IconProps) => {
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
