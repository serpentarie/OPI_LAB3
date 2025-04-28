"use strict";

let message = "";
let clickedPoints = [];
let hasUserInputR;
let r;

function isPointInsideArea(x, y, R) {
    let responseCode = 1;
    let message = "";
    if (!(-5 <= x && x <= 3)) {
        message = "The X value should be in (-5, 3) interval";
        responseCode = 0;
    } else if (!(-2 <= y && y <= 2)){
        message = "The Y value should be in (-2, 2) interval";
        responseCode = 0;
    } else if (!(1 <= R && R <= 3)){
        message = "The R value should be in (1, 3) interval";
        responseCode = 0;
    } else {
        responseCode = 1;
    }
    console.log(message);
    showToast(message);
    return responseCode === 1;
}

function isRadiusAcceptable(R) {
    let responseCode = 1;
    let message = "";
    if (!(1 <= R && R <= 3)) {
        message = "The R value should be in (1, 3) interval";
        responseCode = 0;
    }
    showToast(message);
    return responseCode === 1;
}


window.onload = function () {
    setCanvasDPI();
    drawGraph(1);
}

const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let dynamicScalingFactor;

function setCanvasDPI() {
    let dpi = window.devicePixelRatio;
    let canvasElement = document.getElementById('graphCanvas');
    let style = {
        height() {
            return +getComputedStyle(canvasElement).getPropertyValue('height').slice(0, -2);
        },
        width() {
            return +getComputedStyle(canvasElement).getPropertyValue('width').slice(0, -2);
        }
    };

    canvasElement.setAttribute('width', style.width() * dpi);
    canvasElement.setAttribute('height', style.height() * dpi);
}

