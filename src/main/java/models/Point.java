package models;
import lombok.*;

@EqualsAndHashCode
@ToString
@RequiredArgsConstructor
@Getter
@Setter
public final class Point {
    private final double x;
    private final double y;
    private final double r;
    private boolean isInside;
}
