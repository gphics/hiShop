export default function automaticCloseModal() {
     const elem = document.querySelector(".product_create_modal")
    
    if(elem ) elem?.classList.toggle("hide_product_create_modal")
}