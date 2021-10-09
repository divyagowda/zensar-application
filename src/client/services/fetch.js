/**
 * (C) 2020 AisaFi, Inc.
 * All rights reserved.
**/
import API_ENDPOINT from './api';

/**
 * Get method
 * @param url
 * @returns {Promise<R>}
 */

const get = (url, options = {}) => {
    return new Promise( async(resolve, reject) => {

            let baseURL = API_ENDPOINT + url;

            console.log("---------------------");
            console.log(baseURL);
            console.log("---------------------");

            try {

                let response = await fetch(baseURL, {
                    ...options,
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                let result = await response.json();

                if(response.ok){
                    resolve(result);
                }
                else{
                    reject(result)
                }
            } catch (error) {
                reject(error);
            }

        },
    );
};

/**
 * Post method
 * @param url
 * @param data
 * @param method
 * @returns {Promise<R>}
 */
const post = (url, data, method = 'POST') => {
    
    return new Promise(async(resolve, reject) => {

        let baseURL = API_ENDPOINT + url;

        console.log("---------------------");
        console.log("url",baseURL);
        console.log("data",data);
        console.log("---------------------");

        try {

            const response = await fetch(baseURL, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
            })

            const result = await response.json();

            if(response.ok){
                resolve(result);
            }
            else{
                reject(result);
            }
        }
        catch (error) {
            reject(error);
        }
    });
};

const request = {
    get,
    post,
    put: (url, data) => post(url, data, 'PUT'),
    delete: (url, data) => post(url, data, 'DELETE'),
};

export default request;
