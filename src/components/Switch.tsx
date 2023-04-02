import React from 'react';

interface SwitchProps {
    activePage: string,
    children: JSX.Element[],
}

const Switch: React.FC<SwitchProps> = ({ activePage, children }) => {
    return <>
        {children?.filter(child => child.props.name === activePage)}
    </>
}
export default Switch;