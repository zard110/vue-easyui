<template>
  <ce-layout id="parent">
    <ce-layout-panel slot="north" region="north" :size="64">north</ce-layout-panel>
    <ce-layout-panel slot="south" region="south" :size="64">south</ce-layout-panel>
    <ce-layout-panel slot="west" region="west" :size="200" :split="true">west</ce-layout-panel>
    <ce-layout-panel slot="east" region="east" :size="200">east</ce-layout-panel>
    <ce-layout-panel slot="center" region="center">

      <ce-layout id="child">

        <ce-layout-panel slot="north" region="north" :size="64">north</ce-layout-panel>
        <ce-layout-panel slot="south" region="south" :size="64">south</ce-layout-panel>
        <ce-layout-panel slot="west" region="west" :size="100">west</ce-layout-panel>
        <ce-layout-panel slot="east" region="east" :size="100">east</ce-layout-panel>
        <ce-layout-panel slot="center" region="center">

          <ce-layout id="child_child">

            <ce-layout-panel slot="north" region="north" :size="64">north</ce-layout-panel>
            <ce-layout-panel slot="south" region="south" :size="64">south</ce-layout-panel>
            <ce-layout-panel slot="west" region="west" :size="100">west</ce-layout-panel>
            <ce-layout-panel slot="east" region="east" :size="100">east</ce-layout-panel>
            <ce-layout-panel slot="center" region="center">center</ce-layout-panel>

          </ce-layout>


        </ce-layout-panel>

      </ce-layout>

    </ce-layout-panel>

  </ce-layout>

</template>



<script>
  export default {

  }
</script>
