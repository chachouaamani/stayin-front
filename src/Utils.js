export default function  GetUserId(){
    var token = localStorage.getItem(AppConsts.JwtTokenKey);
    var body = JSON.parse(atob(token.split('.')[1]));
    return body.nameid;
}

