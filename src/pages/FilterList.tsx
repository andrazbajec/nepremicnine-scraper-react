import { Table, TableContainer, Thead, Tr, Th, useToast, Tbody, Td, Link, Input, Checkbox, Icon } from '@chakra-ui/react';
import React, { ChangeEvent, useCallback, useEffect, useState, MouseEvent } from 'react';
import { BsPlusCircle, BsUpload } from 'react-icons/bs';
import axios from '../axios';
import Navbar from '../components/Navbar';

const FilterList = () => {
    const [filters, setFilters] = useState<{ IsActive: boolean, IsChanged?: boolean, IsPending?: boolean, UserCrawlFilterID?: number, Url: string }[]>([]);
    const [originalFilters, setOriginalFilters] = useState<{ IsActive: boolean, UserCrawlFilterID: number, Url: string }[]>([]);
    const [hasPending, setHasPending] = useState(false);
    const toast = useToast();

    const loadFilters = useCallback(() => {
        axios.post('filter/get-user-filters')
            .then(({ data: { filters } }) => {
                setOriginalFilters(filters || []);
            })
            .catch(() => {
                toast({
                    duration: 5000,
                    status: 'error',
                    title: 'There was a problem loading the filters!',
                });
            });
    }, []);

    const addPending = useCallback(() => {
        if (hasPending) {
            return;
        }

        setFilters([...filters, { Url: '', IsActive: false, IsPending: true }]);

        setHasPending(true);
    }, [hasPending, filters]);

    const handleChange = useCallback(({ target: { value, dataset: { filterIndex } } }: ChangeEvent<HTMLInputElement>) => {
        const newFilters = [...filters];
        // @ts-ignore
        newFilters[filterIndex] = { ...newFilters[filterIndex], IsChanged: true, Url: value };
        setFilters(newFilters);
    }, [filters]);

    const saveFilter = useCallback(({ currentTarget: { dataset: { filterIndex } } }: MouseEvent<SVGElement>) => {
        // @ts-ignore
        const { IsActive: isActive, Url: url, UserCrawlFilterID: userCrawlFilterID } = filters[filterIndex];

        axios.post('filter/save-user-filter', {
            isActive,
            url,
            userCrawlFilterID,
        }).then((res) => {
            console.log(res);
        }).catch(() => {
            toast({
                duration: 5000,
                status: 'error',
                title: 'There was a problem saving the filter!',
            });
        });
    }, []);

    useEffect(() => {
        loadFilters();
    }, []);

    useEffect(() => {
        setFilters(originalFilters);
    }, [originalFilters]);

    return <>
        <Navbar/>
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Url</Th>
                        <Th width="2.5%">Is active</Th>
                        <Th w="2.5%"/>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        filters.map(({ IsActive: isActive, IsChanged: isChanged, Url: url, UserCrawlFilterID: userCrawlFilterID }, idx) => {
                            return <Tr key={`filter-list-${idx}`}>
                                <Td className="col-10">
                                    <Input data-filter-index={idx}
                                           data-user-crawl-filter-id={userCrawlFilterID}
                                           onChange={handleChange}
                                           placeholder="Enter URL"
                                           value={url}
                                    />
                                </Td>
                                <Td w="2.5%"
                                    textAlign="center"
                                >
                                    <Checkbox defaultChecked={isActive}/>
                                </Td>
                                <Td w="2.5%"
                                    textAlign="center"
                                >
                                    <Icon as={BsUpload}
                                          data-filter-index={idx}
                                          color={isChanged ? 'teal' : 'gray'}
                                          cursor={isChanged ? 'pointer' : 'default'}
                                          onClick={isChanged ? (props) => saveFilter(props) : () => {
                                          }}
                                          _hover={isChanged ? { color: 'teal.300' } : {}}
                                    />
                                </Td>
                            </Tr>;
                        })
                    }
                    {
                        !hasPending
                            ? <Tr>
                                <Td textAlign="center">
                                    <Icon as={BsPlusCircle}
                                          boxSize={4}
                                          color="teal"
                                          cursor="pointer"
                                          onClick={addPending}
                                          _hover={{ color: 'teal.300' }}
                                    />
                                </Td>
                                <Td/>
                                <Td/>
                            </Tr>
                            : <></>
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </>;
};

export default FilterList;
