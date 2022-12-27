const express = require('express');
const server = express();
const axios = require("axios");

    getAll() {
        return axios.get(`${environment.ApiUrl}/users`);
    }
server.get("/users",function(req,res,next){
    res.send(await getAll());
});
    getUsers() {
        return axios.get("url").toPromise();
    }

    CreateNewAddress(customerUid: string, body: any) {
        const url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUid + "/addresses?fields=DEFAULT";
        return axios.post(url, body).toPromise();
    }

    GetCustomerAddresses(customerUID: string) {
        const url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses?fields=DEFAULT";
        return axios.get(url).toPromise();
    }

    UpdateTheAddress(address: DefaultAddress, customerUID) {
        const url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses/" + address.id;
        return axios.put(url, address).toPromise();
    }

    DeleteCustomerAddress(customerUID: string, addressId: string) {
        const url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses/" + addressId;
        return axios.delete(url).toPromise();
    }

    function GetCustomerAddressesShowroom(customerUID: string, dealerId: string) {
        let url = "";
        if (dealerId == "" || dealerId == null) {
            url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses/showroomAddresses?fields=DEFAULT";
        } else {
            url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses/showroomAddresses?dealerId=" + dealerId + "&fields=DEFAULT";
        }
        return axios.get(url).toPromise();
    }
server.get("/users/:customerUID/addresses/showroomAddresses",function(req,res,next){
    const {customerUID} = req.params;
    const {dealerId} = req.query;
    
    const response = await GetCustomerAddressesShowroom(customerUID,dealerId);
    if(response.error){
        res.status(response.error.status).send(response.error);
        return;
    }
    res.status(200).send(response.data);
})
    module.exports = server;