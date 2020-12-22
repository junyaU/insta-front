export default  function ({store, redirect}) {
  if(!store.state.session.data[0]){
    alert("この機能を使うにはログインしてください");
    return redirect("/login");
  }
}