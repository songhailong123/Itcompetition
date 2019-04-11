//封装主页展示栏部分的插件
;(function(win,doc,undefined){
    var zturn=function(turn){
        this.turn=turn
        this.zturn=$("#"+turn.id)
        this.X=0
        this.zturnitem = this.zturn.children(".zturn-item")
        this.num_li = this.zturnitem.length
        this.zturnPy=turn.Awidth/(this.num_li-1)
        this.init()
        this.turn_()
        return this
    }
    zturn.prototype={
        constuctor:zturn,
        init:function(){
            var _self = this;
            this.zturn.children(".zturn-item").each(function(index,element){

                var rt=1//1:右侧：-1：左侧
                if((index-_self.X)>_self.num_li/2||(index-_self.X)<0&&(index-_self.X)>(-_self.num_li/2)){rt=-1}//判断元素左侧还是右侧
                var i=Math.abs(index-_self.X);//取绝对值
                if(i>_self.num_li/2){i=parseInt(_self.X)+parseInt(_self.num_li)-index;}//i:是左或者右的第几个
                if((index-_self.X)<(-_self.num_li/2)){i=_self.num_li+index-_self.X}
                $(this).css({
                    'position':'absolute',
                    'left':'50%',
                    'margin-left':-_self.turn.width/2+_self.zturnPy*rt*i+"px",
                    "z-index":_self.num_li-i,
                    'opacity':Math.pow(_self.turn.opacity,i),
                    "transform":"scale("+Math.pow(_self.turn.scale,i)+")",
                })
                $(this).attr("data_n",index)
            })
        },
        turn_:function(){
            var _self = this;
            this.zturnitem.click(function(){
                _self.X = $(this).attr("data_n")
                _self.init()
            })
        }
    }
    win.zturn = zturn;
}(window,document))