const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Member} = require('../models/member');
const express = require('express');
const router = express.Router();

let dateFormat = require('dateformat');
let Web3 = require('web3');
let web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
	//var vc = web3.eth.contract([ { "constant": true, "inputs": [ { "name": "cand", "type": "string" } ], "name": "getScore", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "alreadyVoted", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "killContract", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "number", "type": "uint8" } ], "name": "getCandidateString", "outputs": [ { "name": "", "type": "string", "value": "" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "cand", "type": "string" } ], "name": "addCandidate", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getNumOfCandidates", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "cand", "type": "string" } ], "name": "vote", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" } ]).at("0x5223d2713E96b7811585597B531519791E41bc9a");	
let version = web3.version.api;
console.log("version: ", version);

router.post('/',async(req,res)=> {

  let userFrom = req.body.userFrom;
  let userTo = req.body.userTo;
  let userPassword = req.body.MemberPassword;
  let userCoin =req.body.userCoin;
  let userTokenKey=req.body.userTokenKey;
  let securityKey =req.body.securityKey;

  /*
    이체 시키는 코드.
  */
let now = new Date();
if(web3.personal.unlockAccount(userPassword).value){
   web3.eth.sendTransaction({from: userFrom, to:userTo, value:userCoin},function(err,result){
      if(!err) {

         let response = {
            "result":200,
            "message":"성공적으로 송금이 완료 됬습니다.",
            "sendAt" :now,
            "fee":"tax"
         }

        res.status(200).json(response);
      }
   });
}

});

module.exports = router;
