var request = require('request');
require("dotenv").config();
const { createSubmitCode } = require('../services/result.services')
// define access parameters
var accessToken = process.env.TOKEN_PROBLEM;
var endpoint = process.env.ENDPOINT_API;

// define request parameters
// var submissionId = 66439554;

// send request


const codeSubmit = async (req, res) => {
    let submissionId = req.body.submissionid;
    let msv = req.jwtDecoded.data.id;

    // // //console.log(id)
    request({
        url: 'https://' + endpoint + '/api/v4/submissions/' + submissionId + '?access_token=' + accessToken,
        method: 'GET'
    }, async (error, response, body) => {

        if (error) {
            //console.log('Connection problem');
        }

        // process response
        if (response) {
            if (response.statusCode === 200) {
                //console.log(JSON.parse(response.body)); // submission data in JSON
                var responseData = JSON.parse(response.body);
                var output = responseData.result.testcases;
                //console.log(typeof responseData.problem.name, typeof responseData.result.status.name)
                let namestatus = responseData.result.status.name
                // //console.log(status)
                await createSubmitCode(msv, submissionId, responseData.problem.name, namestatus, responseData.result.streams.source.uri)
            } else {
                if (response.statusCode === 401) {
                    //console.log('Invalid access token');
                } else if (response.statusCode === 403) {
                    //console.log('Access denied');
                } else if (response.statusCode === 404) {
                    //console.log('Submision not found');
                }
            }
        }
    });

    // await createSubmitCode(msv, submissionId)
}

module.exports = { codeSubmit }