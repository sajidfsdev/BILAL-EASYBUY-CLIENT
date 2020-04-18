const BodyBuilder = (state) => {
  const installmentPlan = {
    installmentPlan: state.installmentPlan,
    downPayment: state.downPayment,
    duration: state.duration,
  };

  return {
    installmentPlan: installmentPlan,
  };
}; //.........................

export default BodyBuilder;
