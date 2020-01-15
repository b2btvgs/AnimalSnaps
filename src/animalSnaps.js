'use strict';

const fetch = require('node-fetch');

class AnimalApiGroup {
    async handler(initialUrl, parallelUrlsArray) {
        let apiResults = [];
        try {
            let result = await fetch(initialUrl);
            result = await result.json();
            apiResults = await handleParallelRequests(parallelUrlsArray);
            apiResults.unshift(result.message); // set array in calls order
            return (apiResults);
        } catch (error) {
            console.log(`error occurred: ${error.message}`);
            return;
        }
    }
}

async function handleParallelRequests(parallelUrlsArray) {
    let resultApiSet = [];
    try {
        await Promise.all(parallelUrlsArray.map(url => fetch(url)))
            .then(responses =>
                Promise.all(responses.map(response => response.json())))
            .then(resultSet => {
                resultApiSet.push(resultSet[0].url);
                resultApiSet.push(resultSet[1].link);
            });
        return resultApiSet;
    } catch (error) {
        console.log(`parallel call error occurred: ${error.message}`);
        return;
    }
}

module.exports = AnimalApiGroup;