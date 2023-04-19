

export function toggleCreateModal(e:any):void {
    const elem = document.querySelector(".product_create_modal")
    const btn = document.querySelector(".add_product_btn")
    if(e.target === elem || e.target === btn) elem?.classList.toggle("hide_product_create_modal")
}