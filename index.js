module.exports = function getDiffBetween(oldArray, newArray){
    return oldArray.reduce((diffArray, oldElement) => {
        const matchedElement = newArray.find(newElement => oldElement.id == newElement.id);
        if (!matchedElement) addRemoval(diffArray, oldElement.id);

        return diffArray;
    },[]);
}

function addRemoval(array, id){
    array.push({
        type: "REMOVE",
        id: id
    });
    return array;
}
