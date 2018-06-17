module.exports = function getDiffBetween(oldArray, newArray){
    return oldArray.reduce((diffArray, oldElement) => {
        const matchedElement = newArray.find(newElement => oldElement.id == newElement.id);
        if (!matchedElement){
            diffArray.push({
                type: "REMOVE",
                id: oldElement.id
            });
        }
        return diffArray;
    },[]);
}
