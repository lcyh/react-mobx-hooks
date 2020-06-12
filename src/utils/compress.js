/**
 * 腾讯云图片压缩裁剪
 */

class ImageCompress {
    constructor() {
        this.params= {
            // imageView2:4, 1 限定缩略图的宽高最小值 2 限定缩略图的宽高最大值 3 限定缩略图的宽高最小值 4 限定缩略图的长边和短边的最小值 5 限定缩略图的长边和短边的最大值
            // q:75 // 图片质量，取值范围 0-100 ，默认值为原图质量
            // w:750 图片宽度  受上面属性限制
            // h:750 图片高度  受上面属性限制
            // format:'webp' // 目标缩略图的图片格式 缺省为原图格式
            // rq:100 图片的相对质量，取值范围 0-100 ，数值以原图质量为标准
            lq:75 // 图片的最低质量，取值范围 0-100 ，设置结果图的质量参数最小值
        };
        // 安卓开启webp
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("android") > 0) {
            this.params.format='webp';
        }
    }

    // 参数格式转化 默认压缩方式为4  且必须排在前面
    transformParams = (imageView2=4, params) => {
        let urlStr ='imageView2/'+imageView2;
        for ( let key in params ) {
            urlStr+='/'+key+'/'+params[key];
        }
        return urlStr;
    }

    // 基本压缩
    mainCompress = (url='', params={}, imageView2) => {
        // 如果不是腾讯云地址  则原样返回
        if (url.indexOf('weimobwmc')===-1) {
            return url;
        } else {
            let imageUrl = url.split('?')[0];
            let urlStr = this.transformParams(imageView2, { ...this.params, ...params });
            return imageUrl+'?'+urlStr;
        }
    }

    // 高级压缩  预留 暂不需要
    superCompress = (url, params) => {

    }
}

export default new ImageCompress();
