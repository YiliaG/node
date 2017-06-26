var http = require('http');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/learn/';
var url = 'http://www.imooc.com/learn/348';
var videoIds = [348, 259, 197, 134, 75];

function filterChapters(html){
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var header = $('.course-infos');
    var title = $(' .pr .path span').text();
//这个人数值是浏览器端异步渲染的，http.get只会获取第一次服务器返回的HTML代码，所以这里获取不到number
    var number = parseInt($('.statics .static-item .js-learn-num').text().trim(), 10);


    var courseData = {
        title: title,
        number: number,
        videos: []

    };

    chapters.each(function(item){
        var chapter = $(this);
        //获取章节名称
        var chapterTitle = chapter.find('strong').text();
        //获取视频名称
        var videos = chapter.find('.video').children('li');
        //创建对象准备保存数据
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: []
        };
        videos.each(function(item){
            var video = $(this).find('.J-media-item');
            //获取视频标题(去除空格)
            var videoTitle = video.text().replace(/(^\s+)|(\s+$)/g, "");
            var id = video.attr('href').split('video/')[1];

            chapterData.videos.push({
                title: videoTitle,
                id: id
            })
        })
        courseData.videos.push(chapterData);
    })
    //返回课程信息
    return courseData;
}

function printCourseInfo(coursesData){
    coursesData.forEach(function(courseData){
//此处获取不了人数，
        console.log(courseData.number + '人学过' + courseData.title + '\n');
    });
    coursesData.forEach(function(courseData){
        console.log('###' + courseData.title + '\n');
        courseData.videos.forEach(function(item){
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle + '\n');

            item.videos.forEach(function(video){
                console.log('【'+video.id + '】'+ video.title +'\n');
            })
        })
    })
}

function getPageAsync(url){
    return new Promise(function(resolve, reject){
        console.log('正在爬取 ' + url);
        http.get(url, function(res) {
            var html = '';
            res.on('data',function(data) {
                html += data;
            });
            res.on('end', function(){
                resolve(html);
            });
        }).on('error',function(e){
            reject(e);
            console.log('爬取数据失败');
        })
    })
}

var fetchCourseArray = [];

videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl + id));
});

Promise
    .all(fetchCourseArray)
    .then(function(pages){
        var coursesData = [];
        pages.forEach(function(html){
            var courses = filterChapters(html);
            coursesData.push(courses);
        })
        coursesData.sort(function(a, b){
            return a.number < b.number;
        })
        printCourseInfo(coursesData);
    });