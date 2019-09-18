<template>
    <div id="topArtistsList">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Playcount</th>
                    <th scope="col">MBID</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(artist, index) in topArtists" v-bind:key="artist.name">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ artist.name }}</td>
                    <td>{{ artist.playcount }}</td>
                    <td>{{ artist.mbid }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import LastFmService from './../services/LastFmService'

export default {
    name: 'TopArtistsList',
    props: {
        dataTest: {
            type: String
        }
    },
    data(){
        return {
            topArtists: '',
            period: ''
        }
    },
    methods: {

    },
    async created(){
        this.topArtists = await LastFmService.getTopArtists();
    },
    watch: {
        dataTest(){
            this.topArtists = this.dataTest
        }
    }
}
</script>

<style>

</style>