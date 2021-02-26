function Immutable(obj, options, stackRemaining) {
    if (
        isImmutable(obj) ||
        isReactElement(obj) ||
        isFileObject(obj) ||
        isBlobObject(obj) ||
        isError(obj)
    ) {
        return obj;
    } else if (isPromise(obj)) {
        return obj.then(Immutable);
    } else if (Array.isArray(obj)) {
        return makeImmutableArray(obj.slice());
    } else if (obj instanceof Date) {
        return makeImmutableDate(new Date(obj.getTime()));
    } else {
        // Don't freeze the object we were given; make a clone and use that.
        var prototype = options && options.prototype;
        var clone = Object.create(prototype);

        if (process.env.NODE_ENV !== "production") {
            /*jshint eqnull:true */
            if (stackRemaining == null) {
                stackRemaining = 64;
            }
            if (stackRemaining <= 0) {
                throw new Error(
                    "Attempt to construct Immutable from a deeply nested object was detected."
                );
            }
            stackRemaining -= 1;
        }

        for (var key in obj) {
            if (Object.getOwnPropertyDescriptor(obj, key)) {
                clone[key] = Immutable(obj[key], undefined, stackRemaining);
            }
        }
        return makeImmutableObject(clone);
    }
}

function makeImmutable(obj, bannedMethods) {
    // Tag it so we can quickly tell it's immutable later.
    addImmutabilityTag(obj);

    if (process.env.NODE_ENV !== "production") {
        // Make all mutating methods throw exceptions.
        for (var index in bannedMethods) {
            if (bannedMethods.hasOwnProperty(index)) {
                banProperty(obj, bannedMethods[index]);
            }
        }

        // Freeze it and return it.
        Object.freeze(obj);
    }

    return obj;
}

function objectSet(property, value, config) {
    var mutable = quickCopy(this, instantiateEmptyObject(this));
    mutable[property] = Immutable(value);
    return makeImmutableObject(mutable);
}

function instantiateEmptyObject(obj) {
    var prototype = Object.getPrototypeOf(obj);
    if (!prototype) {
        return {};
    } else {
        return Object.create(prototype);
    }
}