

export const bookApi = {
getBooksFromApi,
}

function getBooksFromApi(){
    return fetch('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript')
    .then( (response) =>{
       return response.json()
    })
    .then( (data) =>{
        return data.items;
    })
}