module.exports = function getDiffBetween(oldArray, newArray){
    oldIds = new Set(oldArray.map(item => item.id));
    newIds = new Set(newArray.map(item => item.id));

    const removals = [...oldIds].filter(oldId => !newIds.has(oldId));
    return removals.reduce((diffArray, removalId) => {
        addRemoval(diffArray, removalId);
        return diffArray;
    }, []);
}

function addRemoval(array, id){
    array.push({
        type: "REMOVE",
        id: id
    });
    return array;
}
