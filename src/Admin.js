import {
    Container,
    Button,
} from '@chakra-ui/react';
import { getAll } from './tableland-tools';

export default function CallToAction() {
    return (
        <Container maxW={'7xl'}>
            <Button onClick={getAll}>Get All</Button>
        </Container>
    );
}
