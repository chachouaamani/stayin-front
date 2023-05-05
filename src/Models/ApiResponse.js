export class ApiResponse {
    constructor(successful, errors) {
        this.Successful = successful;
        this.Errors = errors;
    }
}

export class ApiResponseWithBody extends ApiResponse {
    constructor(body){
        this.Body = body;
    }
}
