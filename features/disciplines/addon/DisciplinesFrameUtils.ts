export namespace DisciplinesFrameUtils {

    export function isMouseInsideCircularFrame (frame: WoWAPI.Frame) {
                            
        let [x, y] = GetCursorPosition();
        let scale = frame.GetEffectiveScale();
        x = x / scale;
        y = y / scale;

        let [bx, by] = frame.GetCenter();
        let radius = frame.GetWidth() / 2;

        let dx = x - bx;
        let dy = y - by;
        let distance = Math.sqrt(dx * dx + dy * dy);

        return distance <= radius;

    }

}