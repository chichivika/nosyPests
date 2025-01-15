import React, { useMemo } from 'react';
import { Mouse } from './classMouse';
import { Point } from '../utils/drawUtils';
import { MouseProps, defaultMouseProps } from './mouseUtils';

const NOSE_ANIMATION_TIMES = 2;
const NOSE_ANIMATION_PAUSE_STATE_TIMES = 10;
const NOSE_ANIMATION_DURATION = '2s';
const NOSE_ANIMATION_REPEAT_COUNT = 'indefinite';

export default function SVGMouse(props: MouseProps) {
    const { height, animationDirection, useNoseAnimation, className } = {
        ...defaultMouseProps,
        ...props,
    };
    const mouseObject = useMemo(() => {
        return new Mouse({ height });
    }, [height]);

    const width = mouseObject.getWidth();
    const transform = animationDirection === 'left' ? '' : 'scale(-1, 1)';

    return (
        <svg
            width={width}
            height={height}
            style={{ transform }}
            className={`nosy-pests-mouse-svg ${className}`}
        >
            {renderHead(mouseObject)}
            {renderEye(mouseObject)}
            {renderEar(mouseObject)}
            {renderWhiskers(mouseObject, useNoseAnimation)}
            {renderNose(mouseObject, useNoseAnimation)}
        </svg>
    );
}

function renderHead(mouseObject: Mouse) {
    const headPath = mouseObject.getHeadPathSVG();
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

function renderWhiskers(mouseObject: Mouse, useNoseAnimation: boolean) {
    const areaPath = mouseObject.getWhiskersAreaPathSVG();
    const whiskers = mouseObject.getWhiskersData();

    return (
        <g>
            <path d={areaPath} stroke='grey' fill='none' />
            {whiskers.map((whiskerLine) => {
                const [firstVert, secondVert] = whiskerLine;
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
                        {useNoseAnimation && renderWhiskerAnimation(firstVert)}
                    </line>
                );
            })}
        </g>
    );
}

function renderEar(mouseObject: Mouse) {
    const pathString = mouseObject.getEarPathSVG();
    return <path d={pathString} fill='pink' stroke='grey' />;
}

function renderNose(mouseObject: Mouse, useNoseAnimation: boolean) {
    const { centerPoint, radiusX, radiusY, rotateAngle } = mouseObject.getNoseData();
    const [cx, cy] = centerPoint;

    const rotate = `rotate(${(rotateAngle * 180) / Math.PI} ${cx} ${cy})`;
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
            {useNoseAnimation && renderNoseAnimation(radiusX)}
        </ellipse>
    );
}

function renderNoseAnimation(radiusX: number) {
    const pauseValue = `${radiusX};`.repeat(NOSE_ANIMATION_PAUSE_STATE_TIMES);
    const oneCycle = `${(radiusX * 2) / 3};${radiusX};`;
    const allCycles = oneCycle.repeat(NOSE_ANIMATION_TIMES);
    return (
        <animate
            attributeName='rx'
            values={`${pauseValue}${allCycles}`}
            dur={NOSE_ANIMATION_DURATION}
            repeatCount={NOSE_ANIMATION_REPEAT_COUNT}
        />
    );
}

function renderWhiskerAnimation(firstVert: Point) {
    const pauseValue = `0 ${firstVert[0]} ${firstVert[1]};`.repeat(
        NOSE_ANIMATION_PAUSE_STATE_TIMES,
    );
    const oneCycle = `10 ${firstVert[0]} ${firstVert[1]};0 ${firstVert[0]} ${firstVert[1]};`;
    const allCycles = oneCycle.repeat(NOSE_ANIMATION_TIMES);
    return (
        <animateTransform
            attributeName='transform'
            attributeType='XML'
            type='rotate'
            values={`${pauseValue}${allCycles}`}
            dur={NOSE_ANIMATION_DURATION}
            repeatCount={NOSE_ANIMATION_REPEAT_COUNT}
        />
    );
}
