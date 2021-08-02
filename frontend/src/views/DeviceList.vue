<template>
  <div class="DevList">
    <div style="text-align: center">
      <h2>当前设备数量：{{ getDeviceCount }}</h2>
    </div>
    <div class="设备列表">
      <IconBtn
        images="/images/human.png"
        moduleName="人体红外感知器精灵"
        @click.native="selectDeviceType(1)"
      />
      <IconBtn
        images="/images/humiture.png"
        moduleName="温湿度感知器精灵"
        @click.native="selectDeviceType(2)"
      />
    </div>
  </div>
</template>

<script>
import IconBtn from "../components/iconButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "Devlist",
  data: function () {
    return {
      data: [],
    };
  },
  computed: {
    ...mapGetters(["getDeviceCount"]),
  },
  components: {
    IconBtn,
  },
  created: async function () {
    this.data = await this.axios.get("/api/devlist");
    this.$store.commit("updateDevlist", this.data.data);
  },
  methods: {
    selectDeviceType(value) {
      // 1:人体红外感知器    2.温湿度感知器
      let humanId = "";
      let tempId = "";
      for (let i = 0; i < this.$store.state.devlist.length; i++) {
        let dev = this.$store.state.devlist[i];
        if (dev.info.report.name === "smart-per01") {
          tempId = dev.devid;
        }
        if (dev.info.report.name === "smart") {
          humanId = dev.devid;
        }
      }
      if (value === 1) {
        this.$router.push({ path: "/zddc", query: { devId: humanId } });
      } else if (value === 2) {
        this.$router.push({ path: "/sddc", query: { devId: tempId } });
      }
    },
  },
};
</script>

<style scoped>
.title {
  padding: 20px;
  font-weight: bolder;
  font-size: x-large;
}
</style>
