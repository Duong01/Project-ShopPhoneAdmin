import http from "./http"

let ApiUrl = "http://localhost:8688/api"

const api = {
    CheckLogin: (params,success, error) =>  http.Post(`${ApiUrl}/AccountApi/CheckLogin`,params,success,error),
    CheckSession: (success, error) =>  http.Get(`${ApiUrl}/AccountApi/CheckSession`,"",success,error),
    LogOut: (success, error) =>  http.Get(`${ApiUrl}/AccountApi/LogOut`,"",success,error),
    GetFactoryZone: (success, error) =>  http.Get(`${ApiUrl}/ConfigApi/GetFactoryZone`,"",success,error),
    GetMedicineInfor: (params,success, error) =>  http.Get(`${ApiUrl}/ConfigApi/GetMedicineInfor`,params,success,error),
    GetTotalInOutInforOfAMedicine: (params,success, error) =>  http.Post(`${ApiUrl}/WareHouseApi/GetTotalInOutInforOfAMedicine`,params,success,error),
    ImportGoodsToWareHouseByNormalType: (params,success, error) =>  http.Post(`${ApiUrl}/WareHouseApi/ImportGoodsToWareHouseByNormalType`,params,success,error),
    
}

export default  api
