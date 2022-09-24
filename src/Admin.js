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
    IconButton,
    createIcon,
    IconProps,
    useColorModeValue,
    Divider,
    Grid,
    GridItem,
    chakra
} from '@chakra-ui/react';
import { initTableland, insertAndRead, getAll } from './tableland-tools';

export default function CallToAction() {
    return (
        <Container maxW={'7xl'}>
            <Button onClick={initTableland}>Init Tableland</Button>
            <Button onClick={insertAndRead}>Insert and Read Tableland</Button>
            <Button onClick={getAll}>Get All</Button>
        </Container>
    );
}
