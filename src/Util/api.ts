import axios from "axios";

//Using live api
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const fetchCampaignList = async () => {
    const res = await axios.get(`${baseUrl}/campaigns`);
    return res;
}

export const fetchCampaginDetailById = async (id: number, time: number) => {
    const res = await axios.get(`${baseUrl}/campaigns/${id}?number=${time}`);
    return res;
}


