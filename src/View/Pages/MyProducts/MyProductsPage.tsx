import { useState, useEffect } from "react";
import BarHolder from "../../Components/Navigation/BarHolder";
import myProductsComponents from "../../Components/MyProducts";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ManualCreateModalToggling } from "../../../Controller/Toggling/toggleCreateModal";
import {
  createProductRemote,
  fetchMyProducts,
  productSliceActions,
} from "../../../Model/Local/ProductSlice";
import hiShopSupabase from "../../../Model/Remote/hiShop";
import { defaultSliceActions } from "../../../Model/Local/DefaultSlice";

function MyProductsPage() {
  const [fileState, setFileState] = useState([]);
  const dispatch = useDispatch();
  const { HeaderComponent, CreateModal, EachProductList } =
    myProductsComponents;
  const {
    productSlice: {
      filterParam,
      main: { productsImageName, name, description, price, quantity },
      myProducts,
      myProductsCopy,
    },
    userSlice: { user: { purchasedProducts } },
  } = useSelector((state: any) => state);
  const {
    filterProduct,
    updateProductMain,
    updateProductImagesName,
    setFilterDefault,
  } = productSliceActions;
  const { toggleIsLoading } = defaultSliceActions;

  // functions
  function searchSubmitHandler(e: any) {
    e.preventDefault();
  }
  function searchOnChangeHandler(e: any) {
    const { name, value } = e.target;
    // @ts-ignore
    const products = [...purchasedProducts, ...myProductsCopy].filter(
      (Item: any) =>
        Item.name.toLowerCase().includes(value.toLowerCase()) && Item
    );
    // @ts-ignore

    dispatch(filterProduct({ name, value, type: "myProducts", products }));
  }

  function fileHandler(e: any) {
    // clearing the filestate before transforming the files
    setFileState([]);
    const { length, ...rest } = e.target.files;
    const allFiles = Object.values(rest);
    // reading the received file and
    //turning it into the accepted format
    allFiles.forEach((elem: any) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(elem);
      reader.addEventListener("loadend", (e: any) => {
        const date = new Date().getUTCMilliseconds();
        const obj = { name: elem?.name + date, file: e.target.result };
        //   updating the file state
        //   @ts-ignore
        setFileState((prev) => {
          const arr = [...prev, obj];
          return arr;
        });
      });
    });
  }

  // submit handler
  async function createProductSubmitHandler(e: any) {
    e.preventDefault();
    if (!name || !description || !price || !quantity) {
      alert("Input field can't be empty");
      return;
    }
      setTimeout(() => {
        // @ts-ignore
         ManualCreateModalToggling()
      }, 2000);
    dispatch(toggleIsLoading());
    if (fileState.length > 0) {
      // uploading all files
      fileState.map(async (item: any) => {
        const main = await fileUpload(item);

        if (main) {
          // @ts-ignore
          dispatch(updateProductImagesName(main));
        }
      });
      return;
    }
    //   @ts-ignore
    dispatch(createProductRemote());
  }
  // file upload function
  async function fileUpload(obj: any) {
    const { name, file } = obj;
    const { data, error } = await hiShopSupabase.storage
      .from("product")
      .upload("folder/" + name, file);
    if (data) return data.path;
  }
  //   use effect to fire when
  // file upload ends
  useEffect(() => {
    if (fileState.length > 0 && productsImageName.length === fileState.length) {
      //   @ts-ignore
      dispatch(createProductRemote());
    }
  }, [productsImageName, fileState]);

  function createProductOnchangeHandler(e: any) {
    const { name, value } = e.target;
    // @ts-ignore
    dispatch(updateProductMain({ name, value }));
  }
  const headerObj = { searchOnChangeHandler, searchSubmitHandler, filterParam };
  const createModalObj = {
    fileHandler,
    createProductSubmitHandler,
    createProductOnchangeHandler,
  };
  // use effect to fetch all your products
  useEffect(() => {
    dispatch(setFilterDefault());
    // @ts-ignore
    dispatch(fetchMyProducts());
  }, []);
  
  const allMyProducts = myProducts;
 
  return (
    <div className="my_products_page">
      <BarHolder />
      {/* core application components */}
      <main>
        {/* Header component */}
        <HeaderComponent {...headerObj} />
        {/* product create modal component */}
        <CreateModal {...createModalObj} />
        {/* all Products */}
      
        <section className="products_list">
 
          {allMyProducts.length === 0 ? (
            <h3 className="empty_note">You have no product !!</h3>
          ) : (

            allMyProducts .map((item: any, index: number) => (
              <EachProductList url="singlemyproduct" {...item} key={index + 5656} />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default MyProductsPage;
