<template>
    <div class="selectDropdown">
        <select value="overall" v-model="period" @change="getDataFromPeriod($event)" class="custom-select">
              <option value="" selected disabled hidden>Choose here</option>
              <option value="7day">Last 7 days</option>
              <option value="1month">Last 30 days</option>
              <option value="3month">Last 90 days</option>
              <option value="6month">Last 180 days</option>
              <option value="12month">Last 365 days</option>
              <option selected value="overall" >All time</option>
            </select>
    </div>
</template>

<script>
import LastFmService from './../services/LastFmService'

export default {
    name: 'SelectDropdown',
    data() {
        return {
            period: '',
            data: ''
        }
    },
    methods: {
    async getDataFromPeriod(period){
        this.data = await LastFmService.getArtistsFromPeriod(period.target.value)
        this.$emit("data", this.data)
    },
    async getArtistsFromPeriod(period){
      this.data = await LastFmService.getArtistsFromPeriod(period.target.value)
    },
    async getTracksFromPeriod(period){
      this.data = await LastFmService.getTopTracksFromPeriod(period.target.value)
    }
  }
}
</script>

<style>

</style>