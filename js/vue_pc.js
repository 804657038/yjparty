var data={
    // link:'http://huiya.hengdikeji.com/party/public/index.php/',
    link:'http://127.0.0.1/hyparty/public/index.php/',
    dataList:[
        {face:"",}
    ]
};
var all=new Vue({
    el:'#vueMain',
    data:data,
    created:function(){
        var $this=this;
        layui.use('flow', function(){
            var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
            var flow = layui.flow;
            flow.load({
                elem: '#msglist' //指定列表容器
                ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
                    var lis = [];
                    //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）

                    $this.AjaxL($this.link+'index/index/msglist','GET',{page:page},function(res){
                        //假设你的列表返回在data集合中

                        var list=res.list;
                        for(item in list){
                            $this.dataList.push(list[item]);
                        }
                        // $('.listBg').liMarquee({
                        //     direction:'down'
                        // });
                        next(lis.join(''), page < res.last_page);
                    });

                }
            });
        });
        // 连接服务端，workerman.net:2120换成实际部署web-msg-sender服务的域名或者ip
        var socket = io('http://120.24.212.12:2120');
        // var socket = io('http://127.0.0.1:2120');
        // uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
        uid = 123;
        // socket连接后以uid登录

        socket.on('connect', function(){
            socket.emit('login', uid);
        });
        // 后端推送来消息时
        socket.on('new_msg', function(msg){
            var obj = JSON.parse(msg);

            if(obj.type==1){
                for(item in obj.data){
                    $this.dataList.splice(0,0,obj.data[item]);
                }

                // $('.listBg').liMarquee({
                //     direction:'down'
                // });
            }else if(obj.type==2){
                var k=$this.findall($this.dataList,obj.msgId);
                $this.dataList[k].PraiseList=obj.data;
                if($this.dataList[k].commont.length>0 || $this.dataList[k].PraiseList.length>0){
                    $this.dataList[k].interaction=true;
                }else{
                    $this.dataList[k].interaction=false;
                }
            }else if(obj.type==3){
                var k=$this.findall($this.dataList,obj.msgId);
                $this.dataList[k].commont.push(obj.data);
                $this.dataList[k].interaction=true;
            }
        });
        document.onkeydown = function (e) {
            if (!e) e = window.event;
            if ((e.keyCode || e.which) == 13) {
                $('.listBg').liMarquee({
                    direction:'down'
                });
            }
        }
        $('#msglist').hover(
            function(){
                $('.gif_t').hide();
                $('.bd').show();
            } ,
            function(){
                $('.gif_t').show();
                $('.bd').hide();
            }
        ) ;
    },
    methods:{
        AjaxL:function(url,type,data,call){  //通用ajax
            var $this=this;
            $.ajax({
                url:url,
                type:type,
                data:data,
                dataType:'JSON',
                success:function(res){

                    call(res);

                },
                error:function(XMLHttpRequest){
                    if(XMLHttpRequest.status==408){

                    }else{
                        alert('网络比较差，请重新进入。');
                    }
                }
            })
        },
        findall:function (a,x){
            var results=[],
            len=a.length,
            pos='';
            for(item in a){
                if(a[item].id==x){
                    pos=item;
                }
            }
            return pos;

        }
    }
});