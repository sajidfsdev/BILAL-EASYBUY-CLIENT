import InitialState from "./initialState";
import * as Types from "./types";

const Reducer = (state = InitialState, action) => {
  //swicth starts....
  switch (action.type) {
    case Types.SET_ALL_DATA:
      return {
        ...state,
        name: action.payload.name,

        price: action.payload.price,

        cat: action.payload.cat,

        subCat: action.payload.subCat,

        subSubCat: action.payload.subSubCat,

        desc: action.payload.desc,

        att: [...action.payload.att],

        images: [...action.payload.images],

        installmentPlan: [...action.payload.installmentPlan],
        downPayment: action.payload.downPayment,
        duration: action.payload.duration,
      };
      break;
    case Types.SET_NAME_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        isNameError: false,
        nameErrorMessage: "",
      };
      break;

    case Types.SET_NAME_FAIL:
      return {
        ...state,
        name: action.payload.name,
        isNameError: true,
        nameErrorMessage: action.payload.errorMessage,
      };
      break;

    case Types.SET_PRICE_SUCCESS:
      return {
        ...state,
        price: action.payload.price,
        isPriceError: false,
        priceErrorMessage: "",
      };
      break;

    case Types.SET_PRICE_FAIL:
      return {
        ...state,
        price: action.payload.price,
        isPriceError: true,
        priceErrorMessage: action.payload.errorMessage,
      };
      break;

    case Types.SET_CAT_SUCCESS:
      return {
        ...state,
        cat: action.payload.cat,
        isCatError: false,
        catErrorMessage: "",
      };
      break;

    case Types.SET_CAT_FAIL:
      return {
        ...state,
        cat: action.payload.cat,
        isCatError: true,
        catErrorMessage: action.payload.errorMessage,
      };
      break;

    case Types.SET_SUBCAT_SUCCESS:
      return {
        ...state,
        subCat: action.payload.subCat,
        isSubCatError: false,
        subCatErrorMessage: "",
      };
      break;

    case Types.SET_SUBCAT_FAIL:
      return {
        ...state,
        subCat: action.payload.subCat,
        isSubCatError: true,
        subCatErrorMessage: action.payload.errorMessage,
      };
      break;

    case Types.SET_SUBSUBCAT_SUCCESS:
      return {
        ...state,
        subSubCat: action.payload.subSubCat,
        isSubSubCatError: false,
        subSubCatErrorMessage: "",
      };
      break;

    case Types.SET_SUBSUBCAT_FAIL:
      return {
        ...state,
        subSubCat: action.payload.subSubCat,
        isSubSubCatError: true,
        subSubCatErrorMessage: action.payload.errorMessage,
      };
      break;

    case Types.SET_DESC_SUCCESS:
      return {
        ...state,
        desc: action.payload.desc,
        isDescError: false,
        descErrorMessage: "",
      };
      break;

    case Types.SET_DESC_FAIL:
      return {
        ...state,
        desc: action.payload.desc,
        isDescError: true,
        descErrorMessage: action.payload.desc,
      };
      break;

    case Types.SET_ATT_SUCCESS:
      return {
        ...state,
        att: [...action.payload.att],
        isAttError: false,
        attErrorMessage: "",
      };
      break;

    case Types.SET_ATT_FAIL:
      return {
        ...state,
        att: [...action.payload.att],
        isAttError: true,
        attErrorMessage: action.payload.errorMessage,
      };
      break;

    case Types.SET_INSTALLMENTPLAN_SUCCESS:
      return {
        ...state,
        installmentPlan: action.payload.installmentPlan,
        isInstallmentPlanError: false,
        installmentPlanErrorMessage: "",
      };
      break;

    case Types.SET_INSTALLMENTPLAN_FAIL:
      return {
        ...state,
        installmentPlan: action.payload.installmentPlan,
        isInstallmentPlanError: true,
        installmentPlanErrorMessage: action.payload.errorMessage,
      };
      break;

    case Types.SET_REMAINING_SUCCESS:
      return {
        ...state,
        remaining: action.payload.remaining,
        isRemainingError: false,
        remainingErrorMessage: "",
      };
      break;

    case Types.SET_REMAINING_FAIL:
      return {
        ...state,
        remaining: action.payload.remaining,
        isRemainingError: true,
        remainingErrorMessage: action.payload.errorMessage,
      };
      break;

    case Types.SET_DOWNPAYMENT_SUCCESS:
      return {
        ...state,
        downPayment: action.payload.downPayment,
        isDownpaymentError: false,
        downPaymentErrorMessage: "",
      };
      break;

    case Types.SET_DOWNPAYMENT_FAIL:
      return {
        ...state,
        downPayment: action.payload.downPayment,
        isDownpaymentError: true,
        downPaymentErrorMessage: action.payload.errorMessage,
      };
      break;

    case Types.SET_DURATION_SUCCESS:
      return {
        ...state,
        duration: action.payload.duration,
        isDurationError: false,
        durationErrorMessage: "",
      };
      break;

    case Types.SET_DURATION_FAIL:
      return {
        ...state,
        duration: action.payload.duration,
        isDurationError: true,
        durationErrorMessage: action.duration.errorMessage,
      };
      break;

    case Types.SET_IMAGES_SUCCESS:
      return {
        ...state,
        images: [...action.payload.images],
        isImagesError: false,
        imagesErrorMessage: "",
      };
      break;

    case Types.SET_IMAGES_FAIL:
      return {
        ...state,
        images: [...action.payload.images],
        isImagesError: true,
        imagesErrorMessage: action.payload.errorMessage,
      };
      break;
    default:
      return state;

    case Types.REFRESH_STATE:
      return {
        ...state,
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
      break;
  }
  //switch ends......
}; //............................

export default Reducer;
