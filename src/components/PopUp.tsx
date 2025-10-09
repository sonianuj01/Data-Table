import React, { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';

interface RowSelectPopupProps {
    onSelect: (count: number) => void;
}

const RowSelectPopup: React.FC<RowSelectPopupProps> = ({ onSelect }) => {
    const op = useRef<OverlayPanel>(null);
    const [rowCount, setRowCount] = useState<number>(0);

    const handleSubmit = () => {
        if (rowCount > 0) {
            onSelect(rowCount);
            op.current?.hide();
        }
    };

    return (
        <>
            <div
                onClick={(e) => op.current?.toggle(e)}
                className="flex justify-center items-center cursor-pointer"
                title="Select N Rows"
            >
                ✅
            </div>

            <OverlayPanel ref={op} className="p-3 shadow-lg rounded-md">
                <div className="flex flex-col gap-3 w-48">
                    <InputNumber
                        value={rowCount}
                        onValueChange={(e) => setRowCount(e.value || 0)}
                        placeholder="Select rows..."
                        min={1}
                        className="w-full"
                    />
                    <Button label="Submit" onClick={handleSubmit} className="p-button-sm" />
                </div>
            </OverlayPanel>
        </>
    );
};

export default RowSelectPopup;
