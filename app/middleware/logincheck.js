export default  function ({store, redirect}) {
  if(!store.state.session.data[0]){
    return redirect("/login");
  }
}