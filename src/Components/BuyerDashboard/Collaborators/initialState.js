const initialState = {
  name: "",
  isNameError: false,
  nameErrorMessage: "",

  price: "1",
  isPriceError: false,
  priceErrorMessage: "",

  cat: "",
  isCatError: false,
  catErrorMessage: "",

  subCat: "",
  isSubCatError: false,
  subCatErrorMessage: "",

  subSubCat: "",
  isSubSubCatError: false,
  subSubCatErrorMessage: "",

  desc: "",
  isDescError: false,
  descErrorMessage: "",

  att: [],
  isAttError: false,
  attErrorMessage: "",

  installmentPlan: [],
  isInstallmentPlanError: false,
  installmentPlanErrorMessage: "",

  remaining: 0,
  isRemainingError: false,
  remainingErrorMessage: "",

  downPayment: 0,
  isDownpaymentError: false,
  downPaymentErrorMessage: "",

  duration: "Month",
  isDurationError: false,
  durationErrorMessage: "",

  images: [
    {
      file: null,
      filename: null,
      path: null,
      progress: 0,
      isError: false,
      serverfilename: null,
      message: "No File Choosen",
    },
    {
      file: null,
      filename: null,
      path: null,
      progress: 0,
      isError: false,
      serverfilename: null,
      message: "No File Choosen",
    },
    {
      file: null,
      filename: null,
      path: null,
      progress: 0,
      isError: false,
      serverfilename: null,
      message: "No File Choosen",
    },
    {
      file: null,
      filename: null,
      path: null,
      progress: 0,
      isError: false,
      serverfilename: null,
      message: "No File Choosen",
    },
  ],
  isImagesError: false,
  imagesErrorMessage: "",
};

export default initialState;
