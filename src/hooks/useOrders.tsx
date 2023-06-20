import { SystemServices } from 'src/services';
import { useQuery } from '@tanstack/react-query';

interface OrderFilterType {
    page: number;
    page_size: number;
}
export const useOrders = (filters: OrderFilterType) => {
    const { data, isLoading, isFetching, isError, error } = useQuery({
        queryKey: ['orders', filters],
        queryFn: () => getOrders(filters),
    });

    const getOrders = async (params: any) => {
        try {
            const transformedParams = {
                page: params?.page || 1,
            };
            const res = await SystemServices.getOrders(transformedParams);
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        data,
        isLoading,
        isFetching,
        isError,
        error,
    };
};
