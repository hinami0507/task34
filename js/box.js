function rnd(n, m) {
    return parseInt(Math.random() * (m - n) + n);
}
window.onload = function() {
    var oBox = document.getElementById('box');
    var oUl = oBox.children[1];
    var oTxt = document.getElementById('txt');
    var oBtn = document.getElementById('btn');
    var enableKey = document.querySelector('#enableKey');//是否允许方向键控制
    var c = 10;
    var r = 10;

    //画矩阵
    for (var i = 0; i < c * r; i++) {
        var oLi = document.createElement('li');
        oUl.appendChild(oLi);
    }
    // 画小方块
    function createbox() {
        this.cunit = 50; //横坐标单位
        this.vunit = 50; //纵坐标单位
        this.x = rnd(0, c - 1);  // 小方块当前x坐标
        this.y = rnd(0, r - 1);  // 小方块当前y坐标
        this.rotate = 0; //当前车头方向
        this.xDir = 0;  //小方块x轴方向
        this.yDir = 0;  //小方块y轴方向
        var oBlock = document.createElement('span');
        oBox.appendChild(oBlock);
        oBlock.className = 'block';
        oBlock.id = "car";
        //边界设定
        this.bound = function() { 
            if (this.y <= 0) this.y = 0;
            if (this.y >= (c - 1)) this.y = c - 1;
            if (this.x <= 0) this.x = 0;
            if (this.x >= (r - 1)) this.x = r - 1;
        }
        //运行
        this.go = function(x, y) { 
            if (x) this.x += x;
            if (y) this.y += y;
            this.bound();
            oBlock.style.WebkitTransform = 'rotate(' + this.rotate + 'deg)';
            oBlock.style.left = this.cunit * this.x + 'px';
            oBlock.style.top = this.vunit * this.y + 'px';
        };
        //按键移动
        this.keyDrive = function(key) { 
            switch (key) { //左上右下
                case 37: //左
                    this.rotate = -90;
                    this.x -= 1;
                    break;
                case 38: //上
                    this.rotate = 0;
                    this.y -= 1;
                    break;
                case 39: //右
                    this.rotate = 90;
                    this.x += 1;
                    break;
                case 40: //下
                    this.rotate = 180;
                    this.y += 1;
                    break;
            }
            this.go();
        };
        //判断当前方向
        this.nowDir = function() { 
            var dir = Math.abs((this.rotate / 90) % 4);
            var flag = ((this.rotate / 90) % 4) / dir; //判断左右，-1为左，1为右
            switch (dir) {
                case 1: //左flag=-1和右flag=1
                    this.xDir = flag;
                    this.yDir = 0;
                    break;
                case 2: //下
                    this.yDir = 1;
                    this.xDir = 0;
                    break;
                case 0: //上
                    this.yDir = -1;
                    this.xDir = 0;
                    break;
            }
        }
        //输入框输入移动
        this.terminal = function(sValue) { 
            this.nowDir();
            switch (sValue) {
                case 'GO':
                    this.go(this.xDir, this.yDir);
                    break;
                case 'TRA LEF':
                    this.go(-1, 0);
                    break;
                case 'TRA TOP':
                    this.go(0, -1);
                    break;
                case 'TRA RIG':
                    this.go(1, 0);
                    break;
                case 'TRA BOT':
                    this.go(0, 1);
                    break;
                case 'MOV LEF':
                    this.rotate = -90;
                    this.x -= 1;
                    break;
                case 'MOV TOP':
                    this.rotate = 0;
                    this.y -= 1;
                    break;
                case 'MOV RIG':
                    this.rotate = 90;
                    this.x += 1;
                    break;
                case 'MOV BOT':
                    this.rotate = 180;
                    this.y += 1;
                    break;

            }
            this.go();
        }
    }

    //实例化小方块
    var box1 = new createbox();
    box1.go();
    //通过输入字符驱动
    oBtn.addEventListener("click", function() {
        box1.terminal(oTxt.value);
    })
    //通过键盘方向键驱动
    window.addEventListener("keydown", function(event) {
        if (enableKey.checked == true) //检查使能端是否打开
            box1.keyDrive(event.keyCode);
    })
    //通过点击tip快速输入
    var tip = document.getElementById("tip")
    tip.addEventListener("click", function(target) {
        if (target.target.nodeName == "H5") {
            oTxt.value = target.target.innerText.split("：")[0];
        }
    })

};