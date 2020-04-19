export const selectStyles = {
    option: (provided, state) => {
        return(
            Object.assign({}, provided, {
                color: state.isFocused ? '#f7f7f7' :'#f7f7f7',
                backgroundColor: state.isFocused ? '#6f84d2' : '#36393f',
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
                backgroundColor: '#36393f',
                borderColor: '#6f84d2',
                //'borderWidth': 'thick',
                background: 'solid',
                'minHeight': '48px',
            })
        )
    },
    singleValue: (provided, state) => {
        return(
            Object.assign({}, provided, {
                color:'#6f84d2',
            })
        )
    },
    dropdownIndicator: (provided, state) => {
        return(
            Object.assign({}, provided, {
                color: '#6f84d2'
            })
        )
    },
    container: (provided, state) => {
        return(
            Object.assign({}, provided, {
                minWidth: '200px',
                maxWidth: '200px'
            })
        )
    },
};

export const buttonHoover = {
    backgroundColor: '#6f84d2',
    color: '#d2d3d5',
    //borderWidth: 'thick',
    minWidth: '200px',
};

export const buttonNormal = {
    borderColor: '#6f84d2',
    backgroundColor: '#36393f',
    color: '#6f84d2',
  //  borderWidth: 'thick',
    minWidth: '200px',
};

export const buttonActive = {
    backgroundColor: '#6f84d2',
    color: '#36393f',
   // borderWidth: 'thick',
    minWidth: '200px',
};

export const optionHoover = {
    backgroundColor: '#6f84d2',
    color: '#d2d3d5',
    //borderWidth: 'thick',
    minWidth: '200px',
};

export const optionNormal = {
//    borderColor: '#6f84d2',
    backgroundColor: '#2f3136',
    color: '#6f84d2',
    //  borderWidth: 'thick',
    minWidth: '200px',
};

export const optionActive = {
    backgroundColor: '#6f84d2',
    color: '#36393f',
    // borderWidth: 'thick',
    minWidth: '200px',
};

export const cardStyles = {
    backgroundColor: '#32353b',
    color: '#d2d3d5',
};

export const popupStyles = {
  backgroundColor: '#2f3136',
    color: '#b9bbbe',
};

export const popupHeaderStyles = {
    backgroundColor: '#202225',
    color: '#b9bbbe',
};