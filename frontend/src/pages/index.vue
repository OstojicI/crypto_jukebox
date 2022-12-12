<template>
  <v-row justify="center" align="center" class="d-flex">
    <h4 class="display-1 font-weight-bold pa-4">CRYPTO JUKEBOX</h4>
    <v-snackbar v-model="snackbar" transition="scale-transition" top color="success accent-4" :timeout="3000">
      Song successfully ordered
    </v-snackbar>
    <v-container>
      <v-row justify="center">
        <!--          <p v-if="this.queue[0]">{{ this.queue[0].name }}</p>-->
        <v-card class="d-flex flex-column col-12 col-lg-7">
          <vuetify-audio :flat="true" :file="file" :autoPlay="true" :ended="ended" color="red"></vuetify-audio>
          <music-list :songs="queue" title="Ordered songs" :hide-pagination="true"></music-list>
        </v-card>
        <v-card class="col-12 col-lg-5">
          <music-list :songs="songs" @openModal="openPlaySongDialog" class="my-4" title="Playlist"></music-list>
        </v-card>
        <v-dialog v-model="dialogPlaySongModel" max-width="800px">
          <v-card v-if="song">
            <v-card-title class="text-h7">Do you want to play a song {{ song.name }} - {{ song.author }} ?
            </v-card-title>
            <v-card-subtitle class="my-1">Song price: {{ songPrice }} XLM</v-card-subtitle>
            <v-card-text>
              <p>By clicking on the 'OK' button, you will start the payment process.</p>
<!--                You need to deposit {{ songPrice }} XLM within 30 minutes.</p>-->
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="closePlaySongDialog">Cancel</v-btn>
              <v-btn color="primary" text @click="openPaySongDialog">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogPaySongModel" max-width="500px">
          <v-card>
            <v-card-title class="text-h6">PAYMENT</v-card-title>
            <v-card-subtitle class="py-1"><strong>Transaction will fail if you do not enter the correct MEMO code !</strong>
            </v-card-subtitle>
            <v-card-text>Deposit a minimum of <b>{{songPrice}} XLM</b> to the following address:
              <p class="font-weight-black">{{ stellarDestination }}</p>
              <h2>Transaction MEMO code: {{ memoCode }}</h2>
              <qr-code v-if="this.song"
                       :text="this.qrCodeUri"
                       :size="200"
                       error-level="Q"
                       color="#fff"
                       bg-color="#0b395c"
                       class="d-flex justify-center mt-4"
              >
              </qr-code>
            </v-card-text>


            <v-card-actions>
              <v-spacer></v-spacer>
              <!--          <v-btn color="blue darken-1" text @click="closePaySongDialog">Odustani</v-btn>-->
              <v-btn color="primary" text @click="closePaySongDialog">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import {songs} from "@/helpers/Songs/songs";

export default {
  name: 'IndexPage',

  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/', // connect to '/index'
    })

    /* Listen for events: */
    this.socket
      .on('stellar', async (msg) => {
        this.addSongToQueue(msg);
        this.snackbar = true;
      })
  },

  data() {

    return {
      sequence: 0,
      song: null,
      dialogPlaySongModel: false,
      dialogPaySongModel: false,
      memoCode: null,
      file: null,
      snackbar: false,
      stellarDestination: process.env.stellarReceiverAddress,
      songPrice: process.env.songPrice,
      songs: songs,
      queue: []
      // queue: Get data FROM API
    }
  },

  computed: {
    qrCodeUri() {
      return `web+stellar:pay?destination=${this.stellarDestination}&amount=${this.songPrice}&memo=${this.memoCode}&memo_type=MEMO_TEXT&msg=pay%20me%20with%20lumens`
    }
  },

  watch: {
    'queue.0': {
      handler: function (val, oldVal) {
        // If the queue was empty play new song immediately
        if (!oldVal)
          this.file = this.queue[0].src;
      },
      deep: true
    }
  },

  methods: {
    playNext() {
      if (this.queue.length > 0)
        this.file = this.queue[0].src;
    },
    openPlaySongDialog(song) {
      this.dialogPlaySongModel = true;
      this.song = song;
    },
    ended() {
      this.queue.shift();
      this.playNext()
    },
    closePlaySongDialog() {
      this.dialogPlaySongModel = false;
    },
    openPaySongDialog() {
      this.closePlaySongDialog();
      this.dialogPaySongModel = true;
      this.startPayment();
    },
    closePaySongDialog() {
      this.dialogPaySongModel = false;
    },
    async startPayment() {
      let response = await this.$axios.post('transactions', {
        song_id: this.song.id,
        amount: this.songPrice,
      });
      this.memoCode = response.data.code;
      // Hit API to create transaction and return memo code
    },
    addSongToQueue(transaction) {
      this.queue.push(this.songs.find(item => item.id === transaction.song_id));
    }
  },
}
</script>

<style>

</style>
