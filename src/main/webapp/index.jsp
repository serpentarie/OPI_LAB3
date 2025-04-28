<%@ page import="models.ResultBean" %>
<%@ page import="models.Point" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/styles.css">
    <title>Лабораторная работа №1</title>
</head>
<body>
<div class="head">
    <header class="element">
        <h1>Mazaikina Maria P3209 159183</h1>
    </header>
</div>
<div class="all">
    <div class="graph">
        <jsp:include page="graph.jsp" />
    </div>

    <div class="form" id="input-form">
        <div class="input-group">
            <label for="x">X:</label>
            <input type="text" id="x" name="x" maxlength="8" placeholder="X: (-5, 3)">
        </div>
        <div class="input-group">
            <label for="y-value" class="input_text">Choose Y:</label>
            <select name="y" id="y-value" class="select">
                <option value="-2">-2</option>
                <option value="-1.5">-1.5</option>
                <option value="-1">-1</option>
                <option value="-0.5">-0.5</option>
                <option value="0">0</option>
                <option value="0.5">0.5</option>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
            </select>
        </div>
        <div class="input-group">
            <label for="r-value" class="input_text">Choose R:</label>
            <select name="r" id="r-value" class="select">
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
            </select>
        </div>
        <div class="check-btn">
            <input type="submit" value="Check">
        </div>
    </div>
    <div class="result-table">
        <table id="result_table" class="table">
            <thead>
            <tr>
                <td>x</td>
                <td>y</td>
                <td>r</td>
                <td>status</td>
            </tr>
            </thead>
            <tbody id="output">
                <jsp:useBean id="results" scope="session" class="models.ResultBean"/>
                <%
                    for (models.Point result : results.getResults()) {
                %>
                    <tr>
                        <td><%= result.getX() %></td>
                        <td><%= result.getY() %></td>
                        <td><%= result.getR() %></td>
                        <td><%= result.isInside() ? "Inside" : "Not inside" %></td>
                    </tr>
                <%
                    }
                %>
            </tbody>
        </table>
    </div>
</div>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
<script type="module" src="main.js"></script>
</body>
</html>
