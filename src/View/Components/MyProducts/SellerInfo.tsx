import { useEffect, useState } from "react";
import hiShopSupabase from "../../../Model/Remote/hiShop";
import { defaultSliceActions } from "../../../Model/Local/DefaultSlice";
import { useDispatch } from "react-redux";
// @ts-ignore
function SellerInfo({ id }): any {
  const [ownerState, setOwnerState] = useState({
    contact: "",
    email: "",
    location: "",
    shopName: "",
    userImgName: "",
  });
  const { setIsLoading } = defaultSliceActions;
  const dispatch = useDispatch();
  async function fetchOwner() {
    // @ts-ignore
    dispatch(setIsLoading(true));
    const { data, error } = await hiShopSupabase
      .from("user")
      .select()
      .eq("id", id)
      .single();
    if (data) {
      // @ts-ignore
      dispatch(setIsLoading(false));
      // @ts-ignore
      setOwnerState(data);
    }
  }
  const { contact, email, location, shopName, userImgName } = ownerState;
  useEffect(() => {
    fetchOwner();
  }, [id]);
  type obj = {
    name: string;
    value: string;
  };
  const arr: obj[] = [
    { name: "Shop Name:", value: shopName },
    { name: "email:", value: email },
    { name: "Contact:", value: contact },
    { name: "Location:", value: location },
  ];
  const imgUrl: string = `https://dhkiodtlpiwxnmsbcepb.supabase.co/storage/v1/object/public/user/${userImgName}`;
  return (
    <article className="seller_info">
      <section className="img_holder">
        <img src={imgUrl} alt="seller image" />
      </section>
      <section className="main_info">
        {arr.map((item: obj, index: number) => {
          return (
            <aside key={index}>
              <h5> {item.name} </h5>
              <h4> {item.value} </h4>
            </aside>
          );
        })}
      </section>
    </article>
  );
}

export default SellerInfo;
