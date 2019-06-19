
const {Member} = require('../models/member');
const express = require('express');
const router = express.Router();
//const dateFormat = require('dateformat');
const now = new Date();
let dateFormat = require('dateformat');
let Web3 = require('web3');
let web3 = new Web3();
    
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
	//var vc = web3.eth.contract([ { "constant": true, "inputs": [ { "name": "cand", "type": "string" } ], "name": "getScore", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "alreadyVoted", "outputs": [ { "name": "", "type": "bool", "value": false } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "killContract", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "number", "type": "uint8" } ], "name": "getCandidateString", "outputs": [ { "name": "", "type": "string", "value": "" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "cand", "type": "string" } ], "name": "addCandidate", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getNumOfCandidates", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "cand", "type": "string" } ], "name": "vote", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" } ]).at("0x5223d2713E96b7811585597B531519791E41bc9a");�

router.post('/',async(req,res)=> {
  let userName = req.body.MemberName;
  let userPassword = req.body.MemberPassword;
  let userTokenkey = req.body.userTokenkey;
  let securityKey = req.body.securityKey;
  let now = new Date();

  let newAccount = web3.personal.newAccount(userPassword);

  let balance = parseFloat(web3.fromWei(web3.eth.getBalance(newAccount),"ether"));

  let response = {
    "result":200,
    "message":"newAccount",
    "account":newAccount,
    "balance":balance,
    "createAt" :now
  }

  res.status(200).json(response);
})

module.exports = router;
