package servlets;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        execute(request, response);
    }
    private void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        RequestDispatcher rd = request.getRequestDispatcher(
                (x != null && y != null && r != null) ? "/checkArea" : "/index.jsp"
        );
        rd.forward(request, response);
    }
    public static void sendError(HttpServletResponse response, String message, int httpServletResponse) throws IOException {
        response.setContentType("application/json");
        response.setStatus(httpServletResponse);
        String jsonResponse = "{ \"errorText\": \"" + message + "\" }";
        response.getWriter().write(jsonResponse);
    }
}
