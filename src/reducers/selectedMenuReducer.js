import {useStoredReducer} from '@dteel/use-stored-reducer';

function selectedMenuReducer(state, action, payload) {
    return {page: action, ...payload};
}

function useSelectedMenuReducer(hysterisis=1000){
    const [selectedMenu, {current: selectedMenuDispatch}] = useStoredReducer('cwab-menu', selectedMenuReducer, {page: 'aircraft'}, sessionStorage, hysterisis);

    return [selectedMenu, selectedMenuDispatch];
}


export {useSelectedMenuReducer as default, selectedMenuReducer};