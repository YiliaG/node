
var http=require('http');
var querystring=require('querystring');
var postData=querystring.stringify({
    'content':'哎哟喂，被评论淹没了',
    'cid':348
});
var options={
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docomment',
    method:'POST',
    headers:{
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'imooc_uuid=01708583-afe9-4af8-b0e4-70e126d49aea; imooc_isnew_ct=1476869310; PHPSESSID=d2oh48v48v6ase1l3fqv71c6t2; loginstate=1; apsid=Y2ZDhkNjgyOTgwZDYzY2JhOTUyZjBlNTViYmIyMTQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzk2MDIxNwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGM5Y2U3MTIxNDkwN2FmZTllODAzODBiZGRlMGFiODdi%2FAHOWPwBzlg%3DNW; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1489895554; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1489909296; IMCDNS=0; imooc_isnew=2; cvde=58ce00803afc4-146',
        'Host':'www.imooc.com',
        'Origin':'http://www.imooc.com',
        'Referer':'http://www.imooc.com/comment/348',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
};
var req=http.request(options,function(res){
    console.log('status+'+res.statusCode)
    res.on('data',function(chunk){
        console.log('正在返回')
    })
    res.on('end',function(){
        console.log('评论完毕')
    })
});
req.on('error',function(e){
    console.log('error'+ e.message)
});
req.write(postData);
req.end();