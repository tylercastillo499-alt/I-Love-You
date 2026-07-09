window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('turtleCanvas');
    const ctx = canvas.getContext('2d');

    // Estado de nuestra "tortuga" virtual
    let currentX = 0;
    let currentY = 0;
    let currentAngle = 0; // en radianes

    // Mapear coordenadas de Turtle (-300 a 300) a coordenadas de Canvas (0 a 600)
    function mapX(turtleX) {
        return 300 + turtleX;
    }

    function mapY(turtleY) {
        return 300 - turtleY; // Invierte el eje Y para la web
    }

    // Funciones básicas de movimiento y dirección
    function go(x, y) {
        currentX = x;
        currentY = y;
        ctx.moveTo(mapX(x), mapY(y));
    }

    function seth(anguloGrados) {
        // En turtle 0 es derecha, 90 arriba. En canvas adaptamos al plano estándar.
        currentAngle = (anguloGrados * Math.PI) / 180;
    }

    // Dibuja un arco/círculo simulando el comportamiento de turtle.circle(radius, extent)
    function drawCircleArc(radius, extentDegrees) {
        const extentRad = (extentDegrees * Math.PI) / 180;
        
        // Determinar el centro del círculo basado en la posición actual y dirección
        // En turtle, el centro está a una distancia 'radius' a la izquierda del rumbo
        const cxTurtle = currentX + radius * Math.cos(currentAngle + Math.PI / 2);
        const cyTurtle = currentY + radius * Math.sin(currentAngle + Math.PI / 2);
        
        const cx = mapX(cxTurtle);
        const cy = mapY(cyTurtle);
        
        // Ángulo inicial desde el centro hacia la tortuga
        let startAngleRad = Math.atan2(mapY(currentY) - cy, mapX(currentX) - cx);
        
        let endAngleRad;
        let counterClockwise = false;
        
        if (radius > 0) {
            // Giro hacia la izquierda en Turtle
            endAngleRad = startAngleRad - extentRad;
            counterClockwise = true; 
        } else {
            // Giro hacia la derecha en Turtle
            const absRadius = Math.abs(radius);
            endAngleRad = startAngleRad + extentRad;
            counterClockwise = false;
        }
        
        ctx.arc(cx, cy, Math.abs(radius), startAngleRad, endAngleRad, counterClockwise);
        
        // Actualizar la posición y ángulo final de la tortuga
        if (radius > 0) {
            currentAngle += extentRad;
        } else {
            currentAngle -= extentRad;
        }
        currentX = cxTurtle + Math.abs(radius) * Math.cos(endAngleRad);
        currentY = cyTurtle - Math.abs(radius) * Math.sin(endAngleRad); // Ajuste de signo por eje Y invertido
    }

    function hojas(angulo) {
        ctx.beginPath();
        seth(angulo);
        drawCircleArc(75.61, 121.08);
        seth(angulo + 175.63);
        drawCircleArc(72.70, 129.82);
        ctx.fill();
        ctx.stroke();
    }

    function flor(x, y) {
        ctx.beginPath();
        go(x, y);
        seth(330.2);  drawCircleArc(22.66, 236.14);
        seth(42.2);   drawCircleArc(22.66, 236.14);
        seth(114.2);  drawCircleArc(22.66, 236.14);
        seth(186.2);  drawCircleArc(22.66, 236.14);
        seth(258.2)   drawCircleArc(22.66, 236.14);
        ctx.fill();
        ctx.stroke();
        
        // Centro dorado de la flor
        ctx.strokeStyle = "Gold";
        ctx.fillStyle = "Gold";
        ctx.beginPath();
        go(x - 4.81, y + 20.88);
        seth(90);
        drawCircleArc(22.5, 360);
        ctx.fill();
        ctx.stroke();
    }

    // --- INICIO DEL DIBUJO ---
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // 1. Papel/Envoltura del Ramo (Khaki)
    ctx.strokeStyle = "DarkKhaki";
    ctx.fillStyle = "Khaki";
    ctx.beginPath();
    go(40.03, -167.53);
    seth(104.91); drawCircleArc(120.54, 29.94);
    seth(49.57);  drawCircleArc(-315.30, 15.58);
    seth(33.99);  drawCircleArc(172.07, 64.94);
    seth(185.9);  drawCircleArc(227.51, 53.26);
    seth(239.17); drawCircleArc(99.15, 72.41);
    seth(213.64); drawCircleArc(74.25, 50.32);
    seth(336.29); drawCircleArc(108.41, 47.43);
    ctx.fill();
    ctx.stroke();

    // Fondo o sombra de la envoltura
    ctx.beginPath();
    go(-37.02, -69.53);
    seth(98.75);  drawCircleArc(-121.74, 54.75);
    seth(131.6);  drawCircleArc(187.54, 48.16);
    seth(253.4);  drawCircleArc(134.51, 95.25);
    ctx.fill();
    ctx.stroke();

    // 2. El lazo/moño (HotPink)
    ctx.strokeStyle = "MediumVioletRed";
    ctx.fillStyle = "HotPink";
    ctx.beginPath();
    go(69.69, -55.52);
    seth(184.72); drawCircleArc(90.59, 53.66);
    seth(127.63); drawCircleArc(111.93, 45.5);
    seth(234.89); drawCircleArc(80.1, 70.23);
    seth(9.8);    drawCircleArc(152.91, 31.68);
    seth(311.3);  drawCircleArc(108.05, 42.6);
    seth(58.45);  drawCircleArc(88.07, 63.09);
    ctx.fill();
    ctx.stroke();

    // Nudo central del lazo
    ctx.beginPath();
    go(16.3, -99.27);
    seth(90);
    drawCircleArc(19.5, 360);
    ctx.fill();
    ctx.stroke();

    // 3. Las Hojas del Ramo (Verdes)
    ctx.strokeStyle = "DarkGreen";
    ctx.fillStyle = "LimeGreen";
    go(-79.30, 110.03); hojas(165.01);
    go(-122.12, 151);   hojas(79.67);

    ctx.fillStyle = "LawnGreen";
    go(-100.51, 123.98); hojas(119.46);
    go(-90.46, 135.14);  hojas(22.07);

    // 4. Las Flores del Ramo
    ctx.strokeStyle = "Tomato"; ctx.fillStyle = "Orange";
    flor(155.36, 115.58);

    ctx.strokeStyle = "SteelBlue"; ctx.fillStyle = "DarkTurquoise";
    flor(60.97, 170);

    ctx.strokeStyle = "IndianRed"; ctx.fillStyle = "LightSalmon";
    flor(-45.377, 120);

    ctx.strokeStyle = "MediumOrchid"; ctx.fillStyle = "Violet";
    flor(-11.60, 41.39);

    ctx.strokeStyle = "DarkGray"; ctx.fillStyle = "White";
    flor(65.71, 85.27);

    // 5. Mensaje de amor
    ctx.fillStyle = "Chocolate";
    ctx.font = "bold 38px 'Apple Chancery', 'Comic Sans MS', 'cursive'";
    ctx.textAlign = "right";
    // Mapeamos las coordenadas go(100, -250) al sistema de la web
    ctx.fillText("I love you", mapX(100), mapY(-230));
});
