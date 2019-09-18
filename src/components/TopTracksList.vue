<template>
    <div id="topTracksList">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Track</th>
                <th scope="col">Artist</th>
                <th scope="col">Playcount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(track, index) in topTracks" v-bind:key="track.name">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ track.name }}</td>
                <td>{{ track.artist.name }}</td>
                <td>{{ track.playcount }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import LastFmService from './../services/LastFmService'

export default {
    name: 'TopTracksList',
    data(){
        return {
            topTracks: '',
            period: ''
        }
    },
    async created() {
        this.topTracks = await LastFmService.getTopTracksFromPeriod("overall")
    }
    
}
</script>

<style>

</style>