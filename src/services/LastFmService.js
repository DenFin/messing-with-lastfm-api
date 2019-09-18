import axios from 'axios'

const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=Moglash&api_key=5042d5723800d5be432a687c5eacf45d&format=json`
const urlTopTracks = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=Moglash&api_key=5042d5723800d5be432a687c5eacf45d&format=json`
const lastFmApi = "https://ws.audioscrobbler.com"
const userName = "Moglash"
const apiKey = "2d03e7341ad8155773382f8b28a2e0c0"

class LastFmService {

	
    static getTopArtists(){

        return new Promise( async (resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data.topartists.artist;
                resolve(data);
            } catch(error){
                reject(error);
            }
        })
    }

    static getArtistsFromPeriod(period){

        return new Promise( async (resolve, reject) => {
            try{
                const res = await axios.get(`${url}&period=${period}`);
                const data = res.data.topartists.artist;
                resolve(data);
            } catch(error){
                reject(error);
            }
        })
    }

    static getCurrentTrack(){

        let url = `${lastFmApi}/2.0/?method=user.getrecenttracks&user=${userName}&api_key=${apiKey}&format=json`;

        return new Promise( async (resolve, reject) => {
            try{
                const res = await axios.get(url);
                const artist = res.data.recenttracks.track[0].artist["#text"]
                const track = res.data.recenttracks.track[0].name
                const data = `${artist} – ${track}`
                resolve(
                    data
                );
            } catch(error){
                reject(error);
            }
        })
    }

    static getTopTracksFromPeriod(period){
        return new Promise ( async (resolve, reject) => {
            try{
                const res = await axios.get(`${urlTopTracks}&period=${period}`);
                const data = res.data.toptracks.track
                console.log(data)
                resolve(data)
            } catch(error){
                reject(error)
            }
        })
    }


}

export default LastFmService;