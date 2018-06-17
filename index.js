module.exports = function getDiffBetween(oldArray, newArray){
    oldIds = new Set(oldArray.map(item => item.id));
    newIds = new Set(newArray.map(item => item.id));

    const removals = [...oldIds].filter(oldId => !newIds.has(oldId));
    const additions = [...newIds].filter(newId => !oldIds.has(newId));

    const diffArray = removals.reduce((diffArray, removalId) => {
        addRemoval(diffArray, removalId);
        return diffArray;
    }, []);

    return additions.reduce((diffArray, additionId) => {
        const addition = newArray.find(newElement => newElement.id == additionId);
        addAddition(diffArray, addition);
        return diffArray;
    }, diffArray);
}

function addRemoval(array, id){
    array.push({
        type: "REMOVE",
        id: id
    });
    return array;
}

function addAddition(array, item){
    array.push(Object.assign({
        type: "ADD",
    }, item));
    return array;
}