function drawGraph(R) {
    let width = canvas.width;
    let height = canvas.height;

    let baseScaling = width / 6;
    dynamicScalingFactor = baseScaling / R;
    let yAxisOffset = 15;

    ctx.clearRect(0, 0, width, height);
    ctx.font = "15px Arial";

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    drawAxis(ctx, width / 4, height / 2, 3 * width / 4, height / 2);
    drawAxis(ctx, width / 2, 3 * height / 4, width / 2, height / 4);
    ctx.stroke();

    ctx.fillStyle = "#0000FF10";
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2 - R / 2 * dynamicScalingFactor, height / 2);
    ctx.lineTo(width / 2, height / 2 - R / 2 * dynamicScalingFactor);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#ac0817";
    ctx.stroke();

    ctx.fillStyle = "rgba(172,8,23,0.12)";
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, R * dynamicScalingFactor, - Math.PI * 1.5, Math.PI * - 1);
    ctx.lineTo(width / 2, height / 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#ac0817";
    ctx.stroke();

    ctx.fillStyle = "rgba(172,8,23,0.12)";
    ctx.fillRect(width / 2, height / 2, R * dynamicScalingFactor, R * dynamicScalingFactor);
    ctx.strokeStyle = "#ac0817";
    ctx.strokeRect(width / 2, height / 2, R * dynamicScalingFactor, R * dynamicScalingFactor);


    ctx.fillStyle = "#000000";
    const labelR = hasUserInputR ? R.toString() : "R";
    const labelRHalf = hasUserInputR ? (R / 2).toString() : "R/2";

    ctx.fillText(labelR, width / 2 + R * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText(labelRHalf, width / 2 + (R / 2) * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText('-' + labelR, width / 2 - R * dynamicScalingFactor, height / 2 + 30);
    ctx.fillText('-' + labelRHalf, width / 2 - (R / 2) * dynamicScalingFactor, height / 2 + 30);

    ctx.fillText(labelR, width / 2 + yAxisOffset, height / 2 - R * dynamicScalingFactor);
    ctx.fillText(labelRHalf, width / 2 + yAxisOffset, height / 2 - (R / 2) * dynamicScalingFactor);
    ctx.fillText('-' + labelR, width / 2 + yAxisOffset, height / 2 + R * dynamicScalingFactor);
    ctx.fillText('-' + labelRHalf, width / 2 + yAxisOffset, height / 2 + (R / 2) * dynamicScalingFactor);

    ctx.fillStyle = "#000000";
    const tickLength = 10;
    for (let tickValue = -R; tickValue <= R; tickValue += R / 2) {
        const xTickPosition = width / 2 + tickValue * dynamicScalingFactor;
        ctx.beginPath();
        ctx.moveTo(xTickPosition, height / 2 - tickLength / 2);
        ctx.lineTo(xTickPosition, height / 2 + tickLength / 2);
        ctx.stroke();
    }

    for (let tickValue = -R; tickValue <= R; tickValue += R / 2) {
        const yTickPosition = height / 2 - tickValue * dynamicScalingFactor;
        ctx.beginPath();
        ctx.moveTo(width / 2 - tickLength / 2, yTickPosition);
        ctx.lineTo(width / 2 + tickLength / 2, yTickPosition);
        ctx.stroke();
    }
    if (hasUserInputR) {
        drawAllPoints();
    }
}

function drawAxis(context, fromX, fromY, toX, toY) {
    const headLength = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
    context.moveTo(toX, toY);
    context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

function drawPoint(x, y, isInside) {
    let canvasX = canvas.width / 2 + x * dynamicScalingFactor;
    let canvasY = canvas.height / 2 - y * dynamicScalingFactor;

    ctx.fillStyle = isInside ? "#57a663" : "#930000" ;
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2);
    ctx.fill();
}

async function drawAllPoints() {
    for (const point of clickedPoints) {
        const isInside = await isPointInsideDesiredArea(point.x, point.y, r);
        drawPoint(point.x, point.y, isInside);
    }
}

function updateTableAndGraph(data) {
    console.log("ДАТА ГОСПОДИ", data);
    let parsedX = parseFloat(data.x);
    let parsedY = parseFloat(data.y);
    let parsedR = parseFloat(data.r);

    console.log("Parsed values:", { parsedX, parsedY, parsedR, inside: data.inside });

    drawPoint(parsedX, parsedY, data.inside);

    clickedPoints.push({x: parsedX, y: parsedY, r: parsedR, inside: data.inside});

    const table = document.getElementById('result_table');
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);

    cell1.innerHTML = data.x;
    cell2.innerHTML = data.y;
    cell3.innerHTML = data.r;
    cell4.innerHTML = data.inside ? 'Inside' : 'Not inside';
}

const mainForm = document.querySelector('input[value="Check"]');
mainForm.addEventListener('click', function (e) {
    e.preventDefault();

    const xElement = document.querySelector('#x');
    const yElement = document.querySelector('select[name="y"]');
    const rElement = document.querySelector('select[name="r"]');

    if (xElement && yElement && rElement) {
        const xVal = parseFloat(xElement.value);
        const yVal = parseFloat(yElement.value.substring(0, 8));
        const rVal = parseFloat(rElement.value.substring(0, 8));
        console.log(`x: ${xVal}, y: ${yVal}, r: ${rVal}`);

        if (isPointInsideArea(xVal, yVal, rVal)) {
            console.log(`client validation прошла ура`);

            fetch("/vibix/controller", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    "x": xVal,
                    "y": yVal,
                    "r": rVal
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Server errrror: Bad getaway: ${response.status} ${response.text()}`);
                    }
                    return response.json();
                })
                .then(function (serverAnswer) {
                    console.log("Server answer:", serverAnswer);
                    updateTableAndGraph(serverAnswer);
                })
                .catch(error => {
                    showToast(`error processing request(((: ${error.message}`);
                });
        } else {
            console.log(`client validation: не прошла о нет`);
            showToast(message);
        }
    } else {
        showToast("сначала заполните ка форму");
    }
});

canvas.addEventListener("click", function (event) {
    const rElement = document.querySelector('#r-value');
    if (!rElement || !rElement.value || isNaN(parseFloat(rElement.value))) {
        showToast("никак не определить координты без радиуса емае");
        return;
    }

    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;
    let R = parseFloat(rElement.value);

    let graphX = (x - canvas.width / 2) / dynamicScalingFactor;
    let graphY = (canvas.height / 2 - y) / dynamicScalingFactor;

//    graphX = Math.round(graphX);

    if (isPointInsideArea(graphX, graphY, R)) {

        fetch("/vibix/controller", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                "x": graphX,
                "y": graphY,
                "r": R
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server errrror: Bad getaway: ${response.status} ${response.text()}`);
                }
                return response.json();
            })
            .then(function (serverAnswer) {
                console.log("Server answer:", serverAnswer);
                updateTableAndGraph(serverAnswer);
                console.log("After table updating:", serverAnswer);

            })
            .catch(error => {
                showToast(`error processing request(((: ${error.message}`);
            });
    } else {
        console.log(`client validation не прошла о неt`);
        showToast(message);
    }
});

const rElement = document.querySelector('#r-value');
rElement.addEventListener('input', function () {
    r = parseFloat(rElement.value);
    if (isNaN(r)) {
        r = 1;
        hasUserInputR = false;
    } else {
        hasUserInputR = true;
    }
    if (isRadiusAcceptable(r)) {
        drawGraph(r);
    }
});

async function isPointInsideDesiredArea(x, y, r) {
    try {
        const response = await fetch("/vibix/controller", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                "x": x,
                "y": y,
                "r": r
            })
        })

        if (!response.ok) {
            throw new Error(`Server errrror: Bad getaway: ${response.status} ${await response.text()}`);
        }

        const serverAnswer = await response.json();
        return serverAnswer.isInside;
    } catch (error) {
        showToast(`error processing request(((: ${error.message}`);
        return null;
    }
}

function showToast(message, className = "info", offsetX = -300, offsetY = 140, position = "right") {
    Toastify({
        text: message,
        className: className,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            border: "1px solid white"
        },
        offset: {
            x: offsetX,
            y: offsetY
        },
        position: position
    }).showToast();
}