const PI2 = Math.PI * 2

const drawDot = (ctx, pos, sf) => {
    const dotSize = sf.dotSize * 30
    ctx.closePath()
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(pos[0], pos[1], dotSize, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
}

export const draw = (ctx, sf, startPos) => {
    const time = performance.now()

    ctx.strokeStyle = '#FFFFFF'
    ctx.fillStyle = '#FFFFFF'

    ctx.beginPath()

    const deltaStep = PI2 * sf.angle + ( time * sf.angleSpeed / 200)
    const hDeltaStep = deltaStep / 2

    const startSize = sf.scale * window.innerHeight
    const bigRot = (sf.treeRot * Math.PI)
    const dotThreshold = Math.floor(sf.numSteps * (1 - sf.dotThreshold))
    const lineThreshold = Math.floor(sf.numSteps * sf.lineThreshold)

    ctx.moveTo(startPos[0], startPos[1])

    const branch = (numBranches, pos, distance, delta, treeIndex) => {
        if (numBranches < sf.numSteps) {
            numBranches++

            const eX = 0
            const eY = 0

            distance = distance * sf.distFactor
            const posDelta = delta + deltaStep + sf.bend
            const negDelta = delta - deltaStep + sf.bend

            const posL = [
                eX + pos[0] + (Math.sin(delta + posDelta - hDeltaStep) * distance),
                eY + pos[1] + (Math.cos(delta + posDelta - hDeltaStep) * distance)
            ]

            const posR = [
                eX + pos[0] + (Math.sin(delta + posDelta + hDeltaStep) * distance),
                eY + pos[1] + (Math.cos(delta + posDelta + hDeltaStep) * distance)
            ]

            if (dotThreshold < numBranches) {
                drawDot(ctx, posL, sf)
                drawDot(ctx, posR, sf)
            }

            if (lineThreshold >= numBranches) {
                ctx.moveTo(pos[0], pos[1])
                ctx.lineTo(posL[0], posL[1])

                ctx.moveTo(pos[0], pos[1])
                ctx.lineTo(posR[0], posR[1])
            }

            branch(numBranches, posL, distance, negDelta, treeIndex)
            branch(numBranches, posR, distance, posDelta, treeIndex)
        }
    }

    const rotStep = PI2 / sf.numTrees / 2

    for (let i = 0; i < sf.numTrees; i++) {
        const newStartPos = [
            startPos[0] + Math.sin(-rotStep * i * 2) * sf.startRad,
            startPos[1] + Math.cos(-rotStep * i * 2) * sf.startRad
        ]

        const startRot = -rotStep * i + bigRot
        branch(0, newStartPos, startSize, startRot, i)
    }

    ctx.closePath()
    ctx.stroke()
}
