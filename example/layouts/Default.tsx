import { defineComponent } from 'vue'

export const DefaultLayout = defineComponent({
  setup(ctx, { slots }) {
    return () => (
      <div>
        <main class="max-w-60rem m-auto px-4 py-10">{slots.default?.()}</main>
      </div>
    )
  },
})
