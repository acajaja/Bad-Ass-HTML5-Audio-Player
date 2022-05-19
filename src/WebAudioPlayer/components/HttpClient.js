export const get = async (endpoint, queryParams = null) => {
    let URL = endpoint;

    if (queryParams) {
        const qp = new URLSearchParams(queryParams);
        URL = `${URL}?${qp.toString}`;
    }

    const requestParams = {
        headers: new Headers({
            'Content-Type': 'application/json',
            'X-Requested-With': ''
        }),
        method: 'GET',
        mode: 'same-origin'
    };

    const response = await fetch(URL, requestParams);

    if (!response.ok) {
        throw new Error('Bad');
    }

    return await response.json();
}
