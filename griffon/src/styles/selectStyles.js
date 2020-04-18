export const selectStyles = {
    option: (provided, state) => {
        return(
            Object.assign({}, provided, {
                color: state.isFocused ? '#464B51' :'#f7f7f7',

            })
        )
    },
    menu: (provided, state) => {
        return(
            Object.assign({}, provided, {
                backgroundColor: '#464B51',
                background: 'solid',
            })
        )
    },
    control: (provided, state) => {
        return(
            Object.assign({}, provided, {
                backgroundColor: '#464B51',
                borderColor: '#616161',
                borderOpacity: '80%',
                background: 'solid',
            })
        )
    },
    singleValue: (provided, state) => {
        return(
            Object.assign({}, provided, {
                color: '#f7f7f7',
            })
        )
    },
};

export const selectMenuStyles = {
    option: (provided, state) => {
        return(
            Object.assign({}, provided, {
                color: state.isFocused ? '#464B51' :'#f7f7f7',

            })
        )
    },
    menu: (provided, state) => {
        return(
            Object.assign({}, provided, {
                backgroundColor: '#464B51',
                background: 'solid',
            })
        )
    },
    control: (provided, state) => {
        return(
            Object.assign({}, provided, {
                backgroundColor: '#464B51',
                borderColor: '#616161',
                border: '0',
                borderOpacity: '80%',
                background: 'solid',
            })
        )
    },
    singleValue: (provided, state) => {
        return(
            Object.assign({}, provided, {
                color: '#f7f7f7',
            })
        )
    },
};