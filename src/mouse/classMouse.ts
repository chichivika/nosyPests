import { Point, Points, Lines, getLineByPointAndVector } from '../utils/drawUtils';

type MouseParam = {
    height: number;
    turnedLeft?: boolean;
};
type PathObject =
    | {
          type: 'linesChain';
          verts: Points;
      }
    | {
          type: 'quadratic';
          nextPoint: Point;
          controlPoint: Point;
      }
    | {
          type: 'circleArc';
          radius: number;
          nextPoint: Point;
          sweepFlag: 0 | 1;
          largeArcFlag: 0 | 1;
      };
type PathObjects = PathObject[];

export type PathData = {
    startPoint: Point;
    pathSegments: PathObjects;
};

type CircleData = {
    radius: number;
    centerPoint: Point;
};

export class Mouse {
    public height: number;

    public width: number;

    public step: number;

    public turnedLeft: boolean;

    private coordinates;

    public static getStepByHeight(height: number) {
        return height / 18;
    }

    public static getWidthByHeight(height: number) {
        return Mouse.getStepByHeight(height) * 19;
    }

    public static getPathStringByData(pathData: PathData) {
        const { startPoint, pathSegments } = pathData;
        let pathString = `M${startPoint[0]} ${startPoint[1]}`;

        pathSegments.forEach((segmentData) => {
            switch (segmentData.type) {
                case 'linesChain':
                    segmentData.verts.forEach((vert) => {
                        pathString = `${pathString} L ${vert[0]} ${vert[1]}`;
                    });
                    break;
                case 'quadratic':
                    pathString = `${pathString} Q 
                    ${segmentData.controlPoint[0]} ${segmentData.controlPoint[1]}
                    ${segmentData.nextPoint[0]} ${segmentData.nextPoint[1]}`;
                    break;
                case 'circleArc':
                    pathString = `${pathString} A ${segmentData.radius} ${segmentData.radius} 0 
                    ${segmentData.largeArcFlag} ${segmentData.sweepFlag}
                    ${segmentData.nextPoint[0]} ${segmentData.nextPoint[1]}`;
                    break;
                default:
                    break;
            }
        });
        return pathString;
    }

    constructor({ height, turnedLeft = true }: MouseParam) {
        this.height = height;
        this.width = Mouse.getWidthByHeight(height);
        this.step = Mouse.getStepByHeight(height);
        this.turnedLeft = turnedLeft;
        this.coordinates = this.getKeyCoordinates();
    }

    public getStep() {
        return this.step;
    }

    public getWidth() {
        return this.width;
    }

    public getKeyCoordinates() {
        const { height, width, step } = this;

        return {
            // head figure
            headPointA: [step, 10 * step] as Point,
            headPointB: [9 * step, 6 * step] as Point,
            headPointC: [width, 3.5 * step] as Point,
            headPointD: [width, height] as Point,
            headPointE: [width - 2 * step, height - step] as Point,
            headPointF: [width - 5 * step, height - 2 * step] as Point,
            headPointG: [8 * step, height - 2 * step] as Point,
            headPointH: [5 * step, height - 3 * step] as Point,
            // lip center
            headPointI: [5 * step, height - 4 * step] as Point,
            headPointJ: [4 * step, height - 4 * step] as Point,
            headPointK: [2 * step, height - 6 * step] as Point,

            // whiskers area arc
            whiskersAreaCenter: [4 * step, height - 6 * step] as Point,
            whiskersAreaArcStart: [6 * step, height - 6 * step] as Point,
            whiskersAreaArcEnd: [4 * step, height - 8 * step] as Point,
            whiskersAreaRadius: (2 * step) as number,

            // eye
            eyeCenter: [10 * step, 9 * step] as Point,
            eyeRadius: step as number,

            // nose
            noseCenter: [1.5 * step, 11 * step] as Point,

            // ear
            earlobeCenter: [width - 2 * step, 8 * step] as Point,
            earPointA: [width, 6.5 * step] as Point,
            earPointB: [width - step, 8 * step] as Point,
            earPointC: [width - 3 * step, 8 * step] as Point,
            earPointD: [width - 3 * step, 4 * step] as Point,
            earPointE: [width - 3 * step, 2 * step] as Point,
            earPointF: [width - step, 2] as Point,
            earPointG: [width, step] as Point,
        };
    }

    public getHeadPathData(): PathData {
        const { coordinates, step } = this;
        const {
            headPointA,
            headPointB,
            headPointC,
            headPointD,
            headPointE,
            headPointF,
            headPointG,
            headPointH,
            headPointJ,
            headPointK,
        } = coordinates;

        const pathSegments = [
            {
                type: 'linesChain',
                verts: [headPointD, headPointE, headPointF],
            },
            {
                type: 'quadratic',
                nextPoint: headPointH,
                controlPoint: headPointG,
            },
            {
                type: 'circleArc',
                nextPoint: headPointJ,
                radius: step,
                sweepFlag: 1,
                largeArcFlag: 0,
            },
            {
                type: 'circleArc',
                nextPoint: headPointK,
                radius: 2 * step,
                sweepFlag: 1,
                largeArcFlag: 0,
            },
            {
                type: 'linesChain',
                verts: [headPointA, headPointB, headPointC],
            },
        ] as PathObjects;

        return {
            startPoint: headPointD,
            pathSegments,
        };
    }

