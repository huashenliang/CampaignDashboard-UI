import React, { useEffect } from 'react';
import { CDataTable } from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { setCampaignList } from "../../Actions/getCampaignAction";
import { RootStore } from '../../Store';

const fields = [
    { key: 'id', _style: { width: '40%' } },
    { key: 'name', _style: { width: '40%' } },
]

const Datagrid: React.FC = () => {
    const dispatch = useDispatch();
    const campaignState = useSelector((state: RootStore) => state.campaigns.campaignList);
    const data = campaignState?.campaigns;

    useEffect(() => {
        dispatch(setCampaignList());
    }, []);

    return (
        <CDataTable
            items={data}
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
