<%@ page import="models.ResultBean" %>
<%@ page import="models.Point" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="results" scope="session" class="models.ResultBean"/>
<html>
<head>
    <title>g</title>
</head>
<body>
<canvas id="graphCanvas" width="400" height="400"></canvas>
<script>
    let clickedPoints = [];

    function loadPoints() {
        clickedPoints = [
           <%
                for (models.Point result : results.getResults()) {
           %>
            {
                x: <%= result.getX() %>,
                y: <%= result.getY() %>,
                isInside: <%= result.isInside() ? "true" : "false" %>
            },
            <%
                }
            %>
        ];

        if (clickedPoints.length > 0) {
            clickedPoints = clickedPoints.slice(0, -1);
        }
    }
</script>
<script type="module" src="main.js"></script>
</body>

</html>