import { BiSearchAlt2 } from "react-icons/bi";
import viewUtils from "../../Utils";
import { toggleCreateModal } from "../../../Controller/Toggling/toggleCreateModal";
import { useLocation } from "react-router-dom";
import { productSliceActions } from "../../../Model/Local/ProductSlice";
import { useDispatch } from "react-redux";
import {useEffect} from 'react'
// @ts-ignore
function HeaderComponent({ searchSubmitHandler, searchOnChangeHandler, filterParam, }) {
  const {pathname} = useLocation()
  const { clearSingleProductMain } = productSliceActions
  const dispatch = useDispatch()
  const { Input } = viewUtils;
  useEffect(() => {
               dispatch(clearSingleProductMain());
  },[])
  return (
    <header className="my_products_page_header">
      <form onSubmit={searchSubmitHandler} className="search_form">
        <Input
          action={searchOnChangeHandler}
          type="search"
          name="filterParam"
          label=""
          value={filterParam}
          Icon={BiSearchAlt2}
          customClass="input_holder"
        />
      </form>
      {pathname !== '/' &&
        <div className="add_product">
          <button type="button" onClick={toggleCreateModal} className="add_product_btn"> +
          </button>
        </div>
      }
    </header>
  );
}

export default HeaderComponent;
