<template>
  <div class="sbox-init">
    <div class="row-title">常用</div>
    <div class="row">
      <div class="item" v-for="t in templates" :key="t.id">
        <img :src="t.img" :alt="t.name">
        <div class="item-title">{{t.name}}</div>
      </div>
    </div>
    <div class="row-title">推荐</div>
    <div class="row">
      <div class="item" v-for="t in templates" :key="t.id">
        <img :src="t.img" :alt="t.name">
        <div class="item-title">{{t.name}}</div>
      </div>
    </div>
    <div class="row-title">门户</div>
    <div class="row">
      <div class="item" v-for="t in templates" :key="t.id">
        <img :src="t.img" :alt="t.name">
        <div class="item-title">{{t.name}}</div>
      </div>
    </div>
    <div class="row-title">公文 </div>
    <div class="row">
      <div class="item" v-for="t in templates" :key="t.id">
        <img :src="t.img" :alt="t.name">
        <div class="item-title">{{t.name}}</div>
      </div>
    </div>
  </div>
</template>