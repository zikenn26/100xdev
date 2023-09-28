function logResponseBody(jsonBody){
    console.log(jsonBody)
}
function callbackFn(result){
    result.json().then(logResponseBody)
}

var sendObj = {
    method: "GET"
}

fetch("http://localhost:3001/handleSum",sendObj).then(callbackFn)