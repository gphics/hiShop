export interface user{
    user: {
        username: string,
        firstname: string,
        lastname: string,
        contact: number | string,
        email: string,
        password: string,
        userImgName: string,
        location:string,
        transactionAccount:""
    },
    login:{
        email: string,
        password:string
    }
    
}

export interface review{
    creator: string,
    body: string,
    productId:string,
}

export interface transaction{
    productId: string,
    sellerId: string,
    buyerId: string,
    price: number | string,
    quantity: number | string,
    id:string,
    
}

export interface product{
    name: string,
    description: string,
    price: number | string,
    quantity: number | string,
    images: string[]
    seller: string,
    buyersId: string[]
    id:string,
}