

export function toggleCreateModal(e: any): void {
   
    const elem = document.querySelector(".product_create_modal")
    const btn = document.querySelector(".add_product_btn")
    if (e.target === elem || e.target === btn) {
        elem?.classList.toggle("hide_product_create_modal")

    } 
}

export function ManualCreateModalToggling() {
    const elem = document.querySelector(".product_create_modal")
    elem?.classList.toggle("hide_product_create_modal")
}

export function ToggleSecondUpdateForm(e:any) {
    const elem = document.querySelector(".second_product_update_form_holder")
    const btn = document.querySelector(".second_update_form_btn")

    if (e.target === elem || e.target === btn) {
        elem?.classList.toggle("show_second_update_form")
    }
}

export function ManualToggleSecondUpdateForm() {
    const elem = document.querySelector(".second_product_update_form_holder")
    elem?.classList.toggle("show_second_update_form")
}
