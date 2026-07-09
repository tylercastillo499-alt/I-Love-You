window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('turtleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // --- FIJAMOS LA RESOLUCIÓN INTERNA DEL DIBUJO ---
    canvas.width = 600;
    canvas.height = 600;

    // Configuración inicial de estilos del pincel
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Variables para controlar la animación
    let comandos = [];
    let comandoActual = 0;
    let progresoArco = 0;
    const VELOCIDAD = 8; // Velocidad de la animación (más alto = más rápido)

    let currentX = 0;
    let currentY = 0;
    let currentAngle = 0;

    function mapX(turtleX) { return 300 + turtleX; }
    function mapY(turtleY) { return 300 - turtleY; }

    // --- SISTEMA PARA COLA DE COMANDOS EN ANIMACIÓN ---
    function registrarGo(x, y) {
        comandos.push({ tipo: 'go', x: x, y: y });
    }

    function registrarSeth(angulo) {
        comandos.push({ tipo: 'seth', angulo: angulo });
    }

    function registrarArco(radius, extentDegrees, strokeColor, fillColor, esFinFill = false) {
        comandos.push({ 
            tipo: 'arco', 
            radius: radius, 
            extent: extentDegrees, 
            stroke: strokeColor, 
            fill: fillColor,
            esFinFill: esFinFill
        });
    }

    function registrarTexto(texto, x, y, color) {
        comandos.push({ tipo: 'texto', texto: texto, x: x, y: y, color: color });
    }

    // Funciones lógicas que calculan y guardan los pasos en la lista
    function go(x, y) { currentX = x; currentY = y; registrarGo(x, y); }
    function seth(ang) { currentAngle = (ang * Math.PI) / 180; registrarSeth(ang); }
    
    function drawCircleArc(radius, extentDegrees, stroke, fill, esFinFill = false) {
        registrarArco(radius, extentDegrees, stroke, fill, esFinFill);
        const extentRad = (extentDegrees * Math.PI) / 180;
        const cxTurtle = currentX + radius * Math.cos(currentAngle + Math.PI / 2);
        const cyTurtle = currentY + radius * Math.sin(currentAngle + Math.PI / 2);
        let startAngleRad = Math.atan2(mapY(currentY) - mapY(cyTurtle), mapX(currentX) - mapX(cxTurtle));
        let endAngleRad = radius > 0 ? startAngleRad - extentRad : startAngleRad + extentRad;
        
        if (radius > 0) currentAngle += extentRad;
        else currentAngle -= extentRad;
        
        currentX = cxTurtle + Math.abs(radius) * Math.cos(endAngleRad);
        currentY = cyTurtle - Math.abs(radius) * Math.sin(endAngleRad);
    }

    function hojas(angulo, stroke, fill) {
        seth(angulo);          drawCircleArc(75.61, 121.08, stroke, fill);
        seth(angulo + 175.63); drawCircleArc(72.70, 129.82, stroke, fill, true);
    }

    function flor(x, y, stroke, fill) {
        go(x, y);
        seth(330.2); drawCircleArc(22.66, 236.14, stroke, fill);
        seth(42.2);  drawCircleArc(22.66, 236.14, stroke, fill);
        seth(114.2); drawCircleArc(22.66, 236.14, stroke, fill);
        seth(186.2); drawCircleArc(22.66, 236.14, stroke, fill);
        seth(258.2); drawCircleArc(22.66, 236.14, stroke, fill, true);
        
        go(x - 4.81, y + 20.88);
        seth(90);
        drawCircleArc(22.5, 360, "Gold", "Gold", true);
    }

    // --- TRADUCCIÓN DEL DIBUJO ORIGINAL A LA COLA ---
    // Envoltura Khaki
    go(40.03, -167.53);
    seth(104.91); drawCircleArc(120.54, 29.94, "DarkKhaki", "Khaki");
    seth(49.57);  drawCircleArc(-315.30, 15.58, "DarkKhaki", "Khaki");
    seth(33.99);  drawCircleArc(172.07, 64.94, "DarkKhaki", "Khaki");
    seth(185.9);  drawCircleArc(227.51, 53.26, "DarkKhaki", "Khaki");
    seth(239.17); drawCircleArc(99.15, 72.41, "DarkKhaki", "Khaki");
    seth(213.64); drawCircleArc(74.25, 50.32, "DarkKhaki", "Khaki");
    seth(336.29); drawCircleArc(108.41, 47.43, "DarkKhaki", "Khaki", true);

    // Sombra envoltura
    go(-37.02, -69.53);
    seth(98.75);  drawCircleArc(-121.74, 54.75, "DarkKhaki", "Khaki");
    seth(131.6);  drawCircleArc(187.54, 48.16, "DarkKhaki", "Khaki");
    seth(253.4);  drawCircleArc(134.51, 95.25, "DarkKhaki", "Khaki", true);

    // Lazo Moño Pink
    go(69.69, -55.52);
    seth(184.72); drawCircleArc(90.59, 53.66, "MediumVioletRed", "HotPink");
    seth(127.63); drawCircleArc(111.93, 45.5, "MediumVioletRed", "HotPink");
    seth(234.89); drawCircleArc(80.1, 70.23, "MediumVioletRed", "HotPink");
    seth(9.8);    drawCircleArc(152.91, 31.68, "MediumVioletRed", "HotPink");
    seth(311.3);  drawCircleArc(108.05, 42.6, "MediumVioletRed", "HotPink");
    seth(58.45);  drawCircleArc(88.07, 63.09, "MediumVioletRed", "HotPink", true);

    // Centro Moño
    go(16.3, -99.27);
    seth(90);
    drawCircleArc(19.5, 360, "MediumVioletRed", "HotPink", true);

    // Hojas Verdes
    go(-79.30, 110.03); hojas(165.01, "DarkGreen", "LimeGreen");
    go(-122.12, 151);   hojas(79.67, "DarkGreen", "LimeGreen");
    go(-100.51, 123.98); hojas(119.46, "DarkGreen", "LawnGreen");
    go(-90.46, 135.14);  hojas(22.07, "DarkGreen", "LawnGreen");

    // Flores individuales
    flor(155.36, 115.58, "Tomato", "Orange");
    flor(60.97, 170, "SteelBlue", "DarkTurquoise");
    flor(-45.377, 120, "IndianRed", "LightSalmon");
    flor(-11.60, 41.39, "MediumOrchid", "Violet");
    flor(65.71, 85.27, "DarkGray", "White");

    // Texto final
    registrarTexto("I love you", 0, -240, "Chocolate");

    // --- BUCLE DE ANIMACIÓN (DIBUJA PASO A PASO) ---
    let tX = 0, tY = 0, tAng = 0;
    let pathsCompletos = []; // Almacena figuras ya terminadas para redibujarlas con fill
    let rutaActual = []; 

    function animar() {
        // Limpiar lienzo
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Redibujar todo lo que ya se completó en pasos anteriores
        pathsCompletos.forEach(p => {
            ctx.strokeStyle = p.stroke;
            ctx.fillStyle = p.fill;
            ctx.beginPath();
            
            p.elementos.forEach(el => {
                if (el.tipo === 'go') ctx.moveTo(mapX(el.x), mapY(el.y));
                else if (el.tipo === 'seth') {}
                else if (el.tipo === 'arco') {
                    ctx.arc(mapX(el.cx), mapY(el.cy), el.r, el.start, el.end, el.ccw);
                }
            });
            if (p.rellenar) ctx.fill();
            ctx.stroke();
        });

        // 2. Dibujar el progreso del comando en curso
        if (comandoActual < comandos.length) {
            let cmd = comandos[comandoActual];

            if (cmd.tipo === 'go') {
                tX = cmd.x; tY = cmd.y;
                rutaActual.push({ tipo: 'go', x: tX, y: tY });
                comandoActual++;
            } 
            else if (cmd.tipo === 'seth') {
                tAng = (cmd.angulo * Math.PI) / 180;
                comandoActual++;
            } 
            else if (cmd.tipo === 'texto') {
                ctx.fillStyle = cmd.color;
                ctx.font = "bold 38px 'Comic Sans MS', cursive, sans-serif";
                ctx.textAlign = "center";
                ctx.fillText(cmd.texto, mapX(cmd.x), mapY(cmd.y));
                comandoActual++;
            }
            else if (cmd.tipo === 'arco') {
                ctx.strokeStyle = cmd.stroke;
                ctx.fillStyle = cmd.fill;
                
                const extentRad = (cmd.extent * Math.PI) / 180;
                const cxTurtle = tX + cmd.radius * Math.cos(tAng + Math.PI / 2);
                const cyTurtle = tY + cmd.radius * Math.sin(tAng + Math.PI / 2);
                
                let startAngleRad = Math.atan2(mapY(tY) - mapY(cyTurtle), mapX(tX) - mapX(cxTurtle));
                
                progresoArco += (VELOCIDAD * Math.PI) / 180;
                let terminado = false;
                let subExtent = progresoArco;
                
                if (subExtent >= Math.abs(extentRad)) {
                    subExtent = Math.abs(extentRad);
                    terminado = true;
                }

                let endAngleRad = cmd.radius > 0 ? startAngleRad - subExtent : startAngleRad + subExtent;
                let ccw = cmd.radius > 0;

                ctx.beginPath();
                rutaActual.forEach(el => {
                    if (el.tipo === 'go') ctx.moveTo(mapX(el.x), mapY(el.y));
                    else if (el.tipo === 'arco') ctx.arc(mapX(el.cx), mapY(el.cy), el.r, el.start, el.end, el.ccw);
                });
                ctx.arc(mapX(cxTurtle), mapY(cyTurtle), Math.abs(cmd.radius), startAngleRad, endAngleRad, ccw);
                ctx.stroke();

                if (terminado) {
                    rutaActual.push({
                        tipo: 'arco',
                        cx: cxTurtle, cy: cyTurtle,
                        r: Math.abs(cmd.radius),
                        start: startAngleRad, end: endAngleRad,
                        ccw: ccw
                    });

                    if (cmd.radius > 0) tAng += extentRad;
                    else tAng -= extentRad;
                    tX = cxTurtle + Math.abs(cmd.radius) * Math.cos(endAngleRad);
                    tY = cyTurtle - Math.abs(cmd.radius) * Math.sin(endAngleRad);

                    progresoArco = 0;

                    if (cmd.esFinFill) {
                        pathsCompletos.push({
                            stroke: cmd.stroke,
                            fill: cmd.fill,
                            rellenar: true,
                            elementos: [...rutaActual]
                        });
                        rutaActual = [];
                    }
                    comandoActual++;
                }
            }
            requestAnimationFrame(animar);
        } else {
            // Fijar el texto finalizado
            ctx.fillStyle = "Chocolate";
            ctx.font = "bold 38px 'Comic Sans MS', cursive, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("I love you", mapX(0), mapY(-240));
        }
    }

    animar();
});