    public getEyeData(): CircleData {
        const { coordinates } = this;
        const { eyeCenter, eyeRadius } = coordinates;
        return {
            radius: eyeRadius,
            centerPoint: eyeCenter,
        };
    }

    public getEyeHighLightData() {
        const { coordinates } = this;
        const { eyeCenter, eyeRadius } = coordinates;
        return {
            radius: eyeRadius / 4,
            centerPoint: [eyeCenter[0] + eyeRadius / 2, eyeCenter[1] - eyeRadius / 2],
        };
    }

    public getWhiskersAreaData() {
        const { coordinates } = this;
        const { whiskersAreaArcStart, whiskersAreaArcEnd, whiskersAreaRadius } = coordinates;
        return {
            startPoint: whiskersAreaArcStart,
            nextPoint: whiskersAreaArcEnd,
            radius: whiskersAreaRadius,
            sweepFlag: 0,
            largeArcFlag: 0,
        };
    }

    public getWhiskersData(): Lines {
        const { coordinates } = this;
        const { whiskersAreaCenter, whiskersAreaRadius } = coordinates;
        const whiskersStep = whiskersAreaRadius / 2;
        return [
            getLineByPointAndVector({
                startPoint: [whiskersAreaCenter[0] - whiskersStep, whiskersAreaCenter[1]],
                vector: [-2, 1],
                length: 3 * whiskersStep,
            }),
            getLineByPointAndVector({
                startPoint: [
                    whiskersAreaCenter[0] - whiskersStep / 2,
                    whiskersAreaCenter[1] + whiskersStep / 2,
                ],
                vector: [-1, 1],
                length: 4 * whiskersStep,
            }),
            getLineByPointAndVector({
                startPoint: [whiskersAreaCenter[0], whiskersAreaCenter[1] + whiskersStep],
                vector: [-1, 3],
                length: 4 * whiskersStep,
            }),
            getLineByPointAndVector({
                startPoint: [
                    whiskersAreaCenter[0] + whiskersStep / 2,
                    whiskersAreaCenter[1] + whiskersStep / 2,
                ],
                vector: [1, 5],
                length: 5 * whiskersStep,
            }),
            getLineByPointAndVector({
                startPoint: [whiskersAreaCenter[0] + whiskersStep, whiskersAreaCenter[1]],
                vector: [2, 3],
                length: 6 * whiskersStep,
            }),
        ];
    }

    public getNoseData() {
        const { step, coordinates } = this;
        const { noseCenter } = coordinates;
        return {
            centerPoint: noseCenter,
            radiusX: step,
            radiusY: (Math.sqrt(5) * step) / 2,
            rotateAngle: Math.atan(-1 / 2),
        };
    }

    public getEarData(): PathData {
        const { step, width, coordinates } = this;
        const {
            earlobeCenter,
            earPointA,
            earPointB,
            earPointC,
            earPointD,
            earPointE,
            earPointF,
            earPointG,
        } = coordinates;

        return {
            startPoint: earPointA,
            pathSegments: [
                {
                    type: 'quadratic',
                    nextPoint: earPointB,
                    controlPoint: [earlobeCenter[0] + step, 7 * step],
                },
                {
                    type: 'circleArc',
                    nextPoint: earPointC,
                    radius: step,
                    sweepFlag: 1,
                    largeArcFlag: 0,
                },
                {
                    type: 'quadratic',
                    nextPoint: earPointD,
                    controlPoint: [width - 2.3 * step, 6 * step],
                },
                {
                    type: 'quadratic',
                    nextPoint: earPointE,
                    controlPoint: [width - 3.5 * step, 3 * step],
                },
                {
                    type: 'quadratic',
                    nextPoint: earPointF,
                    controlPoint: [width - 2 * step, step / 3],
                },
                {
                    type: 'quadratic',
                    nextPoint: earPointG,
                    controlPoint: [width + step / 2, 0],
                },
            ],
        };
    }

    // =========== SVG PATH STRING =======================================

    public getWhiskersAreaPathSVG() {
        const { startPoint, nextPoint, radius, largeArcFlag, sweepFlag } =
            this.getWhiskersAreaData();
        return `M${startPoint[0]} ${startPoint[1]} A ${radius} ${radius} 
    0 ${largeArcFlag} ${sweepFlag} ${nextPoint[0]} ${nextPoint[1]}`;
    }

    public getEarPathSVG() {
        const earPathData = this.getEarData();
        return Mouse.getPathStringByData(earPathData);
    }

    public getHeadPathSVG() {
        const headPathData = this.getHeadPathData();
        return Mouse.getPathStringByData(headPathData);
    }
}
