import axios from "axios";

export default class ClipService {
    static async getAllClips(limit = 5, page = 1) {
        return await axios.get('http://54.246.41.115/videos/subclips_all/?nationality=ara&limit=50&token=11', {
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
