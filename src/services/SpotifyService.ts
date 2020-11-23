type restful = (s: string) => Promise<JSON>;
const searchUrl: string = '';

export const search: restful = (query: string) => {
    return fetch(searchUrl)
        .then(response => response.json());
}