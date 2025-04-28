package models;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PointCheckTest {

    @Test
    public void testPointInsideFirstSegment() {
        Point point = new Point(-2, 1, 2);

        PointCheck.check(point);

        assertFalse(point.isInside());
    }

    @Test
    public void testPointInsideSecondSegment() {
        Point point = new Point(-1, -1, 2);

        PointCheck.check(point);

        assertTrue(point.isInside());
    }

    @Test
    public void testPointOutsideArea() {
        Point point = new Point(3, 3, 2);

        PointCheck.check(point);

        assertFalse(point.isInside());
    }
}
