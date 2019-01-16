window.onload = function(){
		window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
		const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        let windowW, stars, nbStars;

        function Star(starsIndex) {
            this.id = starsIndex;
            this.x = Math.random() * windowW;
            this.y = Math.random() * window.outerHeight;
            this.on = Math.random() > 0.1;
            this.size = Math.random() * (13 - 1) + 1;
            this.opacity = this.on ? Math.random() * 0.8 : 0;
            this.clign = Math.random() > 0.5;
        }

        Star.prototype.draw = function() {
            let halfSize = this.size / 2,
                curve = this.size / 2.75,
                maxX = this.x + halfSize,
                maxY = this.y + halfSize,
                random = Math.random(),
                speed = random * (0.015 - 0.005) + 0.005;

            if (this.on) {
                if (this.opacity > random * (1 - 0.6) + 0.6 || this.opacity < random * 0.3) {
                    this.clign = !this.clign;
                }
                this.opacity = this.clign ? this.opacity + speed : this.opacity - speed;
                this.on = random > 0.005;
            } else {
                this.opacity = this.opacity < 0 ? 0 : this.opacity - speed;
                this.on = random > 0.5;
            }

            context.fillStyle = '#fff';

            // fix - canvas desn't understand negative values
            context.globalAlpha = this.opacity < 0 ? 0 : this.opacity;
            context.globalAlpha = this.opacity > 1 ? 1 : this.opacity;

            context.beginPath();
            context.moveTo(maxX, this.y);
            context.bezierCurveTo(this.x + curve, maxY, this.x + curve, maxY, maxX, this.y + this.size);
            context.bezierCurveTo(this.x + this.size - curve, maxY, this.x + this.size - curve, maxY, maxX, this.y);
            context.fill();
            context.closePath();
            context.beginPath();
            context.moveTo(this.x, maxY);
            context.bezierCurveTo(maxX, this.y + curve, maxX, this.y + curve, this.x + this.size, maxY);
            context.bezierCurveTo(maxX, this.y + this.size - curve, maxX, this.y + this.size - curve, this.x, maxY);
            context.fill();
            context.closePath();
        };

        function drawSky() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let i in stars) {
                stars[i].draw();
            }

            requestAnimationFrame(drawSky);
        }

        function init() {
            windowW = window.outerWidth;
            nbStars = windowW / 5;

            canvas.width = window.outerWidth;
            canvas.height = window.outerHeight;

            stars = [];
            nbStars = windowW / 5;

            for (let i = 0; i < nbStars; i++) {
                stars[i] = new Star(i);
            }
        }

        canvas.id = 'stars';
        document.body.appendChild(canvas);

        init();
        drawSky();

        window.addEventListener('resize', init);
    
    
    
    
   
}














