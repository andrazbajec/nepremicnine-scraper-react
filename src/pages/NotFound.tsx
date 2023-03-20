import { Flex, Text } from '@chakra-ui/react';

const NotFound = () => {
    return (
        <Flex align="center"
              height="100vh"
              justify="center"
        >
            <Text fontSize="6xl">
                Page not found!
            </Text>
        </Flex>
    );
};

export default NotFound;
