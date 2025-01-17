export type Point = [number, number];
export type Points = Point[];
export type Line = [Point, Point];
export type Lines = Line[];

export function getSummPointsWithCoeffs(
    firstPoint: Point,
    secondPoint: Point,
    firstCoeff: number,
    secondCoeff: number,
): Point {
    return [
        firstCoeff * firstPoint[0] + secondCoeff * secondPoint[0],
        firstCoeff * firstPoint[1] + secondCoeff * secondPoint[1],
    ];
}

export function getDeltaPoints(firstPoint: Point, secondPoint: Point): Point {
    return [secondPoint[0] - firstPoint[0], secondPoint[1] - firstPoint[1]];
}

export function getVectorLength(vector: Point) {
    return Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
}

export function getVectorOrt(vector: Point): Point {
    const length = getVectorLength(vector);
    return [vector[0] / length, vector[1] / length];
}

export function getLineByPointAndVector({
    startPoint,
    vector,
    length,
}: {
    startPoint: Point;
    vector: Point;
    length: number;
}): Line {
    const ort = getVectorOrt(vector);
    const endPoint = getSummPointsWithCoeffs(startPoint, ort, 1, length);
    return [startPoint, endPoint];
}
