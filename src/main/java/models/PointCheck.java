package models;

import java.util.Arrays;

public class PointCheck {
    public static boolean valid(Point point) {
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        double[] validRValues = {1, 1.5, 2, 2.5, 3};

        return x >= -5 && x <= 3 && Math.abs(y) <= 2 && Arrays.stream(validRValues).anyMatch(value -> value == r);
    }

    public static void check(Point point) {
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        boolean isInside = ((x <= 0) && (y >= 0) && (y <= (x + r/2))) ||
                ((x <= 0) && (y <= 0) && (((x * x) + (y * y)) <= (r * r))) ||
                ((x >= 0) && (y <= 0) && (x <= r) && (y >= -r));

        point.setInside(isInside);
    }
}
