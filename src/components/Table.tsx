import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import type { PaginatorPageChangeEvent } from 'primereact/paginator';

import RowSelectPopup from './PopUp';
import MyPaginator from './MyPaginator';

interface Product {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: number;
    date_end: number;
}

const Table = () => {
    const [data, setData] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectTargetCount, setSelectTargetCount] = useState<number | null>(null);

    const fetchArtworks = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
            const json = await res.json();
            const newData: Product[] = json?.data || [];

            setData(newData);

            if (selectTargetCount !== null && selectedProducts.length < selectTargetCount) {
                const alreadySelectedIds = new Set(selectedProducts.map(p => p.id));
                const remainingToSelect = selectTargetCount - selectedProducts.length;

                const newSelections = newData
                    .filter((item) => !alreadySelectedIds.has(item.id))
                    .slice(0, remainingToSelect);

                const updatedSelection = [...selectedProducts, ...newSelections];
                setSelectedProducts(updatedSelection);

                if (updatedSelection.length >= selectTargetCount) {
                    setSelectTargetCount(null);
                }
            }

        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtworks();
    }, [page]);

    const handleRowSelect = (count: number) => {
        setSelectedProducts([]);
        setSelectTargetCount(count);

        const rowsFromCurrentPage = data.slice(0, Math.min(count, data.length));
        setSelectedProducts(rowsFromCurrentPage);

        if (rowsFromCurrentPage.length >= count) {
            setSelectTargetCount(null);
        }
    };

    const setOnPage = (e: PaginatorPageChangeEvent) => {
        const currentPage = e.first / e.rows + 1;
        setPage(currentPage);
    };

    return (
        <div className="card">
            <DataTable
                value={data}
                showGridlines
                loading={loading}
                selection={selectedProducts}
                onSelectionChange={(e: { value: Product[] }) => setSelectedProducts(e.value)}
                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
                selectionMode="multiple"
            >
                <Column
                    selectionMode="multiple"
                    header={<RowSelectPopup onSelect={handleRowSelect} />}
                    headerStyle={{ width: '3rem', textAlign: 'center' }}
                />
                <Column field="title" header="Title" />
                <Column field="place_of_origin" header="Place of Origin" />
                <Column field="artist_display" header="Artist" />
                <Column field="inscriptions" header="Inscriptions" />
                <Column field="date_start" header="Start Date" />
                <Column field="date_end" header="End Date" />
            </DataTable>

            <MyPaginator onPageChange={setOnPage} />
        </div>
    );
};

export default Table;
