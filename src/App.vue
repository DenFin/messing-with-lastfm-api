<template>
  <div id="app">
    <section id="hero" class="panel">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-xl-6 col-lg-10 col-md-10 col-sm-12 col-xs-12">
            <h1 class="">
              Messing with the Last.FM API
            </h1>
          </div>
        </div>
      </div>
    </section>
    <section class="panel bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h2 class="">About this project</h2>
            <p class="">
              This simple Vue.js app fetches data from <a target="_blank" href="https://www.last.fm/user/Moglash">my Last.FM account</a>.
              Unfortuanetly the Last.FM API does not provide the possibility to retrieve artist images anymore. My next goal is to retrieve artist images
              from another source, for example using the MBID (Musicbrainz ID). Furthermore I want to add more features, like pagination.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="panel">
      <div class="container">
        <div class="row justify-content-center align-items-center mb-4">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h2>Top Artists</h2>
            <p class="">
              <strong>Recent track: </strong><span id="latestTrack">{{ currentlyPlaying }}</span>
            </p>
            <label for="">Choose a time period</label>
            <select value="overall" v-model="period" @change="getArtistsFromPeriod($event)" class="custom-select">
              <option value="" selected disabled hidden>Choose here</option>
              <option value="7day">Last 7 days</option>
              <option value="1month">Last 30 days</option>
              <option value="3month">Last 90 days</option>
              <option value="6month">Last 180 days</option>
              <option value="12month">Last 365 days</option>
              <option selected value="overall" >All time</option>
            </select>
          </div>
        </div>
      </div>
      <div class="container">
         <TopArtistsList />
      </div>
    </section>
    <section class="panel bg-light">
      <div class="container">
        <div class="row justify-content-center align-items-center mb-4">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h2>Top Tracks</h2>
            <label for="">Choose a time period</label>
            <SelectDropdown @data="updateData" />
            <TopTracksList />
          </div>
        </div>
      </div>
    </section>
  </div>
    
</template>

<script>
import LastFmService from './services/LastFmService'

import SelectDropdown from './components/SelectDropdown'
import TopArtistsList from './components/TopArtistsList'
import TopTracksList from './components/TopTracksList'

export default {
  name: 'app',
  components: {
    SelectDropdown,
    TopArtistsList,
    TopTracksList
  },
  data(){
    return {
      topArtists: '',
      topTracks: '',
      currentlyPlaying: '',
      period: '',
      periodTracks: '',
      childData: ''
    }
  },
  async created(){
    this.topArtists = await LastFmService.getTopArtists();
    this.topTracks = await LastFmService.getTopTracksFromPeriod("overall")
    this.currentlyPlaying = await LastFmService.getCurrentTrack();
    setInterval( async () => {
      this.currentlyPlaying = await LastFmService.getCurrentTrack();
    }, 10000)
  },
  methods: {
    updateData(test){
      this.childData = test
    },
    async getArtistsFromPeriod(period){
      this.topArtists = await LastFmService.getArtistsFromPeriod(period.target.value)
    },
    async getTracksFromPeriod(period){
      this.topTracks = await LastFmService.getTopTracksFromPeriod(period.target.value)
    },
    // async getArtistImage(artist){
    //   this.test = await MusicBrainz
    // }
  }
  
}
</script>