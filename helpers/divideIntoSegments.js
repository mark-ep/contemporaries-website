
export const divideIntoSegments = (startPoint, endPoint, number_of_segments) => {
    /*
     * given a start and end point, generates equally spaced points
     * along the line
     */
    let { x: x1, y: y1 } = startPoint;
    let start = [x1, y1];
    let { x: x2, y: y2 } = endPoint;
    let end = [x2, y2];

    let dx = (x2 - x1) / number_of_segments;
    let dy = (y2 - y1) / number_of_segments;

    let interiorPoints = [];

    for (let i = 1; i < number_of_segments; i++)
        interiorPoints.push([x1 + i * dx, y1 + i * dy]);

    return [start, ...interiorPoints, end];
};

export default divideIntoSegments