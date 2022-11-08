import { APISettings } from '../config.js';

export default {
    index() {
        return fetch(APISettings.baseURL + '/api/game', {
            method: 'GET',
        })
            .then(function (response) {
                if (response.status != 200) {
                    throw response.status;
                } else {
                    return response.json();
                }
            })
            .catch(e => console.log(e.message));
    },
}
