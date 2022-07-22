import React from 'react'
import { useState } from "react";
import * as DynamoDB from  'react-dynamodb-helper';

async function getCredentials(region, secret, key, email) {

    var paramsCredentials = {
    TableName: "Account_Credentials",
    Key : { 
        "email" : email,
    }
    };

    let resultCredentials = await DynamoDB.getData(region, secret, key, paramsCredentials)
    return resultCredentials;

}

const exportFunctions = {
    getCredentials,
};

export default exportFunctions;