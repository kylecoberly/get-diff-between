function getDiffBetween(oldArray, newArray){
    const oldIds = new Set(oldArray.map(item => item.id));
    const newIds = new Set(newArray.map(item => item.id));
    const removedIds = difference(oldIds, newIds);
    const addedIds = difference(newIds, oldIds);

    const {oldItems, newItems} = getRemainingItems({
        newArray, oldArray, removedIds, addedIds
    });

    return [].concat(
        detectAdditions(newArray, addedIds),
        detectRemovals(removedIds),
        detectChanges(oldItems, newItems)
    ).sort((a, b) => +a.id - +b.id);
}

function getRemainingItems({newArray, oldArray, removedIds, addedIds}){
    const oldItems = oldArray
        .filter(item => !removedIds.has(item.id) && !addedIds.has(item.id));
    const newItems = newArray
        .filter(item => !removedIds.has(item.id) && !addedIds.has(item.id));
    return {oldItems, newItems};
}

function detectChanges(remainingOldItems, remainingNewItems){
    return remainingNewItems.reduce((diffArray, remainingNewItem) => {
        const matchedOldItem = remainingOldItems
            .find(remainingOldItem => remainingOldItem.id == remainingNewItem.id);
        const differences = diffObjects(matchedOldItem, remainingNewItem);
        if (differences){
            addToDiffList("CHANGE", diffArray, differences);
        }
        return diffArray;
    }, []);
}

function detectRemovals(removedIds){
    const removedItems = [...removedIds].map(id => ({id}));
    return removedItems
        .reduce(addToDiffList.bind(null, "REMOVE"), []);
}

function detectAdditions(newArray, addedIds){
    const addedItems = [...addedIds]
        .map(id => newArray.find(element => element.id == id));
    return addedItems
        .reduce(addToDiffList.bind(null, "ADD"), []);
}

function diffObjects(firstObject, secondObject){
    const diffObject = Object.getOwnPropertyNames(firstObject)
        .reduce((diffObject, property) => {
            if (firstObject[property] !== secondObject[property]){
                diffObject[property] = secondObject[property];
            }
            return diffObject;
        }, {
            id: firstObject.id
        });;
    return Object.keys(diffObject).length > 1 ? diffObject : null;
}

function addToDiffList(message, diffArray, item){
    diffArray.push(Object.assign({
        type: message
    }, item));
    return diffArray;
}

function difference(minuend, subtrahend){
    return new Set([...minuend].filter(element => !subtrahend.has(element)));
}

module.exports = {
    getDiffBetween,
    difference,
    diffObjects
};
