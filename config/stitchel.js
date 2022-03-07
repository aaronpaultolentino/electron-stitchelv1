// base url
require("dotenv").config();
let LIVE_URL = 'https://stitchel-mvp.herokuapp.com';
function base_url() {
    if (location.host == 1) {
        var url = LIVE_URL; // 0
    }else{
        var url = process.env.LOCAL_URL; // 1
    }
    return url;
}