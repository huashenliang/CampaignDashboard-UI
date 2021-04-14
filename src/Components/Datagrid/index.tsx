import * as React from 'react';
import { CDataTable } from '@coreui/react';

interface ICampaignData {
    id: number,
    campaignName: string
}

const usersData = [
    { id: 0, campaignName: 'John Doe' },
    { id: 1, campaignName: 'Samppa Nori' },
    { id: 2, campaignName: 'Estavan Lykos' },
]

const Datagrid: React.FC = () => {
    const [details, setDetails] = React.useState<ICampaignData[]>(usersData);

    const fields = [
        { key: 'id', _style: { width: '40%' } },
        { key: 'campaignName', _style: { width: '40%' } },
    ]

    return (
        <CDataTable
            items={usersData}
            fields={fields}
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            striped
            sorter
            pagination
        />
    )
};

export default Datagrid;
