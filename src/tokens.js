const { abi: USMABI } = require("./external/abi/USM.json");
const { abi: USMViewABI } = require("./external/abi/USMView.json");
const { abi: FUMABI } = require("./external/abi/FUM.json");
const { abi: OracleABI } = require("./external/abi/Oracle.json");

export const usm = {
  name: "usm",
  abi: USMABI,
  address: {
    42: "0x7dbC406E09c876C77949A45BBE4173Aa6CdF9470",
  },
};

export const usmview = {
  name: "USMView",
  abi: USMViewABI,
  address: {
    42: "0x14E1657013b721B341eA27fcA47538C3B7416E4c",
  },
};

export const oracle = {
  name: "oracle",
  abi: OracleABI,
  address: {
    42: "0x8e91D25324833D62Fb3eC67aDEE26048696c8909",
  },
};

export const fum = {
  name: "fum",
  abi: FUMABI,
  address: {
    42: "0x6ee47863a96a488a53053dea290ccf7f8979d6a9",
  },
};
