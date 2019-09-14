<template>
  <div id="app">
    <section id="hero" class="panel">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
            <h1 class="text-center">
              Messing with the Last.FM API
            </h1>
          </div>
        </div>
      </div>
    </section>
    <section class="panel bg-light">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h2 class="text-center">About this project</h2>
            <p class="text-center">
              This simple vue app fetches data from <a target="_blank" href="https://www.last.fm/user/Moglash">my Last.FM account</a>.
              Unfortuanetly the Last.FM API does not provide the possibility to retrieve artist images anymore. My next goal is to retrieve artist images
              from another source using the MBID (Musicbrainz ID).
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="panel">
      <div class="container">
        <div class="row justify-content-center align-items-center mb-4">
          <div class="col-xl-6 col-lg-8 col-md-10 col-sm-12 col-xs-12">
            <p class="text-center">
              <strong>Recent track: </strong><span id="latestTrack">{{ currentlyPlaying }}</span>
            </p>
            <select value="overall" v-model="period" @change="getArtist($event)" class="custom-select">
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
    </section>
    <section>
      <div class="container">
          <div id="list">
            <div style="width:100%;">
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
                  <tr v-for="(artist, index) in data" v-bind:key="artist.name">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ artist.name }}</td>
                    <td>{{ artist.playcount }}</td>
                    <td>{{ artist.mbid }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </section>
  </div>
    
</template>

<script>
import LastFmService from './services/LastFmService'

export default {
  name: 'app',
  data(){
    return {
      data: '',
      currentlyPlaying: '',
      period: ''
    }
  },
  async created(){
    this.data = await LastFmService.getTopArtists();
    this.currentlyPlaying = await LastFmService.getCurrentTrack();
    setInterval( async () => {
      this.currentlyPlaying = await LastFmService.getCurrentTrack();
    }, 10000)
    

  },
  methods: {

    async getArtist(period){
      this.data = await LastFmService.getArtistsFromPeriod(period.target.value)
    },

     getArtistImage(artist){
      if(artist == "Radiohead"){
        return "https://ksassets.timeincuk.net/wp/uploads/sites/55/2017/05/RadioheadGettyImages-80530620-920x584.jpg"
      } else if(artist == "David Bowie") {
        return "https://img.discogs.com/eyk-jmmtAvlyeCb4Zj4N4LTejsw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-10263-1521181152-8217.jpeg.jpg"
      }
    }
  }
  
}
</script>