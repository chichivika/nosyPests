import React, { useMemo } from 'react';
import { PathData, Mouse } from './mouseUtils';

export type MouseProps = {
    height?: number;
    turnedLeft?: boolean;
    translateDuration?: number;
};
export default function SVGMouse({
    height = 200,
    turnedLeft = true,
    translateDuration = 5,
}: MouseProps) {
    const mouseObject = useMemo(() => {
        return new Mouse({ height });
    }, [height]);
    const width = mouseObject.getWidth();

    const repetedPause = `${width} 0;`.repeat(2);
    const repetedMouse = '0 0;'.repeat(5);
    return (
        <svg width={width} height={height} style={{ transform: turnedLeft ? '' : 'scale(-1, 1)' }}>
            <g>
                <animateTransform
                    attributeName='transform'
                    attributeType='XML'
                    type='translate'
                    values={`${repetedPause}${repetedMouse}${repetedPause}`}
                    dur={`${translateDuration}s`}
                    repeatCount='1'
                />
                {renderHead(mouseObject)}
                {renderEye(mouseObject)}
                {renderEar(mouseObject)}
                {renderWhiskers(mouseObject)}
                {renderNose(mouseObject)}
            </g>
        </svg>
    );
}

function renderHead(mouseObject: Mouse) {
    const headPathData = mouseObject.getHeadPathSegments();
    const headPath = getFigurePath(headPathData);
    return <path d={headPath} fill='lightGrey' stroke='grey' />;
}

function renderEye(mouseObject: Mouse) {
    const eyeData = mouseObject.getEyeData();
    const eyeHighLight = mouseObject.getEyeHighLightData();
    return (
        <g>
            <circle
                cx={eyeData.centerPoint[0]}
                cy={eyeData.centerPoint[1]}
                r={eyeData.radius}
                stroke='black'
                fill='black'
            />
            <circle
                cx={eyeHighLight.centerPoint[0]}
                cy={eyeHighLight.centerPoint[1]}
                r={eyeHighLight.radius}
                stroke='white'
                fill='white'
            />
        </g>
    );
}

function renderWhiskers(mouseObject: Mouse) {
    const { startPoint, nextPoint, radius, largeArcFlag, sweepFlag } =
        mouseObject.getWhiskersAreaData();
    const path = `M${startPoint[0]} ${startPoint[1]} A ${radius} ${radius} 
    0 ${largeArcFlag} ${sweepFlag} ${nextPoint[0]} ${nextPoint[1]}`;

    const whiskers = mouseObject.getWhiskersData();
    return (
        <g>
            <path d={path} stroke='grey' fill='none' />
            {whiskers.map((whiskerLine) => {
                const [firstVert, secondVert] = whiskerLine;
                const repeatedPauseValue = `0 ${firstVert[0]} ${firstVert[1]};`.repeat(10);
                return (
                    <line
                        x1={firstVert[0]}
                        y1={firstVert[1]}
                        x2={secondVert[0]}
                        y2={secondVert[1]}
                        stroke='grey'
                        fill='none'
                        strokeOpacity={0.5}
                    >
                        <animateTransform
                            attributeName='transform'
                            attributeType='XML'
                            type='rotate'
                            values={`${repeatedPauseValue}
                            10 ${firstVert[0]} ${firstVert[1]};0 ${firstVert[0]} ${firstVert[1]};
                            10 ${firstVert[0]} ${firstVert[1]};0 ${firstVert[0]} ${firstVert[1]}`}
                            dur='2s'
                            repeatCount='indefinite'
                        />
                    </line>
                );
            })}
        </g>
    );
}

function renderEar(mouseObject: Mouse) {
    const pathData = mouseObject.getEarData();

    const pathString = getFigurePath(pathData);
    return <path d={pathString} fill='pink' stroke='grey' />;
}

function renderNose(mouseObject: Mouse) {
    const { centerPoint, radiusX, radiusY, rotateAngle } = mouseObject.getNoseData();
    const [cx, cy] = centerPoint;
    const rotate = `rotate(${(rotateAngle * 180) / Math.PI} ${cx} ${cy})`;

    const repeatedRadiusValue = `${radiusX};`.repeat(10);
    return (
        <ellipse
            cx={cx}
            cy={cy}
            rx={radiusX}
            ry={radiusY}
            stroke='grey'
            fill='pink'
            transform={rotate}
        >
            <animate
                attributeName='rx'
                values={`${repeatedRadiusValue}${(radiusX * 2) / 3};${radiusX};
                ${(radiusX * 2) / 3};${radiusX}`}
                dur='2s'
                repeatCount='indefinite'
            />
        </ellipse>
    );
}

function getFigurePath(pathData: PathData) {
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
