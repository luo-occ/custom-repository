import React, { useState, useEffect, useContext } from "react";

const StoreContext = React.createContext(null);

export const connect = (
    mapStateToProps,
    mapDispatchToProps
) => Component => props => {
    // TODO useMemo
    const getComposeProps = () => {
        const store = useContext(StoreContext);
        const stateProps = mapStateToProps
            ? mapStateToProps(store.getState(), props)
            : {};
        const dispatchProps = mapDispatchToProps
            ? mapDispatchToProps(store.dispatch, props)
            : {};
        return { ...props, ...stateProps, ...dispatchProps };
    };

    const [composeProps, updateProps] = useState(getComposeProps());
    useEffect(() => {
        store.subscribe(() => updateProps(getComposeProps()));
    }, []);

    return <Component {...composeProps} />;
};

export function Provider(props) {
    const { store, children } = props;
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
}
