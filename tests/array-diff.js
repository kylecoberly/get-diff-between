const {ok, deepEqual} = require("assert");
const {getDiffBetween, difference, diffObjects} = require("../index");

describe("#getDiffBetween", () => {
    it("returns an empty array if both lists are empty", () => {
        const list = [];
        const updatedList = [];
        deepEqual(getDiffBetween(list, updatedList), []);
    });
    it("returns an empty array if two arrays are equal", () => {
        const list = [{
            id: 1,
            name: "Kyle"
        }];
        const updatedList = [{
            id: 1,
            name: "Kyle"
        }];
        deepEqual(getDiffBetween(list, updatedList), []);
    });
    it("detects a removal", () => {
        const list = [{
            id: 2,
            name: "Kyle"
        }];
        const updatedList = [];
        deepEqual(getDiffBetween(list, updatedList), [{
            type: "REMOVE",
            id: 2
        }]);
    });
    it("detects an addition", () => {
        const list = [];
        const updatedList = [{
            id: 2,
            name: "Kyle"
        }];
        deepEqual(getDiffBetween(list, updatedList), [{
            type: "ADD",
            name: "Kyle",
            id: 2
        }]);
    });
    it("detects a change", () => {
        const list = [{
            id: 1,
            name: "Kyle"
        }];
        const updatedList = [{
            id: 1,
            name: "Elyse"
        }];
        deepEqual(getDiffBetween(list, updatedList), [{
            type: "CHANGE",
            id: 1,
            name: "Elyse"
        }]);
    });
    it("lists the changes between two arrays of objects", () => {
        const list = [{
            id       : 1,
            name     : "Barbara",
            quantity : 3,
        },{
            id       : 2,
            name     : "Tom",
            quantity : 0,
        },{
            id       : 3,
            name     : "Sam",
            quantity : 1,
        }];

        const updatedList = [{
            // barb's name is changing
            id       : 1,
            name     : "Barb",
            quantity : 3,
        },{
            // sam's quantity is changing
            quantity : 8,
            name     : "Sam",
            id       : 3,
        },{
            // tom has been deleted
            // nelson is being added
            name     : "Nelson",
            id       : 4,
            quantity : 6,
        }];

        deepEqual(getDiffBetween(list, updatedList), [{
            type     : "CHANGE",
            id       : 1,
            name     : "Barb",
        },{
            type     : "REMOVE",
            id       : 2,
        },{
            type     : "CHANGE",
            id       : 3,
            quantity : 8,
        },{
            type     : "ADD",
            id       : 4,
            name     : "Nelson",
            quantity : 6,
        }]);
    });
});

describe("#difference", () => {
    it("returns an empty set if the sets are the same", () => {
        const set1 = new Set([1, 2]);
        const set2 = new Set([1, 2]);
        deepEqual(difference(set1, set2), new Set([]));
    });
    it("returns the original set if nothing is subtracted", () => {
        const set1 = new Set([1, 2]);
        const set2 = new Set([]);
        deepEqual(difference(set1, set2), new Set([1, 2]));
    });
    it("returns the original set if something different is subtracted", () => {
        const set1 = new Set([1, 2]);
        const set2 = new Set([3]);
        deepEqual(difference(set1, set2), new Set([1, 2]));
    });
    it("returns a difference", () => {
        const set1 = new Set([1, 2]);
        const set2 = new Set([2]);
        deepEqual(difference(set1, set2), new Set([1]));
    });
});

describe("#diffObjects", () => {
    it("returns nothing if nothing changed", () => {
        const firstObject = {
            id: 1,
            name: "Kyle"
        };
        const secondObject = {
            id: 1,
            name: "Kyle"
        };
        ok(!diffObjects(firstObject, secondObject));
    });
    it("returns a change if something changed", () => {
        const firstObject = {
            id: 1,
            name: "Kyle"
        };
        const secondObject = {
            id: 1,
            name: "Elyse"
        };
        deepEqual(diffObjects(firstObject, secondObject), {
            id: 1,
            name: "Elyse"
        });
    });
    it("only returns changed properties", () => {
        const firstObject = {
            id: 1,
            age: "Unknowable",
            name: "Kyle"
        };
        const secondObject = {
            id: 1,
            age: "Unknowable",
            name: "Elyse"
        };
        deepEqual(diffObjects(firstObject, secondObject), {
            id: 1,
            name: "Elyse"
        });
    });
});
