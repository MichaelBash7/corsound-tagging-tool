import axios from "axios";

export default class ClipService {
    
    static API_HOST = 'http://54.246.41.115'
    static CONFIG = {
        headers: {
            'accept': 'application/json',
            'x-token': '11'
        }
    }

    static async getVideoById(videoId) {
        if (!videoId) return
        return await axios.get(`${this.API_HOST}/videos/${videoId}?dataset=bc_queries&token=11`, this.CONFIG)
    }

    static async getDatasets() {
        return await axios.get(`${this.API_HOST}/videos/get_datasets/?token=11`, this.CONFIG)
    }

    static async getUserStat(email) {
        if (!email) return
        return await axios.get(`${this.API_HOST}/videos/get_stats/?dataset=bc_queries&reviewer_email=${email}&token=11`, this.CONFIG)
    }

    static async getUserVideos(email, limit = 100, offset = 0 ) {
        if (!email) return
        return await axios.get(`${this.API_HOST}/videos/subclips_all/?dataset=bc_queries&reviewer_email=${email}&limit=${limit}&offset=${offset}&&token=11
`, this.CONFIG)
    }

    static async getAllClips(limit = 5, page = 1) {
        return await axios.get(`${this.API_HOST}/videos/subclips_all/?dataset=bc_queries&limit=100&token=11`, this.CONFIG)
    }

    static async sendClipData(data) {
        return await axios.put(`${this.API_HOST}/videos/subclips/?token=11`, data, this.CONFIG)
    }
    static async sendVideoData(data) {
        return await axios.put(`${this.API_HOST}/videos/?token=11`, data,this.CONFIG)
    }
}
