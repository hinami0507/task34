function rnd(n, m) {
    return parseInt(Math.random() * (m - n) + n);
}
window.onload = function() {
    var oBox = document.getElementById('box');
    var oUl = oBox.children[1];
    var oTxt = document.getElementById('txt');
    var oBtn = document.getElementById('btn');
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
        this.x = rnd(0, c - 1);
        this.y = rnd(0, r - 1);
        this.rotate = 0;
        this.xDir = 0;
        this.yDir = 0;
        var oBlock = document.createElement('span');
        oBox.appendChild(oBlock);
        oBlock.className = 'block';
        oBlock.id = "car";
        this.bound = function() { //边界设定
            if (this.y <= 0) this.y = 0;
            if (this.y >= (c - 1)) this.y = c - 1;
            if (this.x <= 0) this.x = 0;
            if (this.x >= (r - 1)) this.x = r - 1;
        }
        this.go = function(x, y) { //运行
            if (x) this.x += x;
            if (y) this.y += y;
            this.bound();
            oBlock.style.WebkitTransform = 'rotate(' + this.rotate + 'deg)';
            oBlock.style.left = this.cunit * this.x + 'px';
            oBlock.style.top = this.vunit * this.y + 'px';
        };
        this.keyDrive = function(key) { //按键移动
            switch (key) { //左上右下
                case 37:
                    this.rotate = -90;
                    this.x -= 1;
                    break;
                case 38:
                    this.rotate = 0;
                    this.y -= 1;
                    break;
                case 39:
                    this.rotate = 90;
                    this.x += 1;
                    break;
                case 40:
                    this.rotate = 180;
                    this.y += 1;
                    break;
            }
            this.go();
        };
        this.nowDir = function() { //判断当前方向
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
        this.terminal = function() { //输入框输入移动
            var sValue = oTxt.value;
            this.nowDir();
            switch (sValue) {
                case 'GO':
                    this.go(this.xDir, this.yDir);
                    break;
                case 'TUN LEF':
                    this.rotate -= 90;
                    break;
                case 'TUN RIG':
                    this.rotate += 90;
                    break;
                case 'TUN BAC':
                    this.rotate -= 180;
                    break;
            }
            this.go();
        }
    }


    var box1 = new createbox();
    box1.go();

    oBtn.addEventListener("click", function() {
        box1.terminal();
    })
    window.addEventListener("keydown", function(event) {
        box1.keyDrive(event.keyCode);
        console.log(event.keyCode)
    })
};
