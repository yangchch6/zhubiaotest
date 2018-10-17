import request from 'utils/request';

const URL = {
    "POST_UPLOAD": "/iuap_pap_quickstart/fileMananger/fastDfs/imgUpload"
}
//上传附件接口
export const postUpload = (data) => {
    return request(URL.POST_UPLOAD, {
        method: "post",
        data
    });
}
