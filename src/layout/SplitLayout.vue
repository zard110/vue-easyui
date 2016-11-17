<script>
  export default {

  }
</script>

<template>
  <ce-layout id="parent">
    <ce-layout-panel region="north" :size="64">north</ce-layout-panel>

    <ce-layout-panel region="south" :size="64" :split="true" :collapsible="true">south</ce-layout-panel>

    <ce-layout-panel region="west" :size="320" :split="true" title="Menu"
                     :collapsible="true">
      west
    </ce-layout-panel>

    <ce-layout-panel region="east" :size="200" :collapsible="true">east</ce-layout-panel>

    <ce-layout-panel region="center" title="Container">

      <!--<ce-layout id="child">-->
        <!--<ce-layout-panel slot="north" region="north" :size="84" :split="true">north</ce-layout-panel>-->
        <!--<ce-layout-panel slot="south" region="south" :size="64" :split="false">south</ce-layout-panel>-->
        <!--<ce-layout-panel slot="west" region="west" :size="200"  :split="false">west</ce-layout-panel>-->
        <!--<ce-layout-panel slot="east" region="east" :size="200"  :split="false">east</ce-layout-panel>-->
        <!--<ce-layout-panel slot="center" region="center">-->
          <!--center-->
        <!--</ce-layout-panel>-->
      <!--</ce-layout>-->

    </ce-layout-panel>

  </ce-layout>

</template>
