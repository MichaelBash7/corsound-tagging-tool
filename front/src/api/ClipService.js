import axios from "axios";

export default class ClipService {
    
    static API_HOST = 'http://54.246.41.115';
    static async getDatasets() {
        return await axios.get(`${this.API_HOST}/videos/get_datasets/?token=11`, {
            headers: {
                'accept': 'application/json',
                'x-token': '11'
            }
        })
    }

    static async getUserStat(email) {
        if (!email) return
        return await axios.get(`${this.API_HOST}/videos/get_stats/?dataset=bc_queries&reviewer_email=${email}&token=11`, {
            headers: {
                'accept': 'application/json',
                'x-token': '11'
            }
        })
    }

    static async getUserVideos(email, limit = 100, offset = 0 ) {
        if (!email) return
        return await axios.get(`${this.API_HOST}/videos/subclips_all/?dataset=bc_queries&reviewer_email=${email}&limit=${limit}&offset=${offset}&&token=11
`, {
            headers: {
                'accept': 'application/json',
                'x-token': '11'
            }
        })
    }

    static async getAllClips(limit = 5, page = 1) {
        return await axios.get(`${this.API_HOST}/videos/subclips_all/?dataset=bc_queries&limit=100&token=11`, {
            headers: {
                'accept': 'application/json',
                'x-token': '11'
            }
        })
    }

    static async sendClipData(data) {
        return await axios.put(`${this.API_HOST}/videos/subclips/?token=11`, data, {
            headers: {
                'accept': 'application/json',
                'x-token': '11',
            }
        })
    }
    static async sendVideoData(data) {
        console.log(data)
        return

        return await axios.put(`${this.API_HOST}//videos/?token=11`, data,{
            headers: {
                'accept': 'application/json',
                'x-token': '11',
            }
        })
    }
}
