export const setResponse = (data, response) => {
    response.status(200);
    response.json(data);
    
}

export const setError = (err, response) =>{
    console.log(err);
    response.status(500);
    response.json({
        error:{
            code:'InternalServerError',
            message: 'Error occured while processing the request'
        }
    })
}