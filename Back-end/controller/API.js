const express = require('express');
const server = express();
const axios = require("axios");
const environment = {
    Production: false,
    ApiUrl: "https://10.34.16.111:9002",
    ApiTokenServiceName: "/authorizationserver/oauth/token",
    TokenUserName: "mobile_android",
    TokenPassword: "secret",
    BaseSiteId: "milangaz",
    BaseSiteApi: "milangazapi",
    BaseSite: "/milangazapi/v2/milangaz",
    BaseApiUrl: "/api",
    firebase: {
      apiKey: "AIzaSyCGQwcnhIY6phT19nPwiMiJ1xGY6c6jHUM",
      authDomain: "milangaz-saha.firebaseapp.com",
      databaseURL: "https://milangaz-saha.firebaseio.com",
      projectId: "milangaz-saha",
      storageBucket: "milangaz-saha.appspot.com",
      messagingSenderId: "384525881663",
      appId: "1:384525881663:web:1b87342765de65bf0d038a",
      measurementId: "G-7TJ27E3SQH",
    },
  };

async function UpdateTheAddress(address, customerUID) {
    const url =  "/users/" + customerUID + "/addresses/" + address.id;
    return await axios.put(url, address);
}

server.put("/:customerUID/addresses/:address",async function(req,res,next){
    const url = "";
    const {customerUID, address} = req.params;
    const response = await UpdateTheAddress(address,customerUID);
    res.status(200).send(response.data);

})
async function CreateNewAddress(customerUid, body) {
    const url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUid + "/addresses?fields=DEFAULT";
    return await axios.post(url, body);
}
server.get("/:customerUID/addresses",async function(req,res,next){
    const url = "";
    const {customerUID} = req.params;
    const {fields} = req.query;
    const response = await CreateNewAddress(customerUID,req.body);
    if(response.error){
        res.status(response.error.status).send(response.error);
        return;
    }
    res.status(200).send(response.data);

})

function getAll() {
    return axios.get(`${environment.ApiUrl}/users`);
}
server.get("/users", async function(req,res,next){
    const response = await getAll();
    if(response.error){
        res.status(response.error.status).send(response.error);
        return;
    }
    res.status(200).send(response.data);

})
function getUsers() {
    return axios.get("url");
}

function CreateNewAddress(customerUid, body) {
    const url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUid + "/addresses?fields=DEFAULT";
    return axios.post(url, body);
}

function GetCustomerAddresses(customerUID) {
    const url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses?fields=DEFAULT";
    return axios.get(url);
}

function UpdateTheAddress(address: DefaultAddress, customerUID) {
    const url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses/" + address.id;
    return axios.put(url, address);
}

function DeleteCustomerAddress(customerUID: string, addressId: string) {
    const url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses/" + addressId;
    return axios.delete(url);
}

function GetCustomerAddressesShowroom(customerUID: string, dealerId: string) {
    let url = "";
    if (dealerId == "" || dealerId == null) {
        url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses/showroomAddresses?fields=DEFAULT";
    } else {
        url = environment.ApiUrl + environment.BaseSite + "/users/" + customerUID + "/addresses/showroomAddresses?dealerId=" + dealerId + "&fields=DEFAULT";
    }
    return axios.get(url);
}



module.exports = server