package models;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.SessionScoped;
import lombok.Getter;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
@Getter
@Stateful
@SessionScoped
public class ResultBean implements Serializable {
    private final List<Point> results = new ArrayList<>();

    public void addResult(Point point) {
        results.add(point);
    }
}
