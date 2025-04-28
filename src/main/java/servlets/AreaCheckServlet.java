package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import models.Point;
import models.PointCheck;
import models.ResultBean;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;

@WebServlet("/checkArea")
public class AreaCheckServlet extends HttpServlet {
    private PointCheck pointCheck;

    @Override
    public void init(){
        pointCheck = new PointCheck();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            Point point = new Point(
                    Double.parseDouble(request.getParameter("x")),
                    Double.parseDouble(request.getParameter("y")),
                    Double.parseDouble(request.getParameter("r"))
            );

            if (!PointCheck.valid(point)){
                ControllerServlet.sendError(response, "Invalid point", HttpServletResponse.SC_BAD_REQUEST);
                return;
            }

            ResultBean bean = (ResultBean) request.getSession().getAttribute("results");
            if (bean == null){
                bean = new ResultBean();
            }

            PointCheck.check(point);
            bean.addResult(point);
            request.getSession().setAttribute("results", bean);

            ObjectMapper objectMapper = new ObjectMapper();
            String ans = objectMapper.writeValueAsString(point);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(ans);

        } catch (NumberFormatException e){
            ControllerServlet.sendError(response, e.toString(), HttpServletResponse.SC_BAD_REQUEST);
        } catch (Exception e){
            ControllerServlet.sendError(response, e.toString(), HttpServletResponse.SC_BAD_GATEWAY);
        }
    }
}
