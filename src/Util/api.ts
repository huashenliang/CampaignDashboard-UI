import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const fetchCampaignList = async () => {
    const res = await axios.get(`${baseUrl}/campaigns`);
    return res;
}



