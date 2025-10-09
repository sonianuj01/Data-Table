import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import RowSelectPopup from './PopUp';

interface Product {
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: number;
    date_end: number;
}

const Table = () => {
    const [data, setData] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchAllArtworks = async () => {
        try {
            let allData: Product[] = [];
            let page = 1;
            let hasMore = true;

            while (hasMore) {
                const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
                const json = await res.json();

                if (json?.data?.length > 0) {
                    allData = [...allData, ...json.data];
                    page++;
                } else {
                    hasMore = false;
                }

                if (page > 20) hasMore = false; 
            }

            setData(allData);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllArtworks();
    }, []);

    const handleRowSelect = (count: number) => {
        const selected = data.slice(0, Math.min(count, data.length));
        setSelectedProducts(selected);
    };

    return (
        <div className="card">
            <DataTable
                value={data}
                showGridlines
                paginator
                rows={12}
                rowsPerPageOptions={[6, 9, 12, 15]}
                loading={loading}
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                tableStyle={{ minWidth: '50rem' }}
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
        </div>
    );
};

export default Table;
