window.onload = function() {

    const canvas = document.getElementById("graphImage");
    canvas.width = 600;
    canvas.height = 530;
    let R = 50
    let width = canvas.width
    let height = canvas.height
    let chartColor = "#899aff"
    let inChartColor = "#899aff"

    let points = []

    const context = canvas.getContext("2d");
    const mouse = {
        x: 0,
        y: 0,
        left: false,
        over: false,
        inChart: false
    }

    canvas.addEventListener('mouseenter', mouseEnterHandler)

    canvas.addEventListener('mousemove', mouseMoveHandler)

    canvas.addEventListener('mouseleave', mouseLeaveHandler)

    canvas.addEventListener('mousedown', mouseDownHandler)


    function mouseDownHandler(event) {
        console.log("clicked")

        if (selectedR != null) {
            let cartesianX = (mouse.x - width / 2) / 50
            let cartesianY = (-mouse.y + height / 2) / 50

            const rect = canvas.getBoundingClientRect();

            clear(inChartColor)

            console.log(cartesianX);
            console.log(cartesianY);

            const list = [-5, -4, -3, -2, -1, 0, 1, 2, 3];

            let nearestValue = list[0];
            let minDifference = Math.abs(cartesianX - nearestValue);

            for (let i = 1; i < list.length; i++) {
                const difference = Math.abs(cartesianX - list[i]);
                if (difference < minDifference) {
                    nearestValue = list[i];
                    minDifference = difference;
                }
            }

            console.log("nearestValue: " + nearestValue)

            document.getElementById("form:X_input_select").value = nearestValue
            document.getElementById("form:y-text").value = cartesianY

            console.log(document.getElementById("form:X_input_select").value)
            console.log(document.getElementById("form:y-text").value)

            const submitButton = document.getElementById('form:submit_button');

            submitButton.click()
        }
    }

    function mouseEnterHandler(event) {
        mouse.over = true;
    }

    function mouseMoveHandler(event) {
        const rect = canvas.getBoundingClientRect()
        mouse.x = event.clientX - rect.left
        mouse.y = event.clientY - rect.top

    }

    function mouseLeaveHandler(event) {
        mouse.over = false;
    }

    function draw(color) {
        context.lineWidth = 2;

        let deltaY = 6
        let deltaX = 10
        context.font = "10px monospace"

        drawChart(context, width, height, R, color)

        context.fillStyle = 'black'
        context.strokeStyle = 'black'


        // x axis

        context.beginPath();
        context.moveTo(0, height / 2)
        context.lineTo(width, height / 2)
        context.stroke()
        context.closePath()

        // y axis

        context.beginPath();
        context.moveTo(width / 2, 0)
        context.lineTo(width / 2, height)
        context.stroke()
        context.closePath()

        // y arrow
        let length = 7
        context.beginPath();
        context.moveTo(width / 2 - length, length)
        context.lineTo(width / 2, 0)
        context.lineTo(width / 2 + length, length)
        context.fill()
        context.closePath()

        // x arrow

        context.beginPath();
        context.moveTo(width - length, height / 2 - length)
        context.lineTo(width - length, height / 2 + length)
        context.lineTo(width, height / 2)
        context.fill()
        context.closePath()

        // x text

        context.fillText('R/2', width / 2 + R, height / 2 - deltaY)
        context.fillText('R', width / 2 + R * 2, height / 2 - deltaY)

        context.fillText('-R/2', width / 2 - R - deltaX, height / 2 - deltaY)
        context.fillText('-R', width / 2 - R * 2 - deltaX, height / 2 - deltaY)

        //y text

        context.fillText('R/2', width / 2 + deltaX, height / 2 - R)
        context.fillText('R', width / 2 + deltaX, height / 2 - R * 2)

        context.fillText('-R/2', width / 2 + deltaX, height / 2 + R)
        context.fillText('-R', width / 2 + deltaX, height / 2 + R * 2)

        // points

        drawPoint(context, width / 2, height / 2, 3, 'black')
        drawPoint(context, width / 2 - R, height / 2, 3, 'black')
        drawPoint(context, width / 2 - R * 2, height / 2, 3, 'black')
        drawPoint(context, width / 2 + R, height / 2, 3, 'black')
        drawPoint(context, width / 2 + R * 2, height / 2, 3, 'black')
        drawPoint(context, width / 2, height / 2 - R, 3, 'black')
        drawPoint(context, width / 2, height / 2 - R * 2, 3, 'black')
        drawPoint(context, width / 2, height / 2 + R, 3, 'black')
        drawPoint(context, width / 2, height / 2 + R * 2, 3, 'black')


        points.forEach(point => {
            drawPoint(context, point[0], point[1], 5, 'red')
        })
    }


    function drawPoint(context, x, y, R, color) {
        context.beginPath()
        context.moveTo(x, y)
        context.arc(x, y, R, 0, Math.PI * 2)
        context.fillStyle = color
        context.fill()
        context.closePath()
    }

    function drawChart(context, width, height, R, color) {
        context.fillStyle = color

        // rectangle
        context.fillRect(width / 2, height / 2, -R, 2 * R)

        //triangle
        context.beginPath()
        context.moveTo(width / 2, height / 2)
        context.lineTo(width / 2, height / 2 + 2 * R)
        context.lineTo(width / 2 + R * 2, height / 2)
        context.fill()
        context.closePath()

        //circle
        context.beginPath()
        context.moveTo(width / 2, height / 2)
        context.arc(width / 2, height / 2, 2 * R, Math.PI, 3 * Math.PI / 2)
        context.fill()
        context.closePath()

    }

    function clear(color) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        draw(color)
    }

    requestAnimationFrame(update)

    function update() {
        requestAnimationFrame(update)
        clear(chartColor)
    }

    let selectedR = document.getElementById('form:r-text');
    selectedR.addEventListener('input', handleRChange)
    setPreviousR()


    function setPreviousR() {
        let lastVars = getLastVars()
        let lastX = lastVars[0]
        let lastY = lastVars[1]
        let lastR = lastVars[2]

        document.getElementById("form:X_input_select").value = lastX
        document.getElementById("form:y-text").value = lastY

        selectedR.value = lastR
        R = 25 * lastR
        update()
    }

    function handleRChange(event) {
        const selectedValue = event.target.value
        selectedR = event.target.value
        if (2 <= selectedValue && selectedValue <= 5) {
            R = 25 * selectedValue
            update()
        }
    }

    function getLastVars() {
        let table = document.getElementById('result');
        if (table.rows.length > 1) {
            let lastRow = table.rows[table.rows.length - 1];
            let xValueCell = lastRow.cells[0];
            let yValueCell = lastRow.cells[1];
            let rValueCell = lastRow.cells[2];
            return [parseFloat(xValueCell.textContent), parseFloat(yValueCell.textContent), parseFloat(rValueCell.textContent)];
        }
        return [0, 0, 2];
    }
}