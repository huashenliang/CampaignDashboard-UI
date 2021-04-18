import axios from "axios";

//Using live api
const baseUrl = process.env.REACT_APP_API_URL || "http://k8s-dashboar-ingressd-ba97894f99-1331663444.us-east-1.elb.amazonaws.com";

export const fetchCampaignList = async () => {
    const res = await axios.get(`${baseUrl}/campaigns`);
    return res;
}

export const fetchCampaginDetailById = async (id: number, time: number) => {
    const res = await axios.get(`${baseUrl}/campaigns/${id}?number=${time}`);
    return res;
}


