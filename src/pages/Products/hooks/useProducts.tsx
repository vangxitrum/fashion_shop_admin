import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SystemServices } from '../../../services';

interface filtersType {
    page: number;
    page_size: number;
    name?: string | undefined;
    brands?: [];
    types?: [];
    genders?: string | undefined;
    price?: [];
}

const defaultFilter: filtersType = {
    page: 1,
    page_size: 12,
};

export const useProducts = (filters: filtersType = defaultFilter) => {
    const [total, setTotal] = useState(0);
    const { isLoading, isError, isFetching, data, error } = useQuery({
        queryKey: ['products', filters],
        queryFn: async () => {
            try {
                const transformedParams = {
                    page: filters?.page || 1,
                    page_size: 12,
                    name: filters?.name || undefined,
                    brands: filters?.brands
                        ? filters?.brands.join(',')
                        : undefined,
                    types: filters?.types
                        ? filters?.types.join(',')
                        : undefined,
                    genders: filters.genders || undefined,
                    price: filters?.price
                        ? filters?.price.join(',')
                        : undefined,
                };
                const res: any = await SystemServices.getProducts(
                    transformedParams
                );
                setTotal(res?.total);
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        keepPreviousData: true,
    });

    return { isLoading, isError, isFetching, data, error, total };
};
