const BodyBuilder = (state, id) => {
  //window.alert(id);
  const name = state.name;
  const price = parseInt(state.price);
  const cat = state.cat;
  const subCat = state.subCat;
  const subSubCat = state.subSubCat;
  const desc = state.desc === "" ? " " : state.desc;
  const att = [...state.att];
  const installmentPlan = {
    installmentPlan: state.installmentPlan,
    downPayment: state.downPayment,
    duration: state.duration,
  };
  const images = [];
  state.images.forEach((element) => {
    if (
      element.isError === false &&
      element.serverfilename != null &&
      element.progress == 100
    ) {
      images.push(element.serverfilename);
    }
  });
  return {
    name: name,
    id: id,
    price: price,
    cat: cat,
    subCat: subCat,
    subSubCat: subSubCat,
    desc: desc,
    att: [...att],
    installmentPlan: installmentPlan,
    images: [...images],
  };
}; //.........................

export default BodyBuilder;
