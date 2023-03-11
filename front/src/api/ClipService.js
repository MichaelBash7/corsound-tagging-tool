import axios from "axios";

export default class ClipService {
    static async getUserStat(login) {
        if (!login) return
        return await axios.get(`http://54.246.41.115/videos/get_stats/?dataset=bc_queries&reviewer_email=${login}&token=11`, {
            headers: {
                'accept': 'application/json',
                'x-token': '11'
            }
        })
    }

    static async getAllClips(limit = 5, page = 1) {
        return await axios.get('http://54.246.41.115/videos/subclips_all/?dataset=bc_queries&limit=100&token=11', {
            // params: {
            //     _limit: limit,
            //     _page: page
            // },
            headers: {
                'accept': 'application/json',
                'x-token': '11'
            }
        })
    }

    static async putOkClips(okBody) {
        return await axios.put('http://54.246.41.115/videos/subclips/?token=11', okBody, {
            headers: {
                'accept': 'application/json',
                'x-token': '11',
                'Content-Type': 'application/json'
            }
        })
    }
    static async putNotOkClips(notOkBody) {
        return await axios.put('http://54.246.41.115/videos/subclips/?token=11', notOkBody,{
            headers: {
                'accept': 'application/json',
                'x-token': '11',
                'Content-Type': 'application/json'
            }
        })
    }
}
