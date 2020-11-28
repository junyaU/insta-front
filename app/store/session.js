export const state = () => ({
  data : []
});

export const mutations = {
  add(state, info){
    state.data.push(
      info
    )
  },

  delete(state){
    state.data.length = 0;
  }
}