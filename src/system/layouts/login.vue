<template>
  <v-app>
    <v-content>
      <!-- app-bar -->
      <v-app-bar fixed :clipped-left="clipped" app dense>
        <v-toolbar-title>Training </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>

      <!-- メインコンテンツ -->
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer fixed app>
      <footer-comp />
    </v-footer>
  </v-app>
</template>

<script></script>
