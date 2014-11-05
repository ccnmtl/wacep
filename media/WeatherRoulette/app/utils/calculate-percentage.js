export default function calculatePercentage(portionOfTotal, total) {
    var n = portionOfTotal * (total / 100);
    return Math.round(n);
}
