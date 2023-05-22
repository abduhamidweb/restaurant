export default function shufflePartial(array, count, partial = false) {
    if (partial) {
        let shuffled = array.slice(0, count);
        let remaining = array.slice(count);

        let currentIndex = shuffled.length;
        let temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            temporaryValue = shuffled[currentIndex];
            shuffled[currentIndex] = shuffled[randomIndex];
            shuffled[randomIndex] = temporaryValue;
        }

        return shuffled;
    }

    return array.slice(0, count);
}
