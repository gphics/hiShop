import { configureStore } from "@reduxjs/toolkit";
import localModel from "./Model/Local";
const store: any = configureStore({
    reducer: localModel
})

export default store