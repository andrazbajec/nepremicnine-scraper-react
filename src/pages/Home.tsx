import { Icon, Link, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import axios from '../axios';
import Navbar from '../components/Navbar';

const Home = () => {
    const [ads, setAds] = useState([]);
    const toast = useToast();

    const tableConfig = useMemo(() => {
        return [
            { key: 'Title', title: 'Title' },
            { key: 'Price', title: 'Price' },
            { key: 'Size', title: 'Size' },
            { key: 'DateCreated', title: 'First seen' },
            { key: 'DateLastSeen', title: 'Last seen' },
            { key: 'Url', title: 'Link', icon: BsLink45Deg, isLink: true },
        ];
    }, []);

    useEffect(() => {
        axios.post('ad/get-user-ads')
            .then(({ data: { ads } }) => {
                setAds(ads || []);
            })
            .catch(() => {
                toast({
                    duration: 5000,
                    status: 'error',
                    title: 'There was a problem loading the ads!',
                });
            });
    }, []);

    return (
        <>
            <Navbar/>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            {
                                tableConfig.map((column, idx) => {
                                    return <Th key={`ad-table-header-${idx}`}>{column.title}</Th>;
                                })
                            }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            ads.map((ad, adIdx) => {
                                return <Tr key={`ad-table-body-row-${adIdx}`}>
                                    {
                                        tableConfig.map((column, columnIdx) => {
                                            return <Td key={`ad-table-body-column-${adIdx}-${columnIdx}`}>
                                                {
                                                    column.icon
                                                        ? <Link href={ad[column.key]} target="_blank"><Icon as={column.icon}/></Link>
                                                        : ad[column.key]
                                                }
                                            </Td>;
                                        })
                                    }
                                </Tr>;
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Home;
