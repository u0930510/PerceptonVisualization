

function gradient (a, b) {
    return (b.y - a.y) / (b.x - a.x);
};



function perpendicularGradient (a, b) {
    return -1 / gradient(a, b);
};


function getYIntercept(vertex, slope) {
    return vertex.y - (slope * vertex.x);
};


function altitude(vertex, a, b) {

    var slope = gradient(a, b),
        x1 = -slope,
        y1 = 1,
        c1 = getYIntercept(a, slope),
        perpendicularSlope = perpendicularGradient(a, b),
        x2 = -perpendicularSlope,
        y2 = 1,
        c2 = getYIntercept(vertex, perpendicularSlope);

    var matrix = [
        [x1, y1],
        [x2, y2]
    ];

    result = solveMatrix(matrix, [c1, c2]);

    return result;

}

function det(matrix) {
    return (matrix[0][0]*matrix[1][1])-(matrix[0][1]*matrix[1][0]);
}

function solveMatrix(matrix, r) {
    var determinant = det(matrix);
    var x = det([
            [r[0], matrix[0][1]],
            [r[1], matrix[1][1]]
        ]) / determinant;

    var y = det([
            [matrix[0][0], r[0]],
            [matrix[1][0], r[1]]
        ]) / determinant;

    return {x: x, y: y};
}



