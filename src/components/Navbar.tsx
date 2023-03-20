import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { BsFunnel, BsGear, BsHouse } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navigationOptions = useMemo(() => {
        return [
            { link: '/', icon: BsHouse },
            { link: '/filter-list', icon: BsFunnel },
            { link: '/settings', icon: BsGear },
        ];
    }, []);

    return (
        <Stack alignItems="center"
               backgroundColor="gray.800"
               color="white"
               direction="row"
               height={50}
               justify="space-between"
        >
            <Box ml={2}>
                <Text>
                    Bajec scraper
                </Text>
            </Box>
            <Box>
                {
                    navigationOptions.map(({ link, icon }, idx) => (
                        <Link key={`navigation-icon${idx}`}
                              to={link}
                        >
                            <Icon as={icon}
                                  boxSize={7}
                                  mr={2}
                                  _hover={{ color: "blue.600" }}
                            />
                        </Link>
                    ))
                }
            </Box>
        </Stack>
    );
};

export default Navbar;
