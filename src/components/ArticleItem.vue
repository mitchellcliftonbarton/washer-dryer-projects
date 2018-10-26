<template>
  <div class="tile">
    <router-link :to="`/news/${article.link}`" class="image-container">
      <img :src="require(`@/assets/img/${article.image}`)">
    </router-link>

    <router-link :to="`/news/${article.link}`">{{ article.title }}</router-link>
    <p>{{ article.date }}</p>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: [
    'article'
  ]
}
</script>
