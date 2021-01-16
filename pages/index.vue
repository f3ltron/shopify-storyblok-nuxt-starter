<template>
  <div v-if="story.content">
    <template v-for="component in story.content.body">
      <component
        :is="`blok-${dashify(component.component)}`"
        v-if="
          availableComponents.includes(`blok-${dashify(component.component)}`)
        "
        :key="component._uid"
        :blok="component"
      ></component>
      <Placeholder v-else :key="component._uid" :blok="component" />
    </template>
  </div>
</template>

<script>
import dashify from 'dashify'
import { availableComponents } from '../plugins/components'
import Placeholder from '../components/Placeholder'

export default {
  components: {
    Placeholder,
  },
  async asyncData(context) {
    try {
      const { data } = await context.app.$storyapi.get('cdn/stories/home', {
        // version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        version: 'draft',
      })
      console.log(data)

      return {
        story: data.story,
      }
    } catch (e) {
      console.log(e)
      //  if (!res.response) {
      //     context.error({
      //       statusCode: 404,
      //       message: 'Failed to receive content from api',
      //     })
      //   } else {
      //     context.error({
      //       statusCode: res.response.status,
      //       message: res.response.data,
      //     })
      //   }
    }
  },
  data() {
    return {
      story: {},
      error: null,
      availableComponents,
    }
  },
  mounted() {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else {
        window.location.reload()
      }
    })
  },
  methods: {
    dashify,
  },
}
</script>
