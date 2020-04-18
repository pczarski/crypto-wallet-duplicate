export const selectStyles = {
    option: (provided, state) => {
        return(
            Object.assign({}, provided, {
                color: state.isFocused ? '#464B51' :'#f7f7f7',
                backgroundColor: state.isFocused ? '#6d747b' : '',
                 'text-align': 'left',
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
                borderColor: '',
                'borderWidth': 'thick',
                background: 'solid',
                'minHeight': '48px',
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
    valueContainer: (provided, state) => {
        return(
            Object.assign({}, provided, {
            })
        )
    },
    container: (provided, state) => {
        return(
            Object.assign({}, provided, {
                minWidth: '200px',
            })
        )
    },
};

// export const selectMenuStyles = {
//     option: (provided, state) => {
//         return(
//             Object.assign({}, provided, {
//                 color: state.isFocused ? '#464B51' :'#f7f7f7',
//                 'text-align': 'left',
//             })
//         )
//     },
//     menu: (provided, state) => {
//         return(
//             Object.assign({}, provided, {
//                 backgroundColor: '#464B51',
//                 background: 'solid',
//             })
//         )
//     },
//     control: (provided, state) => {
//         return(
//             Object.assign({}, provided, {
//                 backgroundColor: '#464B51',
//                 borderColor: '#616161',
//                 border: '0',
//                 borderOpacity: '80%',
//                 background: 'solid',
//                 'min-height': '300px',
//             })
//         )
//     },
//     singleValue: (provided, state) => {
//         return(
//             Object.assign({}, provided, {
//                 color: '#f7f7f7',
//             })
//         )
//     },
// };