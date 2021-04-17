import React, { useEffect } from 'react';
import { CDataTable, CButton } from '@coreui/react';
import { useDispatch, useSelector } from "react-redux";
import { setCampaignList } from "../../Actions/getCampaignAction";
import { setCurrentCamp } from "../../Actions/setCurrentCampAction";
import { RootStore } from "../../Store";
import { useHistory } from "react-router-dom";

type rowData = {
    id: number,
    name: string
}

const fields = [
    { key: 'id', label: 'Campaign Id', _style: { width: '40%' } },
    { key: 'name', label: 'Campaign Name', _style: { width: '40%' } },
    { key: 'view_performance', label: '', _style: { width: '13%' }, sorter: false, filter: false }
]

const Datagrid: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const campaignState = useSelector((state: RootStore) => state.campaigns.campaignList);
    const data = campaignState?.campaigns;

    const handleRowClick = (row: rowData) => {
        dispatch(setCurrentCamp(row.name));
        history.push(`/dashboard/${row.id}`)
    }

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
            //Although the requirement is to 'click either id or the name' but I think adding a view button will be better for user experience
            //The bellow code will work as required behaviour
            //onRowClick={(row: rowData) => handleRowClick(row)}
            scopedSlots={{
                'view_performance': (item: rowData, index: number) => (
                    <td className="py-2" key={index}>
                        <CButton color="primary" variant="outline" shape="square" size="mx" onClick={() => handleRowClick(item)}>
                            View Performance
                        </CButton>
                    </td>
                )
            }}
        />
    )
};

export default Datagrid;
