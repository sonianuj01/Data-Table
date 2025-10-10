import React, { useState } from 'react';
import { Paginator } from 'primereact/paginator';
import type { PaginatorPageChangeEvent } from 'primereact/paginator';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

interface MyPaginatorProps {
    onPageChange: (event: PaginatorPageChangeEvent) => void;
}

const MyPaginator: React.FC<MyPaginatorProps> = ({ onPageChange }) => {
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(12);

    const handlePageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);

        // 🔥 Inform the parent of the page change
        onPageChange(event);
    };

    return (
        <div style={{ padding: '2rem' }}>
            <Paginator
                first={first}
                rows={rows}
                totalRecords={50000}
                onPageChange={handlePageChange}
                rowsPerPageOptions={[6, 12, 24, 50]}
            />
        </div>
    );
};

export default MyPaginator;
